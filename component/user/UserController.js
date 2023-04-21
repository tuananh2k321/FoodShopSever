const UserService = require('./Userservice');
const mailer = require('nodemailer')

const login = async (phoneNumber, password) => {
    try {
        console.log(phoneNumber, password);

        return await UserService.login(phoneNumber, password);
    } catch (error) {
        return false;
    }
}
const register = async (phoneNumber, password, name, email, address, gender, dob, avatar, role,createAt) => {
    try {
        return await UserService.register(phoneNumber, password, name, email, address, gender, dob, avatar, role,createAt);

    } catch (error) {
        return false;
    }
}
const deleteUserByphoneNumber = async (phoneNumber) => {
    try {
        return await UserService.deleteUserByphoneNumber(phoneNumber);

    } catch (error) {
        return false;
    }
}
const updateUser = async ( phoneNumber, password, name, email, address, gender, dob, avatar, role) => {
    try {
        return await UserService.updateUser( phoneNumber, password, name, email, address, gender, dob, avatar, role);

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
const search = async (phoneNumber)=>{
    try {
        return await UserService.search(phoneNumber);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login, register, deleteUserByphoneNumber,
    updateUser, getAllUser,search
};