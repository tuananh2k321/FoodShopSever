var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../component/user/UserController')
const { validationRegister } = require('../../MiddleWare/Validation')
//api login user
//http://localhost:3000/api/user/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await userController.login(email, password);
        console.log(user)
        if (user) {
            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })
            return res.status(200).json({ result: true, user: user, token: token ,message: "Login Success"});

        } else {
            return res.status(400).json({ result: false, user: null, token: null ,message: "Login Failed"});
        }
    } catch (error) {
        console.log(error);
        // next(error); for web
        //api 200
        //error can control 400
        //error can't controll system 500
        return res.status(500)
            .json({ result: false, message: 'Error System' })
    }
})

//api resgister 
//http://localhost:3000/api/user/register
router.post('/register', [validationRegister], async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await userController.register(email, password, name);
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Register Success" });
        }
        return res.status(400).json({ result: false, user: null,message: "Register Failed" });
    } catch (error) {
        return res.status(500).json({ result: false, user: null })
    }
})

module.exports = router;