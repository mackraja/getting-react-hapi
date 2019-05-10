/**
 * @author {[Monty Khanna]}
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    // paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'User',
    comment: 'User table is using to store all users details',
  });
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: null,
    });
    // associations can be defined here
  };
  return User;
};
