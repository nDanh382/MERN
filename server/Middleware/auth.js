const jwt = require('jsonwebtoken');

const verifyAccessToken =  (req, res, next) =>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Access token not found"
        })
    };
    try {
        const decode = jwt.verify(token, process.env.REGISTER_JWT_SECRET);
        req.userId = decode._id;
        next()
    } catch (error) {
        console.log(error);
        res.status(405).json({
            success: false,
            message: "Invalid token"
        })
    }

}
module.exports = verifyAccessToken;