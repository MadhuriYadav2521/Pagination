import { response } from "express";
import Products from "../modals/productModel.js";
// import Users from '../modals/Users.js';
export const addProduct = async (req, res) => {
    try {
        const { Name, Price, Image } = req.body;
        if (!Name) return res.send("Name is required!");
        if (!Price) return res.send("Price is requierd!");
        if (!Image) return res.send("Price is requierd!");
        const product = new Products({
            name: Name,
            price: Price,
            image: Image
        })
        console.log(product, "products here");
        await product.save();
        return res.send("Product added");
    } catch (error) {
        console.log(error)
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const response = await Products.find({}).exec()
        if (response) {
            return res.send(response);
        } else {
            return res.send("Products not found!")
        }

    } catch (error) {
        return res.send(error);
    }
}
export const getProducts = async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 5 } = req.query;

    try {
        // execute query with page and limit values
        const products = await Products.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Products collection 
        const count = await Products.count();

        // return response with products, total pages, and current page
        res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });




    } catch (err) {
        console.error(err.message);
    }
}


