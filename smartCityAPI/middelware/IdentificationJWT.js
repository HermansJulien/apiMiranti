require('dotenv').config();
const process = require('process');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *      ErrorJWT:
 *          description: JWT is not valid
 *      MissingJWT:
 *          description: JWT doesn't exist
 */
module.exports.identification = async (req, res, next) => {
    const headerAuth = req.get('authorization');

    if (headerAuth !== undefined && headerAuth.includes("Bearer")) {
        const jwtToken = headerAuth.split(' ')[1];
        try {
            const decodedJwtToken = jwt.verify(jwtToken, process.env.SECRET_TOKEN);
            req.session = decodedJwtToken.value;
            req.session.authLevel = decodedJwtToken.status;
            next();
        }
        catch (e) {

            res.status(400).json({error:"Invalid Token"});
        }
    } else {

        res.status(401).json({error:"Not the right role"});
    }
};