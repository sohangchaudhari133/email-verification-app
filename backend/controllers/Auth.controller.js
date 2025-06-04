import { User } from "../models/User.model.js";
import { generateTokenAndSetCookies } from '../middleware/GenerateToken.js'
import {sendVerificationEmail, sendWelcomeEmail, sendEmail} from '../middleware/Email.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

/**
 * Registers a new user, sends verification email.
 */
export const Register = async (req,res) => {
    try {
        const { email, password, name} = req.body;

        // Validate required fields
        if(!email || !password || !name) {
            res.status(400).json({
                status:false,
                message:"All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log("existing user: ",existingUser);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password and create verification token
        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(Math.random() * 900000).toString()
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000,  // 24 hours
        });

        await user.save();
        generateTokenAndSetCookies(res,user._id);
        await sendVerificationEmail(user.email,verificationToken);

        return res.status(200).json({
            success: true,
            message: "User registered successfully. Please verify your email.",
        });

    } catch (error) {
        console.log("Error while Registering !!",error)
        return res.status(500).json(
            {
                success:false,
                message:"Internal server error",
            }
        );
    }
};

/**
 * Verifies user's email using the code sent to their email.
 */
export const VerifyEmail = async (req,res) => {
    try {
        const { code } = req.body;

        // Find user with valid verification token
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt: Date.now()}
        })

        if(!user) {
            res.status(400).json({
                success: false,
                message:"Code is Invalid or Expired !"
            })
        }
    
        // Mark user as verified and clear token
        user.isVerified= true;
        user.verificationToken= undefined;
        user.verificationTokenExpiresAt= undefined;

        await user.save();
        await sendWelcomeEmail(user.email,user.name)
        return res.status(200).json({success:true,message:"Email Verified Successfully"})
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    
    }
}

/**
 * Sends a password reset link to the user's email.
 */
export const requestPasswordReset = async(req,res) => {

   try {
    const { email } = req.body
 
    // Find user by email
    const user = await User.findOne({ email });
 
    if(!user) {
     res.status(400).json({
         success: false,
         message: "User Not found"
     });
    }
 
    // Generate JWT reset token
    const token = jwt.sign({ id:user._id },process.env.JWT_SECRET,{
     expiresIn: process.env.RESET_TOKEN_EXPIRY
    });
 
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`
    
    await sendEmail(user.email,"Password Reset",`Click here to reset your password: ${resetLink}`);
 
    res.status(200).json({
     success:true,
     message: "Reset link sent to your email"
    })

   } catch (error) {
        console.log("Server Error",error)
        res.status(500).json({
            success: false,
            message: "Server Error !",
        });
   }
}

/**
 * Resets the user's password using the reset token.
 */
export const resetPassword = async(req,res) => {
   
    try {
        const { token } = req.params;
        const {password} = req.body;
    
        // Verify reset token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        // Find user by decoded token id
        const user = await User.findById(decoded.id);
    
        if(!user) {
            res.status(400).json({
                success:false,
                message: "User not Found or Invalid token"
            });
        }
        // Hash new password and save
        const hashedPassword = await bcrypt.hash(password,10);
         user.password = hashedPassword
         await user.save();
        
        res.status(200).json({
            success:true,
            message: "Password Changed Successfully"
           })
    } catch (error) {
        console.log("Server Error",error)
        res.status(500).json({
            success: false,
            message: "Server Error !",
        });
    }
}

/**
 * Authenticates user and returns JWT token.
 */
export const Login = async(req,res) => {

    const { email, password }  = req.body

    try {

        // Validate credentials
        if(!email || !password) {
            res.status(400).json({
                success:false,
                message: "Credentials Are Required !"
            })
        }
        
        // Find user by email
        const user = await User.findOne({ email });

        if(!user) {
            res.status(400).json({
                success:false,
                message: "User Not Found"
            })
        }

        // Check if user is verified
        if(!user.isVerified) {
            res.status(403).json({
                success:false,
                message: "Please verify your email before logging in"
            })
        }

        // Compare password
        const isMatch  = await bcrypt.compare(password,user.password);

        if(!isMatch) {
            res.status(400).json({
                success:false,
                message: "Invalid Password Check Again"
            })
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id},process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            success:true,
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                email: user,email,
                name: user.name
            }
        });

    } catch (error) {

        console.log("Login error ",error);
        res.status(500).json({
            success:false,
            message: "Internal server Error"
        });
    }
}