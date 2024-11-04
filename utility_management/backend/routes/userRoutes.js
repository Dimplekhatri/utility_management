const express = require('express');
const { SignUp,Login,getWorkersByCategory, bookWorker,registerWorker ,addSelfAsWorker } = require('../controllers/userController.js');


// const { SignUp, Login, GetUser, UpdateUser, DeleteUser } = require('../controllers/AuthController');
const { signUpValidation, loginValidation } = require('../middlewares/AuthValidation');
const AuthMiddleware = require('../middlewares/AuthMiddleware');


const router = express.Router();

// Get workers by category
router.get('/workers/:category',  getWorkersByCategory);
router.post('/workers/register',AuthMiddleware, registerWorker);
// Book a worker
router.post('/workers/:workerId/book',AuthMiddleware, bookWorker);


router.post('/signup', signUpValidation, SignUp);
router.post('/login', loginValidation, Login);
router.post('/addSelfAsWorker', AuthMiddleware ,addSelfAsWorker);





 
 




// router.get('/user/:email', AuthMiddleware, GetUser); 
// router.put('/user/:email', AuthMiddleware, UpdateUser); 
// router.delete('/user/:email', AuthMiddleware, DeleteUser);



module.exports = router;