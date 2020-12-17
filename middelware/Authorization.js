/**
 *@swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: Only admins can do that
 */


module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === "admin"){
        next();
    } else {
        res.status(403).json({error:"Forbidden access"});
    }
}
