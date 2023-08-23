const Router = require("express");
const router = new Router();
const controller = require("../controller/product_controller");
const img_controller = require("../controller/img_controller");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

// поставить auth_middleware после тестирования

router.get("/", ctrlWrapper(controller.get_all_products));
router.post(
  "/",
  img_controller.upload.single("img"),
  ctrlWrapper(controller.create_product)
);
// router.get('/:id', ctrlWrapper(controller.get_product_by_id));
router.put(
  "/:id",
  img_controller.upload.single("img"),
  ctrlWrapper(controller.update_product)
);
router.delete("/:id", ctrlWrapper(controller.delete_product));
module.exports = router;
