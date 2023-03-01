module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("country", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      population: {
        type: DataTypes.INTEGER,
      },
      median_age: {
        type: DataTypes.FLOAT,
      },
      fertility: {
        type: DataTypes.FLOAT,
      },
      average_age: {
        type: DataTypes.FLOAT,
      },
      information: {
        type: DataTypes.STRING
      }
    });

    Country.associate = models => {
      Country.hasMany(models.Province, {
        foreignKey: 'provinceId'
      });
    }
  
    return Country;
  };