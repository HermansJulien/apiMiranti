const Router = require("express-promise-router");
const router = new Router;
const heritageController = require('../../../Controleur/heritage');
const multer = require('multer');
const JWTMiddleware = require("../../../middelware/IdentificationJWT");
const AuthoMiddleware = require("../../../middelware/Authorization");
const storage = multer.memoryStorage();
const upload = multer({
    limits:{
        fileSize:700000
    },
    storage:storage
})
/**
 * @swagger
 * /heritage/:
 *  patch:
 *      tags:
 *          - Heritage
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/postHeritage'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/UpdatedHeritage'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server Error
 */
router.patch('/',JWTMiddleware.identification,AuthoMiddleware.mustBeAdmin,upload.fields([
    {name:'heritageName', maxCount:1},
    {name:'countryName',maxCount: 1},
    {name:'kindOfHeritage',maxCount: 1},
    {name:'author', maxCount:1},
    {name:'localization',maxCount: 1},
    {name:'creationDate',maxCount: 1},
    {name:'frenchDesc', maxCount:1},
    {name:'englishDesc',maxCount: 1},
    {name:'idLocality',maxCount: 1},
    {name:'picture',maxCount: 1},
    {name:'oldPicture',maxCount: 1},
    {name:'heritageId',maxCount: 1}
]),heritageController.updateHeritage);
/**
 * @swagger
 * /heritage/:
 *  get:
 *      tags:
 *          - Heritage
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: heritage
 *            description: Research form to find the heritage
 *            schema:
 *                type: object
 *                properties:
 *                    heritage:
 *                        type: string
 *                    country:
 *                        type: string
 *                    locality:
 *                        type: string
 *                    kind:
 *                        type: string
 *                    order:
 *                        type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/HeritageFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: We found no heritages
 *          500:
 *              description: Server Error
 */
router.get('/',JWTMiddleware.identification,heritageController.getHeritages);
/**
 * @swagger
 * /heritage/:
 *  delete:
 *      tags:
 *          - Heritage
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: heritageId
 *            required: true
 *            description: Heritage id to be deleted
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              $ref: '#/components/responses/HeritageDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server Error
 */
router.delete('/',JWTMiddleware.identification,AuthoMiddleware.mustBeAdmin,heritageController.deleteHeritage);


/**
 * @swagger
 * /heritage/:
 *  post:
 *      tags:
 *          - Heritage
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/postHeritage'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AddedHeritage'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server Error
 */
router.post('/', JWTMiddleware.identification,AuthoMiddleware.mustBeAdmin,upload.fields([
    {name:'heritageName', maxCount:1},
    {name:'countryName',maxCount: 1},
    {name:'kindOfHeritage',maxCount: 1},
    {name:'author', maxCount:1},
    {name:'localization',maxCount: 1},
    {name:'creationDate',maxCount: 1},
    {name:'frenchDesc', maxCount:1},
    {name:'englishDesc',maxCount: 1},
    {name:'idLocality',maxCount: 1},
    {name:'picture',maxCount: 1},

]),heritageController.addHeritage);
module.exports = router;