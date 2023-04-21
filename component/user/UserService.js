const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')

//http://localhost:3000/api/user/login
const login = async (phoneNumber, password) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        console.log(user)
        // if (user && user.password.toString() == password.toString()) {
        //     return user;
        // }
        if (user) {
            const result = bcrypt.compareSync(password, user.password);
            return result ? user : false;
        }
    } catch (error) {
        console.log('Login error' + error)
        return false;

    }
}
//http://localhost:3000/api/user/register
const register = async (phoneNumber, password, name, email, address, gender, dob, avatar, role, createAt) => {
    try {
        //check email toon tại hay chua
        //selecct * form users where email = email;
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        console.log("phoneNumber:" + phoneNumber);
        if (user) {
            return false;
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { phoneNumber, password: hash, name, email, address, gender, dob, avatar, role, createAt };
            const u = new UserModel(newUser);
            await u.save();
            return true;

        }
    } catch (error) {
        console.log("Register error" + error)
        return false;

    }
}
const deleteUserByphoneNumber = async (phoneNumber) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        console.log(user)
        {
            await UserModel.deleteOne(user)
        }
        return true;
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const updateUser = async (phoneNumber, password, name, email, address, gender, dob, avatar, role) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        if (user) {
            user.name = name ? name : user.name;
            user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;
            user.password = password ? password : user.password;
            user.email = email ? email : user.email;
            user.address = address ? address : user.address;
            user.gender = gender ? gender : user.gender;
            user.dob = dob ? dob : user.dob;
            user.avatar = avatar ? avatar : user.avatar;
            user.role = role ? role : user.role;
            await user.save();
            console.log("USER:" + user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}
const search = async (phoneNumber) => {
    try {
        console.log("phoneNumber",phoneNumber)
        // return await myProductModel.find({
            
        //     // $and: [
        //     //     // { phoneNumber: { $regex: phoneNumber, $options: 'i' } },
        //     //     { $phoneNumber: { $search: "\"phoneNumber\"  " } }
        //     // ]
        // }).sort({});

        return await myProductModel.find(
            // { phoneNumber: { $regex: phoneNumber, $options: 'i' } },
            { $phoneNumber: { $search: phoneNumber } }

        )
       
    } catch (error) {
        return false;
    }
}
const getAllUser = async (page, size) => {
    try {
        // return data;
        return await UserModel.find();
        //  data.splice(index, 1);
    } catch (error) {
        console.log("List user Got an error: " + error);
        throw error;
    }
}
module.exports = {
    login, register, deleteUserByphoneNumber,
    updateUser, getAllUser, search,
};
