 
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 
const getWorkersByCategory = async (req, res) => {
    const category = req.params.category;
    
    try {
        const workers = await User.find({ type: category });
         
        if (workers.length === 0) {
            return res.status(404).json({ message: 'No workers found for this category' });
        }
        
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Book a worker
// const bookWorker = async (req, res) => {
//     const workerId = req.params.workerId;
//     const { userId, date } = req.body;
  
//     try {
//       const worker = await User.findById(workerId);
//       if (!worker) {
//         return res.status(404).json({ message: 'Worker not found' });
//       }
  
//       // Ensure the date is in correct format
//       const bookingDate = new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD format
  
//       // Check if the date is already booked
//       const isAlreadyBooked = worker.dates.some(d => new Date(d).toISOString().split('T')[0] === bookingDate);
  
//       if (isAlreadyBooked) {
//         return res.status(400).json({ message: 'Worker is already booked on this date' });
//       }
  
//       // Proceed to book the worker
//       worker.dates.push(new Date(date));
//       const useriiid=req.userId;
//     //   console.log(useriiid);
//       worker.owner = userId;
//       await worker.save();
  
//       res.json({ message: 'Worker booked successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

const bookWorker = async (req, res) => {
    const workerId = req.params.workerId;
    const { userId, date } = req.body;

    // console.log(req.userId);

    try {
        const worker = await User.findById(workerId);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        const bookingDate = new Date(date).toISOString().split('T')[0];
        const isAlreadyBooked = worker.dates.some(d => new Date(d).toISOString().split('T')[0] === bookingDate);

        if (isAlreadyBooked) {
            return res.status(400).json({ message: 'Worker is already booked on this date' });
        }

        worker.dates.push(bookingDate);
        
        worker.owner = req.userId;

         
        await User.updateOne({ _id: workerId }, { $set: { dates: worker.dates, owner: worker.owner } });

        res.json({ message: 'Worker booked successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
 
const registerWorker = async (req, res) => {
    const { name, type, address, dates } = req.body;

    try {
        const newWorker = new User({
            name,
            type,
            address,
            dates
        });

        await newWorker.save();
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




const SignUp = async (req, res) => {
  try {
      const { name, email, password } = req.body;
      console.log("Request Body:", req.body);
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("exists")
          return res.status(409).json({
              message: "User already exists, you can login",
              success: false
          });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
          name, 
          email,
          password: hashedPassword
      });
      await user.save();
      res.status(201).json({
          message: "Signup successful",
          success: true
      });
  } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({
          message: "Error in creating account",
          success: false,
          error: error.message
      });
  }
};

const Login = async (req, res) => {
  try {
      const { email, password } = req.body;
    //   console.log(req.body);
      const errorMsg = 'Authentication failed: email or password is wrong';

      // Check if user with the same email exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
          return res.status(403).json({
              message: errorMsg,
              success: false
          });
      }
      console.log( existingUser);
      // Compare the provided password with the hashed password
      const isPassEqual = await bcrypt.compare(password, existingUser.password);
      if (!isPassEqual) {
          return res.status(403).json({
              message: " password wrong ",
              success: false
          });
      }

      const jwtToken = jwt.sign(
          { email: existingUser.email, _id: existingUser._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      );

      res.status(200).json({
          message: "Login successful",
          success: true,
          jwtToken,
          email,
          name: existingUser.name
      });
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
          message: "Error in login",
          success: false
      });
  }
};


 
const addSelfAsWorker = async (req, res) => {
    const { type, address } = req.body;
    const userId = req.userId;  

    try {
         
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
 
        user.type = type;
        user.address = address;

      
        await user.save();
        console.log( await User.findById(userId));
         

        return res.json({
            message: 'You have been successfully added as a worker',
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWorkersByCategory,
    bookWorker,
    registerWorker,
    Login,
    SignUp,
    addSelfAsWorker  
};





 

