// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.SignUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if user with the same email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({
//                 message: "User already exists, you can login",
//                 success: false
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const user = new User({
//             name, 
//             email,
//             password: hashedPassword
//         });
//         await user.save();
//         res.status(201).json({
//             message: "Signup successful",
//             success: true
//         });
//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(500).json({
//             message: "Error in creating account",
//             success: false
//         });
//     }
// };

// exports.Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const errorMsg = 'Authentication failed: email or password is wrong';

//         // Check if user with the same email exists
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(403).json({
//                 message: errorMsg,
//                 success: false
//             });
//         }

//         // Compare the provided password with the hashed password
//         const isPassEqual = await bcrypt.compare(password, existingUser.password);
//         if (!isPassEqual) {
//             return res.status(403).json({
//                 message: errorMsg,
//                 success: false
//             });
//         }

//         const jwtToken = jwt.sign(
//             { email: existingUser.email, _id: existingUser._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             success: true,
//             jwtToken,
//             email,
//             name: existingUser.name
//         });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({
//             message: "Error in login",
//             success: false
//         });
//     }
// };
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// exports.SignUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if user with the same email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({
//                 message: "User already exists, you can login",
//                 success: false
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const user = new User({
//             name, 
//             email,
//             password: hashedPassword
//         });
//         await user.save();
//         res.status(201).json({
//             message: "Signup successful",
//             success: true
//         });
//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(500).json({
//             message: "Error in creating account",
//             success: false
//         });
//     }
// };

// exports.Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const errorMsg = 'Authentication failed: email or password is wrong';

//         // Check if user with the same email exists
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(403).json({
//                 message: errorMsg,
//                 success: false
//             });
//         }

//         // Compare the provided password with the hashed password
//         const isPassEqual = await bcrypt.compare(password, existingUser.password);
//         if (!isPassEqual) {
//             return res.status(403).json({
//                 message: errorMsg,
//                 success: false
//             });
//         }

//         const jwtToken = jwt.sign(
//             { email: existingUser.email, _id: existingUser._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             success: true,
//             jwtToken,
//             email,
//             name: existingUser.name
//         });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({
//             message: "Error in login",
//             success: false
//         });
//     }
// };

exports.GetUser = async (req, res) => {
    try {
        const { email } = req.params; 

        // Check if user with the given email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            success: true,
            user
        });
    } catch (error) {
        console.error("Error during get user:", error);
        res.status(500).json({
            message: "Error in retrieving user",
            success: false
        });
    }
};

exports.UpdateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { name, password } = req.body;

        // Check if user with the given email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update user details
        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.status(200).json({
            message: "User updated successfully",
            success: true
        });
    } catch (error) {
        console.error("Error during update user:", error);
        res.status(500).json({
            message: "Error in updating user",
            success: false
        });
    }
};

exports.DeleteUser = async (req, res) => {
    try {
        const { email } = req.params; 

        // Check if user with the given email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Delete the user
        await User.deleteOne({ email });
        res.status(200).json({
            message: "User deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error during delete user:", error);
        res.status(500).json({
            message: "Error in deleting user",
            success: false
        });
    }
};
