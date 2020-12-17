const Router = require("express-promise-router");
const router = new Router;
const clientController = require('../../../Controleur/client');
const JWTMiddleware = require("../../../middelware/IdentificationJWT");
const AuthoMiddleware = require("../../../middelware/Authorization");
/**
 * @swagger
 * /client/:
 *  get:
 *      tags:
 *          - Client
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: user
 *            description: Research form to find the user
 *            schema:
 *                type: object
 *                properties:
 *                    email:
 *                        type: string
 *                    firstName:
 *                        type: string
 *                    lastName:
 *                        type: string
 *                    role:
 *                        type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ClientsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: We found no client
 *          500:
 *              description: Server Error
 */
router.get('/', JWTMiddleware.identification,clientController.getCLients);
/**
 * @swagger
 * /client/:
 *  post:
 *      tags:
 *          - Client
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/AddClient'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddedClient'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server Error
 *
 *
 */
router.post('/',JWTMiddleware.identification,AuthoMiddleware.mustBeAdmin,clientController.postClient);
/**
 * @swagger
 * /client/:
 *  delete:
 *      tags:
 *          - Client
 *      parameters:
 *          - in: query
 *            name: mailAddress
 *            required: true
 *            description: Client id to be deleted
 *            schema:
 *              type: string
 *
 *
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/DeletedClient'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server Error
 *
 */
router.delete('/',JWTMiddleware.identification,AuthoMiddleware.mustBeAdmin,clientController.deleteClient);

/**
 * @swagger
 * /client/:
 *  patch:
 *      tags:
 *          - Client
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *            $ref: '#/components/requestBodies/UpdatedClient'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/UpdatedClient'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server Error
 */
router.patch('/',JWTMiddleware.identification,AuthoMiddleware.mustBeAdmin,clientController.updateClient);
module.exports = router;
