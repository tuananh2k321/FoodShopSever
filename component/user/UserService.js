const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')

//http://localhost:3000/api/user/login
const login = async (email, password) => {
    // const user = users.find(u => u.email == email);
    // console.log(user, email, password)
    // if (user && user.password == password) {
    //     return user;
    // }
    // return null;

    try {
        const user = await UserModel.findOne({ email: email })

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
const register = async (email, password, name) => {
    try {
        //check email toon tại hay chua
        //selecct * form users where email = email;
        const user = await UserModel.findOne({ email: email })
        console.log("email:" + email);
        if (user) {
            return false;
        } else {
            let typeRole
            console.log("email:" + email);
            email.startsWith('admin') ? typeRole = 100 : typeRole = 1;

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = { email, password: hash, name, role: typeRole };
            const u = new UserModel(newUser);
            await u.save();
            return true;
        }
    } catch (error) {
        console.log("Register error" + error)
        return false;

    }
}
const deleteUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
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

const updateUser = async (email, password, name) => {
    try {
        //check email toon tại hay chua
        //selecct * form users where email = email;
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.name = name ? name : user.name;
            user.email = email ? email : user.email;
            user.password = password ? password : user.password;
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
module.exports = { login, register, deleteUserByEmail, updateUser, getAllUser };
