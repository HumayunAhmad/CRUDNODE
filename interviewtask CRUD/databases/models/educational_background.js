const Sequelize = require('sequelize')
const db = require('../connection')



const educationBackground = db.define(
  'educational_background',
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
    institue_name: {
      type: Sequelize.STRING(255),
    },
    level_of_education: {
        type: Sequelize.STRING(255)
    },
    field_of_study: {
        type: Sequelize.STRING(255),
      },
      start_date: {
        type: Sequelize.DATEONLY,
      },
      end_date: {
        type: Sequelize.DATEONLY,
      },
      total_marks: {
          type: Sequelize.BIGINT(11)
      },
      obtained_marks: {
        type: Sequelize.BIGINT(11)
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
    tableName: 'educational_background',
  },
)

module.exports = educationBackground;
