require("dotenv").config();
const pool = require('../Model/database');
const heritageSeenDb = require('../Model/heritageSeen');
const clientDb = require('../Model/client');
const heritageDb = require('../Model/heritage');


/**
 * @swagger
 * components:
 *  schemas:
 *      HeritageSeen:
 *          type: object
 *          properties:
 *              technicalId:
 *                  type: integer
 *              heritageName:
 *                  type: string
 *              kindOfHeritage:
 *                  type: string
 *              author:
 *                  type: string
 *              localization:
 *                  type: string
 *              creationDate:
 *                  type: string
 *              frenchDesc:
 *                  type: string
 *              englishDesc:
 *                  type: string
 *              idLocality:
 *                  type: integer
 *              picture:
 *                  type: string
 *              isLiked:
 *                  type: integer
 */

/**
 * @swagger
 * components:
 *  responses:
 *      HeritageSeenFound:
 *          description: We found Heritages for the user
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HeritageSeen'
 */
module.exports.getHeritagesSeen = async (req, res) => {
    const client = await pool.connect();
    const mailAddress = req.query.mailAddress;
    if ((mailAddress === undefined || mailAddress === "")) {
        res.status(400).send({ error: "You forget to selection your email" });
    }
    try {
        const { rows: heritagesSeens } = await heritageSeenDb.getHeritagesSeen(client, mailAddress, req.query.heritage, req.query.locality, req.query.country, req.query.kind);
        const heritageSeen = heritagesSeens[0];
        if (heritageSeen !== undefined) {
            let indiceConversion = 0;

            let tab = [];
            while (indiceConversion < heritagesSeens.length) {
                let objet = {};
                objet.technicalId = heritagesSeens[indiceConversion].technicalid;
                objet.countryName = heritagesSeens[indiceConversion].countryname;
                objet.localityName = heritagesSeens[indiceConversion].localityname;
                objet.kindOfHeritage = heritagesSeens[indiceConversion].kindofheritage;
                objet.heritageName = heritagesSeens[indiceConversion].heritagename;
                objet.author = heritagesSeens[indiceConversion].author;
                objet.creationDate = heritagesSeens[indiceConversion].creationdate;
                objet.localization = heritagesSeens[indiceConversion].localization;
                objet.englishDescription = heritagesSeens[indiceConversion].englishdescription;
                objet.frenchDescription = heritagesSeens[indiceConversion].frenchdescription;
                objet.picture = heritagesSeens[indiceConversion].picture;
                objet.isLiked = heritagesSeens[indiceConversion].isliked;
                tab.push(objet);
                indiceConversion++;
            }
            console.log(tab);
            res.json(tab);
        } else {
            console.log(req.query.heritage);
            res.status(404).json({ error: "No heritages found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Something goes wrong on the server" });
    } finally {
        client.release();
    }

}
/**
 * @swagger
 * components:
 *  responses:
 *      AddedHeritageSeen:
 *          description: Heritage Added
 *  requestBodies:
 *      postHeritageSeen:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          heritageId:
 *                              type: integer
 *                          mailAddress:
 *                              type: string
 *                          isLiked:
 *                              type: integer
 *                      required:
 *                          - heritageId
 *                          - mailAddress
 *                          - isLiked
 */

module.exports.addHeritageSeen = async (req, res) => {
    const { mailAddress, idHeritage, isLiked } = req.body;

    if ((mailAddress === undefined || mailAddress === "") || (idHeritage === undefined || idHeritage === "") || (isLiked === undefined || isLiked === "")) {
        res.status(400).json({ error: "You forget some important input" });

    } else {
        const client = await pool.connect();
        try {
            const { rows: clientExists } = await clientDb.getClients(client, mailAddress);
            const clientDbFind = clientExists[0];
            if (clientDbFind === undefined) {
                res.status(401).json({ error: "Unknown email" });
            } else {
                const { rows: heritageExists } = await heritageDb.heritageExist(client, idHeritage);
                const heritageDbExist = heritageExists[0];
                if (heritageDbExist === undefined) {
                    res.status(401).json({ error: "Unknown heritage" });
                } else {
                    const { rows: heritageSeenExist } = await heritageSeenDb.heritageSeenExist(client, mailAddress, idHeritage);
                    const heritageSeenExistDb = heritageSeenExist[0];
                    if (heritageSeenExistDb !== undefined) {
                        res.status(401).json({ error: "You already seen this heritage" });
                    } else {
                        await heritageSeenDb.addHeritageSeen(client, mailAddress, idHeritage, isLiked);
                        res.sendStatus(201);
                    }
                }
            }

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error : Something goes wrong on the server" });
        } finally {
            client.release();
        }
    }
}
/**
 * @swagger
 * components:
 *  responses:
 *      HeritageDeletedSeen:
 *          description: We have deleted this heritage
 */
module.exports.deleteHeritageSeen = async (req, res) => {
    const { mailAddress, heritageId } = req.query;
    if ((heritageId === undefined || heritageId === "") || (mailAddress === undefined || mailAddress === "")) {
        res.status(400).json({ error: "You forget to mention important input" });
    } else {
        const client = await pool.connect();
        try {
            await heritageSeenDb.deleteHeritageSeen(client, heritageId, req.query.mailAddress);
            res.sendStatus(204);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error : Something goes wrong on the server" });
        } finally {
            client.release();
        }
    }
}
/**
 * @swagger
 * components:
 *  responses:
 *      HeritageUpdatedSeen:
 *          description: We have updated this heritage
 */
module.exports.updateHeritageSeen = async (req, res) => {
    const { mailAddress, idHeritage, isLiked } = req.body;
    if ((mailAddress === undefined || mailAddress === "") || (idHeritage === undefined || idHeritage === "") || (isLiked === undefined || isLiked === "")) {
        res.status(400).json({ error: "You forget some important input" });
    } else {
        const client = await pool.connect();
        try {
            const { rows: clientExists } = await clientDb.getClients(client, mailAddress);
            const clientDbFind = clientExists[0];
            if (clientDbFind === undefined) {
                res.status(401).json({ error: "Unknown email" });
            } else {
                const { rows: heritageExists } = await heritageDb.heritageExist(client, idHeritage);
                const heritageDbExist = heritageExists[0];
                if (heritageDbExist === undefined) {
                    res.status(401).json({ error: "Unknown heritage" });
                } else {
                    const { rows: heritageSeenExist } = await heritageSeenDb.heritageSeenExist(client, mailAddress, idHeritage);
                    const heritageSeenExistDb = heritageSeenExist[0];
                    if (heritageSeenExistDb !== undefined) {
                        await heritageSeenDb.updateHeritageSeen(client, mailAddress, idHeritage, isLiked);
                        res.sendStatus(204);

                    } else {
                        res.status(401).json({ error: "You must have seen that heritage" });
                    }
                }
            }

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Error : Something goes wrong on the server" });
        } finally {
            client.release();
        }
    }
}