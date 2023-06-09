import { response } from "express";
import Products from "../modals/productModel.js";
// import Users from '../modals/Users.js';
export const addProduct = async (req, res) => {
    try {
        const { Name, Price, Image, Category, Color, Brand, Size, Fabric } = req.body;
        if (!Name) return res.send("Name is required!");
        if (!Price) return res.send("Price is requierd!");
        if (!Image) return res.send("Price is requierd!");
        if (!Category) return res.send("Price is requierd!");
        if (!Color) return res.send("Price is requierd!");
        if (!Brand) return res.send("Price is requierd!");
        if (!Size) return res.send("Price is requierd!");
        if (!Fabric) return res.send("Price is requierd!");
        const product = new Products({
            name: Name,
            price: Price,
            image: Image,
            category: Category,
            color: Color,
            brand: Brand,
            size: Size,
            fabric: Fabric
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

export const getProductsByColor = async (req, res) => {
    try {
        const {Color} = req.body;
        if (!Color) return res.send("Color is required!");
        const response = await Products.find({color : Color}).exec()
        if (response) {
            return res.send(response);
        } else {
            return res.send("Products not found!")
        }

    } catch (error) {
        return res.send(error);
    }
}

export const getProductsByCategryAndColor = async (req, res) => {
    try {
        const {category, color} = req.body;
        if (!category) return res.send("category is required!");
        if (!color) return res.send("color is required!");
        const response = await Products.find({ category,color  }).exec()
       
        if (response) {
            return res.send(response);
        } else {
            return res.send("Products not found!")
        }

    } catch (error) {
        return res.send(error);
    }
}

export const getProductsByPrice = async (req, res) => {
    try {
        const {minPrice, maxPrice} = req.body;
        // if (!minPrice) return res.send("minPrice is required!");
        // if (!maxPrice) return res.send("maxPrice is required!");
        const response = await Products.find({price : {$gte:minPrice, $lte:maxPrice,}}).exec()
       
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
    const { page = 1, limit = 5 } = req.body;

    try {
        // execute query with page and limit values
        const product = await Products.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)  // 1-1*5=0 record skip, 2-1*5=5 records skip, 3-1*5=10 records skip
            .exec();

        // get total documents in the product collection 
        const count = await Products.count();

        // return response with product, total pages, and current page
        if (product[0]) {
            res.send({
                product,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } else {
            return res.send("No more products here!")
        }



    } catch (err) {
        console.error(err.message);
    }
}


