import express from "express";
import { addProduct, getAllProducts, getProducts, getProductsByCategryAndColor, getProductsByColor, getProductsByPrice } from "../controllers/productControllers.js";



var router = express.Router();

router.post('/addProduct', addProduct);

router.get('/getProducts', getProducts);
router.get('/getProductsByColor', getProductsByColor);
router.get('/getProductsByPrice', getProductsByPrice);
router.get('/getProductsByCategryAndColor', getProductsByCategryAndColor);


router.get('/getAllProducts', getAllProducts);

export default router;