var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../component/user/UserController')
const nodemailer = require('nodemailer');
const { validationRegister } = require('../../MiddleWare/Validation')
const upLoadImage = require("../../MiddleWare/UpLoadImage")
const User = require('../../component/user/UserModel')

require('dotenv').config();
console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', process.env.TWILIO_ACCOUNT_SID);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_ID;
const client = require("twilio")(accountSid, authToken);
require('dotenv').config();
async function sendVerificationCode(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nguyenvanson2622003@gmail.com',
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'nguyenvanson2622003@gmail.com',
        to: email,
        subject: 'Mã xác thực',
        text: `Mã xác thực của bạn là: ${code}`
    };

    await transporter.sendMail(mailOptions);
}
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
        const { phoneNumber, password, name, email, address,
            gender, dob, avatar, role, createAt } = req.body;
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
            res.status(200).json({ status: verification.status, result: true });

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
            res.status(200).send({ status: verification_check.status, result: true });
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
        const { email, subject } = req.body;
        let content = '<h1>Hi YOU <h1>';
        const result = await userController.sendMail(email, subject, content);
        return res.status(200).json({ result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "Can't get list user" })//app
    }
})
//http://localhost:3000/user/api/search
router.get('/search', async (req, res, next) => {
    try {

        let { phoneNumber } = req.body;
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
router.delete('/delete', async (req, res, next) => {
    try {

        const { phoneNumber } = req.query;
        const user = await userController.deleteByPhoneNumber(phoneNumber);
        if (user) {
            res.status(200).json({ result: true, message: "Delete Success" })
        } else {
            res.status(400).json({ result: false, massage: "Delete Failed" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ result: false, massage: "Error System" })
    }
})
//http://localhost:3000/user/api/upload-avatar
router.post('/upload-avatar', [upLoadImage.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (file) {
            const link = `http://10.0.2.2:3000/images/${file.filename}`;
            return res.status(200).json({ result: true, link: link })
        }
        return res.status(400).json({ result: false, link: null })

    } catch (error) {
        console.log("Failed to updaload error:" + error);
        return res.status(500).json({ result: false, massage: "Failed to updaload avatar" })
    }
})
//http://localhost:3000/user/api/change-password
router.post('/change-password', [], async (req, res, next) => {

    const { email, oldPassword, newPassword } = req.body;
    console.log(email, oldPassword, newPassword)
    try {
        const user = await userController.changePassword(email, oldPassword, newPassword);
        console.log(user)
        if (user) {
            res.status(200).json({ result: true, message: "Change Password Success" })
        } else {
            res.status(400).json({ result: false, massage: "Change Password Failed" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
    }
});
//http://localhost:3000/user/api/send-verification-code
router.post('/send-verification-code', async (req, res) => {
    try {
        const { email } = req.body;
        let subject = "Food Shop Account Verification";
        const verifyCode = Math.floor((100000 + Math.random()) * 900000);
        const result = await userController.sendVerifyCode(email, subject, verifyCode);
        return res.status(200).json({ message: "Send Success", result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "ERROR Send" })//app
    }
});
//http://localhost:3000/user/api/verify-email
router.post('/verify-email', async (req, res) => {
    try {
        const { email, verifyCode } = req.body;
        const result = await userController.verifyCode(email, verifyCode);
        return res.status(200).json({ message: "Verify Success", result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "ERROR Verify" })//app
    }
});
//http:..localhost:3000/user/api/pay
router.post('/pay', async (req, res) => {
    try {
        const { total, method, address, infoUser, transportFee, discountCode, tax } = req.body;
        console.log(total, method, address, infoUser, transportFee, discountCode, tax)
        const info = await userController.pay(total, method, address, infoUser, transportFee, discountCode, tax)
        if (info) {
            return res.status(200).json({ message: "Pay Success", result: result });
        } else {
            return res.status(200).json({ message: "Pay Failed", result: null });
        }
    } catch (error) {

        return res.status(500).json({ result: false, massage: "ERROR Pay" })//app
    }
});
module.exports = router;