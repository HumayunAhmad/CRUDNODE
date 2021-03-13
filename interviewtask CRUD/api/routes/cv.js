

var express = require("express");
var router = express.Router();
var CVController = require("../controllers/cv_controller");

router.get("/getAllCV", CVController.getAllCV);
router.post("/getOneCV", CVController.getCV)
router.post("/create_cv", CVController.createCV)
router.delete("/delete_CV", CVController.deleteCV)
router.put("/update_personal", CVController.updatePersonal)
router.put("/update_education", CVController.updateEducational)
router.put("/update_work", CVController.updateWork)
router.put("/update_project", CVController.updateProjects)
router.put("/update_skill", CVController.updateSkills)



module.exports = router;