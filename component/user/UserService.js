const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')

//http://localhost:3000/api/user/login
const login = async (phoneNumber, password) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
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
        console.log("phoneNumbeaaaaaaaaaaaar", phoneNumber)
        console.log("QQQQ", password, name, email, address, gender, dob, avatar, role, createAt)


        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        console.log("userrrr", user)
        if (user == null) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            if (phoneNumber == '0337744148') {
                let typeRole = 100
                const newUser = { phoneNumber, password: hash, name, email, address, gender, dob, avatar, role: typeRole, createAt };
                const u = new UserModel(newUser);
                await u.save();
                return true;
            } else {
              
                const newUser = { phoneNumber, password: hash, name, email, address, gender, dob, avatar, role, createAt };
                const u = new UserModel(newUser);
                await u.save();
                return true;
            }

        } else {
            return false;
        }
    } catch (error) {
        console.log("Register error" + error)
        return false;
    }
}
const deleteByPhoneNumber = async (phoneNumber) => {
    try {
        const user = await UserModel.findOne({ phoneNumber: phoneNumber })
        console.log(user)
        {
            await UserModel.deleteOne(user)
        }
        return true;
    } catch (error) {
        console.log("Delete User  error", error);
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
            console.log("INFO USER:", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error", error)
        return false;
    }
}
const search = async (phoneNumber) => {
    try {
        console.log("phoneNumber", phoneNumber)
        return await UserModel.findOne(
            { phoneNumber: phoneNumber }
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
        console.log("List user Got an error: ", error);
        throw error;
    }
}
const changePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            console.log("INFO USER:", user);
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            if (isPasswordValid) {
                user.password = newPassword
                await user.save();
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("Change Password got an error: ", error);
        throw error;
    }
}

module.exports = {
    login, register, deleteByPhoneNumber,
    updateUser, getAllUser, search, changePassword
};
