const checkController = require("../../controllers/check-controller");
const kursController = require("../../controllers/kurs-controller");
const markazController = require("../../controllers/markaz-controller");
const roomController = require("../../controllers/room-controller");
const studentController = require("../../controllers/student-controller");
const userController = require("../../controllers/user-controller");
const StudentAttendance = require('../../controllers/attendance-controller');
const GroupAttendanceController = require("../../controllers/GroupAttendanceController");
const CheckAttendanceController = require("../../controllers/CheckAttendance-controller");
const Router = require("express").Router;

const router = new Router();

router.post("/reg", userController.reg);
router.post("/login", userController.login);
router.delete("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

//KURSES ROUTER

router.post("/addkurs", kursController.addKurs);
router.post("/allkurses", kursController.allKurses);
router.delete("/removekurs/:id", kursController.removeKurs);
router.post("/updatekurs", kursController.updateKurs);
router.post("/setKurses", kursController.setKurses);
module.exports = router;

//MARKAZ ROUTER
router.post("/setmarkaz", markazController.setMarkazName);
router.get("/getmarkaz", markazController.getMarkazName);

// Room ROUTER

router.post("/addroom", roomController.addRoom);
router.get("/getrooms", roomController.getRooms);
router.post("/removeroom", roomController.removeRoom);

//cheklar bo`limi
router.post("/printcheck", checkController.printCheck);

//students ROUTER

router.post("/studentprice", studentController.studentPrice);

//davomat tekshirish
router.post("/attendance",StudentAttendance.CheckAttendance)
router.post('/aaa',GroupAttendanceController.updateGroupAttendance)
// router.post('/clickAttendance',CheckAttendanceController.AttendanceClick)
