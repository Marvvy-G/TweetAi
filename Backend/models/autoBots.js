module.exports = (sequelize, DataTypes) => {
    const Autobot = sequelize.define('Autobot', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: true,
    });
  
    Autobot.associate = (models) => {
      Autobot.hasMany(models.Post, { foreignKey: 'autobotId' });
    };
  
    return Autobot;
  };
  