module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'id',
        },
      },
    }, {
      timestamps: true,
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    };
  
    return Comment;
  };
  