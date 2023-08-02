const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');


router.post('/addwork', userCtrl.addWork);
router.get('/getAllTask',userCtrl.getAllTask)
router.get('/deleteTask/:taskid',userCtrl.deleteTask)
router.post("/editTask/:taskid",userCtrl.editTask)
router.get("/getTaskById/:taskid",userCtrl.getTaskById)
router.get("/updateTaskById/:taskid",userCtrl.updateTaskById)



module.exports = router;
