'use strict';
module.exports = (sequelize, DataTypes) => {
  const Onibus = sequelize.define('onibus', {
    datahora: DataTypes.STRING,
    ordem: DataTypes.STRING,
    linha: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    velocidade: DataTypes.DOUBLE
  }, {freezeTableName: true});
  Onibus.associate = function(models) {
    // associations can be defined here
  };
  return Onibus;
};