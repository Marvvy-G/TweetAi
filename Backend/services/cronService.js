// const cron = require('node-cron');
// const axios = require('axios');
// const { Autobot, Post, Comment } = require('../models');
// const { syncDatabase } = require('../config/db'); // Adjust path as necessary

// // Ensure database synchronization and cron job initialization
// const initialize = async () => {
//     try {
//         await syncDatabase(); // Synchronize database schema
//         console.log('Database synchronized successfully');

//         // Define the cron job to run every minute
//         cron.schedule('* * * * *', async () => {
//             console.log('Running cron job to create Autobots with posts and comments...');
//             await createAutobotsWithPostsAndComments();
//         });
//     } catch (error) {
//         console.error('Error initializing database:', error);
//     }
// };

// // Fetch data from JSONPlaceholder
// const fetchDataFromJsonPlaceholder = async () => {
//     try {
//         const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
//             axios.get('https://jsonplaceholder.typicode.com/users'),
//             axios.get('https://jsonplaceholder.typicode.com/posts'),
//             axios.get('https://jsonplaceholder.typicode.com/comments')
//         ]);

//         return {
//             users: usersResponse.data,
//             posts: postsResponse.data,
//             comments: commentsResponse.data
//         };
//     } catch (error) {
//         console.error('Error fetching data from JSONPlaceholder:', error);
//         throw error;
//     }
// };

// // Generate a unique title by appending a timestamp or random number
// const generateUniqueTitle = async (title) => {
//     let uniqueTitle = title;
//     let count = 1;

//     while (await Post.findOne({ where: { title: uniqueTitle } })) {
//         uniqueTitle = `${title} (${count})`;
//         count += 1;
//     }

//     return uniqueTitle;
// };

// // Create Autobots and associated data
// const createAutobotsWithPostsAndComments = async () => {
//     try {
//         const { users, posts, comments } = await fetchDataFromJsonPlaceholder();

//         for (const user of users) {
//             const autobot = await Autobot.create({
//                 name: user.name,
//                 username: user.username
//             });

//             const userPosts = posts.filter(post => post.userId === user.id).slice(0, 10);
//             for (const post of userPosts) {
//                 // Generate a unique title
//                 const uniqueTitle = await generateUniqueTitle(post.title);

//                 const createdPost = await Post.create({
//                     title: uniqueTitle,
//                     body: post.body,
//                     autobotId: autobot.id
//                 });

//                 const postComments = comments.filter(comment => comment.postId === post.id).slice(0, 10);
//                 for (const comment of postComments) {
//                     await Comment.create({
//                         body: comment.body,
//                         postId: createdPost.id
//                     });
//                 }
//             }
//         }

//         console.log('Autobots with posts and comments created successfully');
//     } catch (error) {
//         console.error('Error creating Autobots and associated data:', error);
//     }
// };

// // Initialize the cron job
// initialize();


const cron = require('node-cron');
const axios = require('axios');
const { Autobot, Post, Comment } = require('../models');
const { syncDatabase } = require('../config/db'); // Adjust path as necessary
const  {io } = require('../app');

// Ensure database synchronization and cron job initialization
const initialize = async () => {
    try {
        await syncDatabase(); // Synchronize database schema
        console.log('Database synchronized successfully');

        // Define the cron job to run every minute
        cron.schedule('0 * * * *', async () => {
            console.log('Running cron job to create Autobots with posts and comments...');
            await createAutobotsWithPostsAndComments();
            const totalAutobots = await Autobot.count();
            io.emit('autobotCount', { total: totalAutobots });

        });
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

// Fetch data from JSONPlaceholder
const fetchDataFromJsonPlaceholder = async () => {
    try {
        const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/users'),
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/comments')
        ]);

        return {
            users: usersResponse.data,
            posts: postsResponse.data,
            comments: commentsResponse.data
        };
    } catch (error) {
        console.error('Error fetching data from JSONPlaceholder:', error);
        throw error;
    }
};

// Generate a unique title by appending a timestamp or random number
const generateUniqueTitle = async (title) => {
    let uniqueTitle = title;
    let count = 1;

    while (await Post.findOne({ where: { title: uniqueTitle } })) {
        uniqueTitle = `${title} (${count})`;
        count += 1;
    }

    return uniqueTitle;
};

// Create Autobots and associated data
const createAutobotsWithPostsAndComments = async (io) => {
    try {
        const { users, posts, comments } = await fetchDataFromJsonPlaceholder();
        const numberOfAutobotsPerUser = 50; // Adjust this number as needed

        for (const user of users) {
            for (let i = 0; i < numberOfAutobotsPerUser; i++) {
                const autobot = await Autobot.create({
                    name: `${user.name} ${i + 1}`, // Append a number to differentiate Autobots
                    username: `${user.username}${i + 1}` // Append a number to differentiate Autobots
                });

                const userPosts = posts.filter(post => post.userId === user.id).slice(0, 10);
                for (const post of userPosts) {
                    // Generate a unique title
                    const uniqueTitle = await generateUniqueTitle(post.title);

                    const createdPost = await Post.create({
                        title: uniqueTitle,
                        body: post.body,
                        autobotId: autobot.id
                    });

                    const postComments = comments.filter(comment => comment.postId === post.id).slice(0, 10);
                    for (const comment of postComments) {
                        await Comment.create({
                            body: comment.body,
                            postId: createdPost.id
                        });
                    }
                }
                
            }
        }

        console.log('Autobots with posts and comments created successfully');
    } catch (error) {
        console.error('Error creating Autobots and associated data:', error);
    }
};
createAutobotsWithPostsAndComments(io);
// Initialize the cron job
initialize();


