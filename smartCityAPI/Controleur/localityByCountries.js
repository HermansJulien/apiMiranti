require("dotenv").config();

const pool = require('../Model/database');
const localityByCountryDB = require('../Model/localityByCountries');
/**
 * @swagger
 * components:
 *  schemas:
 *      LocalitiesByCountry:
 *          type: object
 *          properties:
 *              idLocality:
 *                  type: integer
 *              localityName:
 *                  type: string
 *              idCountry:
 *                  type: integer
 *              countryName:
 *                  type: string
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      LocalitiesByCountry:
 *          description: We found localities for the country
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LocalitiesByCountry'
 */
module.exports.getLocalityByCountry = async (req, res) => {
    const client = await pool.connect();
    try {
        const {rows : localitiesByCountries} = await localityByCountryDB.getLocalityByCountry(client,req.query.countryName);
        const localityByCountry = localitiesByCountries[0];
        if(localityByCountry !== undefined){
            let indiceConversion = 0;
            let tab = [];
            while(indiceConversion < localitiesByCountries.length){
                let objet = {};
                objet.idLocality = localitiesByCountries[indiceConversion].idlocality;
                objet.localityName = localitiesByCountries[indiceConversion].localityname;
                objet.idCountry = localitiesByCountries[indiceConversion].idcountry;
                objet.countryName = localitiesByCountries[indiceConversion].countryname;
                tab.push(objet);
                indiceConversion++;
            }

            res.json(tab);

        }else{
            res.status(404).json({error:"No localities found"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({error:"Something goes wrong on the server"});
    }finally {
        client.release();
    }
}