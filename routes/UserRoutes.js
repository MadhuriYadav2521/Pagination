import express from "express";
import { addProduct, getAllProducts, getProducts } from "../controllers/productControllers.js";



var router = express.Router();

router.post('/addProduct', addProduct);

router.get('/getProducts', getProducts);


router.get('/getAllProducts', getAllProducts);

export default router;