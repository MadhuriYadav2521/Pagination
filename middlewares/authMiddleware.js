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
