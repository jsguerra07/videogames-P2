const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', { //defino mi tabla, posteriormente las columnas de la misma, revisar DataTypes

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {//https://api.rawg.io/api/games/{id} //content type application/json
      type: DataTypes.STRING,
      allowNull: false,
    },

    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,

    },

    platforms: {// https://api.rawg.io/api/platforms //Array de objetos//content type application/json
      type: DataTypes.JSON, // DataTypes.ARRAY(DataTypes.STRING o TEXT)
      allowNull: false,
    },


    createInDb: {// para diferenciar los que estan en bases de datos y los que no
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};

