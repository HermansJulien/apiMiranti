const Router = require("express-promise-router");
const router = new Router;
const localityByCountriesController = require('../../../Controleur/localityByCountries');

/**
 * @swagger
 * /localityByCountry/:
 *  get:
 *      tags:
 *          - localitiesByCountry
 *      parameters:
 *          - in: query
 *            name: localitiesByCountry
 *            description: all localities related to a country
 *            schema:
 *                type: object
 *                properties:
 *                    countryName:
 *                        type: string
 *      responses:
 *          200:
 *              $ref: '#/components/responses/LocalitiesByCountry'
 *          404:
 *              description: We found no localities related to this country
 *          500:
 *              description: Server Error
 */
router.get('/', localityByCountriesController.getLocalityByCountry);
module.exports = router;