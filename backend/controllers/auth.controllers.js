import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";
import { upload } from "../middlewares/multer.js";
import uploadOnCloudinary from "../config/cloudinary.js"
export const signUP = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userName } = req.body;

        if (!firstName || !lastName || !email || !password || !userName) {
            return res.status(400).json({
                message: "Please provide all required details."
            });
        }
        let profileImage;
        if(req.file){
            profileImage=await uploadOnCloudinary(req.file.path)
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userName,
            profileImage
        });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const match = await bcrypt.compare(password, existUser.password);

        if (!match) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        const token = generateToken(existUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                firstName: existUser.firstName,
                lastName: existUser.lastName,
                email: existUser.email,
                userName: existUser.userName,
                profileImage:existUser.profileImage
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const logout=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({
            message:"logout successfully"
        })
    }
    catch(error){
        return res.status(500).json(error)
    }
}
export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID not found"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
