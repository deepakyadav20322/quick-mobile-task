const express = require("express");
const { CreateService, GetServices,EditService,DeleteService } = require("../controllers/servicesController");

const router = express.Router();

router.post("/", CreateService);
router.get("/", GetServices);
router.put("/:id",EditService);
router.delete("/:id",DeleteService);

module.exports = router;
