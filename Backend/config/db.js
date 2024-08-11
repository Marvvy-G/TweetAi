const { Sequelize } = require("sequelize"); 
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log
});

sequelize.authenticate()
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Set to `force: false` in production
        console.log('Database & tables created!');
    } catch (err) {
        console.error('Error syncing database:', err);
    }
};

module.exports = { sequelize, syncDatabase };
