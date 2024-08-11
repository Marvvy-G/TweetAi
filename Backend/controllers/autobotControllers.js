const { Autobot, Post, Comment } = require('../models');
const paginate = require('../utils/autobotsPaginationHelper.js');

// This gets the total count of Autobots
exports.getAutobotCount = async (req, res) => {
    try {
        const totalAutobots = await Autobot.count();
        res.json({ total: totalAutobots });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Autobots count' });
    }
};

//this gets all autobots with pagination
exports.getAutobot = async (req, res) => {

    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Invalid page or limit' });
        }

        const paginatedResults = await paginate(Autobot, {}, page, limit);
        res.json(paginatedResults);
    } catch (error) {
        console.error('Error fetching Autobots:', error);
        res.status(500).json({ error: 'Error fetching Autobots' });
    }

};

//this gets posts for a specific autobot with pagination
exports.autobotPosts = async (req, res) => {
    try {
        const autobotId = parseInt(req.params.id, 10);
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Invalid page or limit' });
        }

        // Pass the query options to paginate function
        const queryOptions = {
            where: { autobotId }
        };
        
        const posts = await paginate(Post, queryOptions, page, limit);
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
};


//this allows developers to get comments for a specific post with pagination
exports.postComments = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: 'Invalid page or limit' });
        }

        const queryOptions = {
            where: { postId }
        };

        // Pass the Comment model and query options to paginate
        const comments = await paginate(Comment, queryOptions, page, limit);
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments' });
    }
}