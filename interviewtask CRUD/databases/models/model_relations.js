var personalInformation = require("../../databases/models/personal_information");
var educationalBackground = require("../../databases/models/educational_background");
var workExperience = require("../../databases/models/work_experience");
var skills = require("../../databases/models/skills");
var projects = require("../../databases/models/projects");


personalInformation.hasMany(educationalBackground, {foreignKey: 'personal_info_id', as: 'educational', onDelete: 'cascade',
hooks: true, })
educationalBackground.belongsTo(personalInformation, { foreignKey: 'personal_info_id' , as : 'personal' })


personalInformation.hasMany(workExperience, {foreignKey: 'personal_info_id', as: 'work', onDelete: 'cascade',
hooks: true, })
workExperience.belongsTo(personalInformation, { foreignKey: 'personal_info_id' , as : 'experience' })


personalInformation.hasMany(skills, {foreignKey: 'personal_info_id', as: 'skill', onDelete: 'cascade',
hooks: true, })
skills.belongsTo(personalInformation, { foreignKey: 'personal_info_id' , as : 'personalskill' })

personalInformation.hasMany(projects, {foreignKey: 'personal_info_id', as: 'projects', onDelete: 'cascade',
hooks: true, })
skills.belongsTo(projects, { foreignKey: 'personal_info_id' , as : 'personalproject' })

