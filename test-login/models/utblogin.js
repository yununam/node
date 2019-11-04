'use strict';
module.exports = (sequelize, DataTypes) => {
  var utblogin = sequelize.define('utblogin', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
      type: DataTypes.STRING
    }
  },  {
    freezeTableName: true,
    tableName: "member"
  });
  utblogin.associate = function(models) {
    // associations can be defined here
  };
  return utblogin;
};
