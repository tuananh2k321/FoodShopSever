var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../component/user/UserController')
const { validationRegister } = require('../../MiddleWare/Validation')

require('dotenv').config();
console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', process.env.TWILIO_ACCOUNT_SID);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_ID;
const client = require("twilio")(accountSid, authToken);
//http://localhost:3000/user/api/login
router.post('/login', async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;
        console.log(phoneNumber, password)
        const user = await userController.login(phoneNumber, password);
        console.log("aaaaaaaaa", user)
        if (user) {
            const token = jwt.sign({ user }, 'secret', { expiresIn: '1h' })
            return res.status(200).json({ result: true, user: user, token: token, message: "Login Success" });

        } else {
            return res.status(400).json({ result: false, user: null, token: null, message: "Login Failed" });
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
//http://localhost:3000/user/api/register
router.post('/register', [], async (req, res, next) => {
    try {
        const { phoneNumber, password, name, email, address, gender, dob, avatar, role, createAt } = req.body;
        console.log(phoneNumber, password, name, email, address, gender, dob, avatar, role, createAt)
        const user = await userController.register(phoneNumber, password, name, email, address, gender, dob, avatar, role, createAt);
       console.log(user)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Register Success" });
        }
        return res.status(400).json({ result: false, user: null, message: "Register Failed" });
    } catch (error) {
        return res.status(500).json({ result: false, user: null })
    }
})

//http://localhost:3000/user/api/sendOTP
router.post('/sendOTP', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then((verification) => {
        console.log(verification.status);
        //res.status(200).send({ status: verification.status ,result:true});
        res.status(200).json({ status: verification.status ,result:true});

      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  });
  
//http://localhost:3000/user/api/verifyOTP
router.post('/verifyOTP', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otpCode = req.body.otpCode;
    client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode })
      .then((verification_check) => {
        console.log(verification_check.status);
        res.status(200).send({ status: verification_check.status,result :true });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  });
//http://localhost:3000/user/api/update
router.put('/update', async (req, res, next) => {

    try {
        const { phoneNumber, password, name, email, address, gender, dob, avatar, role } = req.body;
        console.log(phoneNumber, password, name, email, address, gender, dob, avatar, role);
        const user = await userController.updateUser(phoneNumber, password, name, email, address, gender, dob, avatar, role);
        console.log(user)
        if (user) {
            return res.status(200).json({ result: true, user: user, message: "Update Success" })
        } else {
            return res.status(400).json({ result: false, user: null, message: " user not exist" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ result: false, user: null })
    }
})
//http://localhost:3000/user/api/list
router.get('/list', async (req, res, next) => {
    try {
        const users = await userController.getAllUser();
        console.log(users)
        return res.status(200).json({ result: true, users: users });
    } catch (error) {
        console.log("List User:" + error)
        return res.status(500).json({ result: false, massage: "Can't get list user" })
    }
})
//http://localhost:3000/user/api/send-mail
router.post('/send-mail', async (req, res, next) => {
    try {
        const { to, subject } = req.body;
        let html = 'Congrat hahaahah';
        await userController.sendMail(to, subject, html);
        return res.status(200).json({ result: true });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "Can't get list user" })//app
    }
})

//http://localhost:3000/user/api/search
router.get('/search', async (req, res, next) => {
    try {

        let { phoneNumber } = req.query;
        console.log(phoneNumber)
        const user = await userController.search(phoneNumber);
        console.log(user);
        if (user) {
            res.status(200).json({ result: true, user: user, message: "Search Success" });
        } else {
            res.status(400).json({ result: false, user: null, message: "User not exist" });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, massage: "Failed to search" })
    }
})
//http://localhost:3000/user/api/delete
router.delete('/delete',async (req,res,next)=>{
    try{

        const {phoneNumber} = req.query;
        const user = await userController.deleteByPhoneNumber(phoneNumber);
        if(user){
            res.status(200).json({result:true,message:"Delete Success"})
        }else{
            res.status(400).json({result:false,massage:"Delete Failed"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({result:false,massage:"Error System"})
    }
})
module.exports = router;