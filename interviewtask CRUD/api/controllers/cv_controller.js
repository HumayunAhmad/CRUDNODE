const db = require("../../databases/connection");
var personalInformation = require("../../databases/models/personal_information");
var educationalBackground = require("../../databases/models/educational_background");
var workExperience = require("../../databases/models/work_experience");
var skills = require("../../databases/models/skills");
var projects = require("../../databases/models/projects");
require("dotenv").config();
const {Op, fn, where} = require("sequelize");

exports.getCV = async (req, res, next) => {
    try {
        const resumeID = req.body.id;
        console.log(resumeID)
        const data = await personalInformation.findOne({
            where: {id : resumeID},
            include: [
                'educational',
                'work',
                'skill',
                'projects'
              ],
        });
        res.status(200).json({data: data});
    } catch (error) {
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.createCV = async (req, res, next) => {
    try {
        var personalData = req.body.personalData;
        const data = {
            first_name: personalData[0].first_name,
            last_name: personalData[0].last_name,
            email: personalData[0].email,
            image: personalData[0].image,
            phone: personalData[0].phone,
            address: personalData[0].address,
            date_of_birth: personalData[0].date_of_birth
        };
        const workData = req.body.workData;
        const educationData = req.body.educationData;
        const skillsData = req.body.skillsData;
        const projectData = req.body.projectData;

        const personal = await personalInformation.create(data).then(async (obj) => {
            if (obj) {
                const educational = {
                    personal_info_id: obj.id,
                    institue_name: educationData[0].institue_name,
                    level_of_education: educationData[0].level_of_education,
                    field_of_study: educationData[0].field_of_study,
                    start_date: educationData[0].start_date,
                    end_date: educationData[0].end_date,
                    total_marks: educationData[0].total_marks,
                    obtained_marks: educationData[0].obtained_marks
                };
                const education = await educationalBackground.create(educational).then(async (obj1) => {
                    if (obj1) {
                        const work = {
                            personal_info_id: obj.id,
                            company_name: workData[0].company_name,
                            designation: workData[0].designation,
                            responsibilities: workData[0].responsibilities,
                            start_date: workData[0].start_date,
                            end_date: workData[0].end_date
                        };
                        const experience = await workExperience.create(work).then(async (obj2) => {
                            if (obj2) {
                                const project = {
                                    personal_info_id: obj.id,
                                    title: projectData[0].title,
                                    description: projectData[0].description,
                                    start_date: projectData[0].start_date,
                                    end_date: projectData[0].end_date,
                                    links: projectData[0].links
                                };
                                const proj = await projects.create(project).then(async (obj3) => {
                                    if (obj3) {
                                        const skill = {
                                            personal_info_id: obj.id,
                                            title: skillsData[0].title,
                                        };
                                        const skillInfo = await skills.create(skill).then((obj4) => {
                                            if (obj4) {
                                                res.status(200).json({message: "Succcessfully created Resume"});
                                            }
                                        }).catch((e) => {
                                            return res.status(302).json({success: false, error: e.message});
                                        });
                                    }
                                }).catch((e) => {
                                    return res.status(302).json({success: false, error: e.message});
                                });
                            }
                        }).catch((e) => {
                            return res.status(302).json({success: false, error: e.message});
                        });
                    }
                }).catch((e) => {
                    return res.status(302).json({success: false, error: e.message});
                });
            }
        }).catch((e) => {
            return res.status(302).json({success: false, error: e.message});
        });
    } catch (error) {
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.getCV = async (req, res, next) => {
    try {
        const resumeId = req.body.resumeId;
        var data = await personalInformation.findOne({
            where: { id: resumeId, deletedAt: null },
        
                include: [
                  'educational',
                  'work',
                  'skill',
                  'projects'
                ],
          });
        res.status(200).json({data: data});
    } catch (error) {
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.getAllCV = async (req, res, next) => {
    try {
        console.log(req)
        const data = await personalInformation.findAll({
            where: {
                deletedAt: null
            },
            include: [
                'educational',
                'work',
                'skill',
                'projects'
              ],
        });
        res.status(200).json({data: data});
    } catch (error) {
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.deleteCV = async (req, res, next) => {
    try {
        const resumeId = req.body.id;
        const removingResume = await personalInformation.destroy({where: {id:resumeId},force: true }).then((obj)=>{
            if(obj){
                console.log(obj)
                res.status(200).json({message: "Succcessfully Deleted Resume"});
            }
        }).catch((e)=>{
            return res.status(302).json({success: false, error: e.message});
        })
    } catch (error) {
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.updatePersonal = async (req,res, next ) =>{
    try{
        const id = req.body.id
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            image: req.body.image,
            phone: req.body.phone,
            address: req.body.address,
            date_of_birth: req.body.date_of_birth
        }
        const personal = await personalInformation.update(data, {where:{id:id}}).then((obj)=>{
            if(obj){
                res.status(200).json({message: "Succcessfully Updated Personal"});
            }
        }).catch((e)=>{
            return res.status(302).json({success: false, error: e.message});
        });
    }
    catch(error){
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};


exports.updateEducational = async (req,res, next ) =>{
    try{
        const id = req.body.id
        const educational = {
            personal_info_id: req.body.personal_info_id,
            institue_name: req.body.institue_name,
            level_of_education: req.body.level_of_education,
            field_of_study: req.body.field_of_study,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            total_marks: req.body.total_marks,
            obtained_marks: req.body.obtained_marks
        };
        const education = await educationalBackground.update(educational, {where:{id:id}}).then((obj)=>{
            if(obj){
                res.status(200).json({message: "Succcessfully Updated Education"});
            }
        }).catch((e)=>{
            return res.status(302).json({success: false, error: e.message});
        });
    }
    catch(error){
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};


exports.updateWork = async (req,res, next ) =>{
    try{
        const id = req.body.id
        const work = {
            personal_info_id: req.body.personal_info_id,
            company_name: req.body.company_name,
            designation: req.body.designation,
            responsibilities: req.body.responsibilities,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        };
        const updateWork = await workExperience.update(work, {where:{id:id}}).then((obj)=>{
            if(obj){
                res.status(200).json({message: "Succcessfully Updated Work Experience"});
            }
        }).catch((e)=>{
            return res.status(302).json({success: false, error: e.message});
        });
    }
    catch(error){
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.updateProjects = async (req,res, next ) =>{
    try{
        const id = req.body.id
        const project = {
            personal_info_id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            links: req.body.links
        };
        const updateProject = await projects.update(project, {where:{id:id}}).then((obj)=>{
            if(obj){
                res.status(200).json({message: "Succcessfully Updated Projects"});
            }
        }).catch((e)=>{
            return res.status(302).json({success: false, error: e.message});
        });
    }
    catch(error){
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};

exports.updateSkills = async (req,res, next ) =>{
    try{
        const id = req.body.id
        const skill = {
            title: req.body.title,
        };
        const updateSkills = await skills.update(skill, {where:{id:id}}).then((obj)=>{
            if(obj){
                res.status(200).json({message: "Succcessfully Updated skills"});
            }
        }).catch((e)=>{
            return res.status(302).json({success: false, error: e.message});
        });
    }
    catch(error){
        console.log(error);
        return res.status(302).json({success: false, error: error.message});
    }
};