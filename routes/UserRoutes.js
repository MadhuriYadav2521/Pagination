import express from "express";
import { addProduct, getAllProducts, getProducts, getProductsByCategryAndColor, getProductsByColor, getProductsByPrice } from "../controllers/productControllers.js";
import { login, register, updateUserName } from "../controllers/userController.js";
import { checkPin, checksForLogin, checksForRegister } from "../middlewares/authMiddleware.js";



var router = express.Router();

router.post('/addProduct', addProduct);

router.get('/getProducts', getProducts);
router.get('/getProductsByColor', getProductsByColor);
router.get('/getProductsByPrice', getProductsByPrice);
router.get('/getProductsByCategryAndColor', getProductsByCategryAndColor);
router.post('/register',checksForRegister, register);
router.post('/login',checksForLogin,checkPin,login);
router.post('/updateUserName',checkPin,updateUserName);


router.get('/getAllProducts', getAllProducts);

export default router;
