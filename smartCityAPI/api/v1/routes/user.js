const Router = require("express-promise-router");
const router = new Router;
const userController = require('../../../Controleur/user');
/**
 * @swagger
 * /user/login/:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/clientLoggedForm'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/clientLogged'
 *          400:
 *              description: Missing arguments
 *          404:
 *              description: User not found
 *          500:
 *              description: Server Error
 */
router.post('/login', userController.login);
/**
 * @swagger
 * /user/signin/:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/clientSigninForm'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/clientSigned'
 *          400:
 *              description: Missing arguments
 *          401:
 *              description: Username already taken
 *          500:
 *              description: Server Error
 */
router.post('/signin',userController.signin);
module.exports = router;