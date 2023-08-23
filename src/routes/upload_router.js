const Router = require("express");
const router = new Router();
const img_controller = require("../controller/img_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

// поставить auth_middleware после тестирования
router.post("/", img_controller.upload.single("image"), ctrlWrapper(img_controller.upload_img));

router.get("/:img", ctrlWrapper(img_controller.get_img));

router.get("/"); // добавить контроллер выдачи нужного изображения


module.exports = router;



