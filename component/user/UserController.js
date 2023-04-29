const Content = require('twilio/lib/rest/Content');
const UserService = require('./Userservice');
const UserModel = require('./UserModel')
const mailer = require('nodemailer')

const login = async (phoneNumber, password) => {
    try {
        return await UserService.login(phoneNumber, password);
    } catch (error) {
        return false;
    }
}
const register = async (phoneNumber, password, name, email, address, gender, dob, avatar, role, createAt) => {
    try {
        return await UserService.register(phoneNumber, password, name, email, address, gender, dob, avatar, role, createAt);

    } catch (error) {
        return false;
    }
}
const deleteByPhoneNumber = async (phoneNumber) => {
    try {
        return await UserService.deleteByPhoneNumber(phoneNumber);

    } catch (error) {
        return false;
    }
}
const updateUser = async (phoneNumber, password, name, email, address, gender, dob, avatar, role) => {
    try {
        return await UserService.updateUser(phoneNumber, password, name, email, address, gender, dob, avatar, role);

    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        return await UserService.getAllUser(page, size);
    } catch (error) {
        throw error;
    }
}
const search = async (phoneNumber) => {
    try {
        return await UserService.search(phoneNumber);
    } catch (error) {
        throw error;
    }
}
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        return await UserService.changePassword(email, oldPassword, newPassword);
    } catch (error) {
        throw error;
    }
}
const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'nguyenvanson2622003@gmail.com',
        pass: 'wzbnwoqyymntiavu'
    },
    tls: { rejectUnauthorized: false }
})


const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: "Lucas <nguyenvanson2622003@gmail.com>",
            to: email,
            subject: subject,
            html: content
        }
        return await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("Send email error:", error);
    }
    return false;
}
const sendVerifyCode = async (email, subject, verifyCode) => {

    try {
        const mailOptions = {
            from: "Lucas <nguyenvanson2622003@gmail.com>",
            to: email,
            subject: subject,
            html: "Your authentication code is : " + verifyCode
        }
        await UserModel.updateOne({ email }, { verificationCode: verifyCode, });

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log("Send email error:", error);
    }
    return false;
}
const verifyCode = async (email, verifyCode) => {
    try {
        const user = await UserModel.findOne({ email });
        console.log(user)
        if (user) {
            if (user.verificationCode === verifyCode) {
                console.log(user.verificationCode)
                await UserModel.updateOne({ email }, { isVerified: true });
                return true;
            } else {
                return false;

            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Verify email error:", error);

    }
}
module.exports = {
    login, register, deleteByPhoneNumber,
    updateUser, getAllUser, search,
    changePassword, sendMail, sendVerifyCode,
    verifyCode
};