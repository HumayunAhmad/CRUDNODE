const Sequelize = require('sequelize')
const db = require('../connection')



const personalInformation = db.define(
  'personal_information',
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING(255),
    },
    last_name: {
        type: Sequelize.STRING(255),
      },
      email: {
        type: Sequelize.STRING(70),
        unique: true,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      address: {
        type: Sequelize.STRING(255),
      },
      date_of_birth:{
          type: Sequelize.DATEONLY
      }


  },
  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: 'personal_information',
  },
)

module.exports = personalInformation;
