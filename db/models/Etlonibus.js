'use strict';
module.exports = (sequelize, DataTypes) => {
  const Etlonibus = sequelize.define('etlonibuses', {
    datahora: DataTypes.DATE,
    responsavel: DataTypes.STRING,
    finalizada: DataTypes.BOOLEAN,
    erro: DataTypes.STRING
  }, {});
  Etlonibus.associate = function(models) {
    // associations can be defined here
    Etlonibus.hasMany(models.onibuses);
  };
  return Etlonibus;
};