import bcrypt from "bcrypt";
import User from "../db/models/user.model.js";
import generateJWTTokenAndSetCoockie from "../utils/generateToken.js";

const signup = async(req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const foundUser = await User.findOne({username});

        if(foundUser){
            res.status(201).json({
                message: "Username already exists"
            });
        }else{
            const user = new User({
                username: username,
                password: hashedPassword
            });

            generateJWTTokenAndSetCoockie(user._id, res);
            
            await user.save();
            res.status(201).json({
                message: "User registered successfully"
            })
        }
    } catch (error) {
            res.status(500).json({
                message: "User registration failed!"
            })
    }
}

export default signup;