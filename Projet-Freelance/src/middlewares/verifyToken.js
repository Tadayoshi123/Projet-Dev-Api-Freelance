const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({
            auth: false,
            token: null,
            message: 'No token provided.'
        });
}
    jwt.verify(token, process.env.JWT_SECRET, (error, jwtDecoded) => {
        if (error) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: 'Unauthorized.'
            })
        }
        console.log(jwtDecoded);
        req.userToken = jwtDecoded;
        next();
    });
}

module.exports = verifyToken;