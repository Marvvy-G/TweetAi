const { Sequelize } = require('sequelize');
const sequelize = require('../config/db').sequelize;

const Autobot = require('./autoBots')(sequelize, Sequelize.DataTypes);
const Post = require('./posts')(sequelize, Sequelize.DataTypes);
const Comment = require('./comments')(sequelize, Sequelize.DataTypes);

// Define relationships
Autobot.hasMany(Post, { foreignKey: 'autobotId' });
Post.belongsTo(Autobot, { foreignKey: 'autobotId' });
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Export models and sequelize instance
module.exports = {
    Autobot,
    Post,
    Comment,
    sequelize,
};
