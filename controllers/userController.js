import Users from "../modals/userModel.js";
import encrypt from 'encryptjs';

export const register = async (req, res) => {
    try {
        //     const { name, email, password, pin } = req.body;
        //     if (!name) return res.send("Name is required!");
        //     if (!email) return res.send("email is requierd!");
        //     if (!password) return res.send("password is requierd!");
        //     if (!pin) return res.send("pin is requierd!");
        //     var secretkey = 'ios';
        //     var plainPin = pin;
        //     var plaintext = password;
        //     var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
        //     var cipherPin = encrypt.encrypt(plainPin, secretkey, 256);
        //     const user = new Users({ name, email, password: cipherText, pin: cipherPin })

        //     console.log(user, "users here");
        //     await user.save();
        //     return res.send("Registration successful.");
        // } catch (error) {
        //     console.log(error)
        // }
        const { name, email, password, pin } = req.body;
        if (!name) return res.send("Name is required!");
        if (!email) return res.send("email is requierd!");
        if (!password) return res.send("password is requierd!");
        if (!pin) return res.send("pin is requierd!");
        if (password.length <= 8) {
            return res.send("User Password length is less than 8 !")
        }
        const response = await Users.find({ email: email }).exec();
        // console.log(response,"response")
        if (response.length) {
            return res.send("Email is already Taken or You are already resgistered!!");
        }
        var secretkey = 'ios';
        var plainPin = pin;
        var plaintext = password;
        var cipherText = encrypt.encrypt(plaintext, secretkey, 256);
        var cipherPin = encrypt.encrypt(plainPin, secretkey, 256);
        const user = new Users({ name, email, password: cipherText, pin: cipherPin })
        await user.save();
        return res.send("Resgistration Succesfull!")

    } catch (error) {
        return res.send(error)
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.send("User Email is required");
        if (!password) return res.send("User Password is required");
        const response = await Users.find({ email }).exec();
        var secretkey = 'ios';
        var decipher = encrypt.decrypt(response[0].password, secretkey, 256);
        // var decipherPin = encrypt.decrypt(response[0].pin, secretkey, 256);
        console.log("Deciphered Text is : " + decipher);
        if (response.length) {
            if (decipher === password) {
                return res.send("you are logged in");
            } else {
                return res.send("Wrong password");
            }
        } else {
            return res.send("User not found check your email..")
        }

    } catch (error) {
        return res.send(error)
    }
}


export const updateUserName = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email) return res.send("Email not found!")
        if (!name) return res.send("Name not found!")
        const response = await Users.find({ email }).exec();
        console.log(response);
        if (response) {
            // const res = await Users.updateOne({ email }, { $set: { name: name } });
            const user = await Users.findOneAndUpdate({ email }, { name: name }).exec();
            await user.save();
            return res.send("record updated")
            // return res.send(response[0])
        } else {
            return res.send("User not found!")
        }
    } catch (error) {
        return res.send(error)
    }

}
