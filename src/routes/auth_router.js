const Router = require("express");
const router = new Router();
const auth_controller = require("../controller/auth_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth_middleware")

router.post("/register", ctrlWrapper(auth_controller.register));
router.post("/login", ctrlWrapper(auth_controller.login));
router.get("/logout", auth, ctrlWrapper(auth_controller.logout));
router.get("/getCurrent", auth, ctrlWrapper(auth_controller.getCurrent));
module.exports = router;