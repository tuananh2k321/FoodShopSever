//check register
const validationRegister = async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ result: false ,message:'It nhat 6 ki tu'})
    }else{
        let regex = /([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])/;
        if (!regex.test(email)) {
            return res.status(400).json({ result: false,
                 message: 'Email không hợp lệ' });
        }
        regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({ result: false,
                 message: 'Mật khẩu phải có ít nhất 8 ký tự, chữ và số' });
        }
        return next(); 
    }

}
module.exports = {
    validationRegister
}