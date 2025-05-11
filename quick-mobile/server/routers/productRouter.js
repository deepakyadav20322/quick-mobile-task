const express = require("express");
const { AddProduct,GetProduct } = require("../controllers/productController");
const router = express.Router();
const {deleteProduct} = require("../controllers/productController");
router.post('/',AddProduct);
router.get('/',GetProduct);
router.delete('/:id',deleteProduct);


module.exports=router;