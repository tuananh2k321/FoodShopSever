var express = require('express');
var router = express.Router();



//http://localhost:3000/payment/aoi/
router.post('/pay', async (req, res) => {
    try {
        const { email, verifyCode } = req.body;
        const result = await userController.verifyCode(email, verifyCode);
        return res.status(200).json({ message: "Verify Success", result: result });
    } catch (error) {
        console.log("MAIL:" + error)//API
        return res.status(500).json({ result: false, massage: "ERROR Verify" })//app
    }
});











module.exports = router;

