'use strict';
module.exports = (sequelize, DataTypes) => {
  const Onibus = sequelize.define('onibuses', {
    datahora: DataTypes.DATE,
    ordem: DataTypes.STRING,
    linha: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    velocidade: DataTypes.DOUBLE,
    etlonibusId: DataTypes.STRING
  }, {freezeTableName: true});
  Onibus.associate = function(models) {
    Onibus.belongsTo(models.etlonibuses);
  };
  return Onibus;
};