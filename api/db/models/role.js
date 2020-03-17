/**
 * @author {[Monty Khanna]}
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: true,
    // paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'Role',
    comment: 'Role table is using to store all roles of users',
  });
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      onDelete: null,
    });
    // associations can be defined here
  };
  return Role;
};
