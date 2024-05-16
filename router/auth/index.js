const userController = require("../../controllers/user-controller");

const Router = require("express").Router;

const router = new Router();

router.post("/reg", userController.reg);
router.post("/login", userController.login);
router.delete("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

module.exports = router;
