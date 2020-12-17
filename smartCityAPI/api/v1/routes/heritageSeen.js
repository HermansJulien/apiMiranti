const Router = require("express-promise-router");
const router = new Router;
const heritageSeenController = require('../../../Controleur/heritageSeen');
const JWTMiddleware = require("../../../middelware/IdentificationJWT");

/**
 * @swagger
 * /heritageSeen/:
 *  get:
 *      tags:
 *          - HeritageSeen
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: heritageSeen
 *            description: Research form to find the heritage for an user
 *            schema:
 *                type: object
 *                properties:
 *                    heritageId:
 *                        type: integer
 *                    mailAddress:
 *                        type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/HeritageSeenFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: We found no heritages for this user
 *          500:
 *              description: Server Error
 */
router.get('/',JWTMiddleware.identification, heritageSeenController.getHeritagesSeen);

/**
 * @swagger
 * /heritageSeen/:
 *  post:
 *      tags:
 *          - HeritageSeen
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/postHeritageSeen'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddedHeritageSeen'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server Error
 *
 */
router.post('/',JWTMiddleware.identification,heritageSeenController.addHeritageSeen);
/**
 * @swagger
 * /heritageSeen/:
 *  delete:
 *      tags:
 *          - HeritageSeen
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: heritageSeen
 *            description: Research form to find the heritage for an user
 *            schema:
 *                type: object
 *                properties:
 *                    heritageId:
 *                        type: integer
 *                    mailAddress:
 *                        type: string
 *      responses:
 *          201:
 *              $ref: '#/components/responses/HeritageDeletedSeen'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server Error
 */
router.delete('/',JWTMiddleware.identification,heritageSeenController.deleteHeritageSeen);
/**
 * @swagger
 * /heritageSeen/:
 *  patch:
 *      tags:
 *          - HeritageSeen
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/postHeritageSeen'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/HeritageUpdatedSeen'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server Error
 */
router.patch('/',JWTMiddleware.identification,heritageSeenController.updateHeritageSeen);

module.exports = router;