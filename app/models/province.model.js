module.exports = (sequelize, DataTypes) => {
    const Province = sequelize.define("province", {
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

    Province.associate = (models) => {
        Province.belongsTo(models.Country, {
          foreignKey: 'countryId'
        })
    }
    return Province;
  };