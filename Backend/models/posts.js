module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      autobotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Autobots', // Table name, not model name
          key: 'id',
        },
      },
    }, {
      timestamps: true,
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.Autobot, { foreignKey: 'autobotId' });
      Post.hasMany(models.Comment, { foreignKey: 'postId' });
    };
  
    return Post;
  };
  