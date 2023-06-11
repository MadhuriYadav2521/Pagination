import Users from "../modals/userModel.js";
import encrypt from 'encryptjs';

export const checkPin = async (req, res, next) => {
    try {
        const { email,pin } = req.body;
        if (!pin) return res.send("Pin is required in middleware");
        var secretkey = 'ios';
        const response = await Users.find({ email }).exec();
        console.log(response, "response here");
        var decipherPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        console.log("Deciphered Pin is : " + decipherPin);

        if (decipherPin === pin) {  // const pin
            next();
        } else {
            return res.send("Wrong pin in middleware");
        }


        // next();
    } catch (error) {
        res.send(error)
    }
}


export const checksForRegister = async (req, res, next) => {
    try {
        const { name, email, password, pin } = req.body;
        if (!name) return res.send("Name is required! in middleware");
        if (!email) return res.send("email is requierd! in middleware");
        if (!password) return res.send("password is requierd! in middleware");
        if (!pin) return res.send("pin is requierd! in middleware");
        if (password.length <= 8) {
            return res.send("User Password length is less than 8 !")
        }
        const response = await Users.find({ email: email }).exec();
        console.log(response,"response")
        if (response.length) {
            return res.send("Email is already Taken or You are already resgistered!!");
        }
        next();

    } catch (error) {
        return res.send(error)
    }
}

export const checksForLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.send("email is requierd! in middleware");
        if (!password) return res.send("password is requierd! in middleware");
        // if (!pin) return res.send("pin is requierd! in middleware");
       
        next();

    } catch (error) {
        return res.send(error)
    }
}
