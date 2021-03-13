const Sequelize = require('sequelize')
const db = require('../connection')



const workExperience = db.define(
  'work_experience',
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    personal_info_id: {
        type: Sequelize.BIGINT(11),
        references: {
            model: 'personal_information', //  refers to table name
            key: 'id', //  refers to column name in reference table
        },
    },
    company_name: {
      type: Sequelize.STRING(255),
    },
    designation: {
        type: Sequelize.STRING(255)
    },
    responsibilities: {
        type: Sequelize.STRING(255),
      },
      start_date: {
        type: Sequelize.DATEONLY,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        isNaN: true
      },


  },
  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: 'work_experience',
  },
)

module.exports = workExperience;
