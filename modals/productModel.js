import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = new Schema({
    name : String,
    price : Number,
    image : [String],
    category : String,
    color : String,
    brand : String,
    size : String,
    fabric : String
});

export default mongoose.model("Products", Product)