require("dotenv").config();
const uuid = require('uuid');
const {saveImg,discardImg} = require('../Model/imageManager');

const destFolderImg = "./upload/img";
const pool = require('../Model/database');
const heritageDB = require('../Model/heritage');
/**
 * @swagger
 * components:
 *  schemas:
 *      Heritage:
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
 *                  type: object
 *              frenchDesc:
 *                  type: string
 *              englishDesc:
 *                  type: string
 *              idLocality:
 *                  type: integer
 *              picture:
 *                  type: string
 *              nbSeen:
 *                  type: integer
 *              nbLikes:
 *                  type: integer
 *              nbDislikes:
 *                  type: integer
 */

/**
 * @swagger
 * components:
 *  responses:
 *      HeritageFound:
 *          description: We found heritages
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Heritage'
 */
module.exports.getHeritages = async (req, res) => {
    const client = await pool.connect();
    try {
        const {rows : heritages} = await heritageDB.getHeritages(client,req.query.heritage, req.query.locality, req.query.country, req.query.kind,req.query.order);
        const heritage = heritages[0];
        if(heritage !== undefined){
            let indiceConversion = 0;

            let tab = [];
            while(indiceConversion < heritages.length){
                let objet = {};
                objet.technicalId = heritages[indiceConversion].technicalid;
                objet.countryName = heritages[indiceConversion].countryname;
                objet.localityName = heritages[indiceConversion].localityname;
                objet.kindOfHeritage = heritages[indiceConversion].kindofheritage;
                objet.heritageName = heritages[indiceConversion].heritagename;
                objet.author = heritages[indiceConversion].author;
                objet.creationDate = heritages[indiceConversion].creationdate;
                objet.localization = heritages[indiceConversion].localization;
                objet.englishDescription = heritages[indiceConversion].englishdescription;
                objet.frenchDescription = heritages[indiceConversion].frenchdescription;
                objet.picture = heritages[indiceConversion].picture;
                objet.nbrSeen = heritages[indiceConversion].nbrseen;
                objet.nbrLikes = heritages[indiceConversion].nbrlikes;
                objet.nbrDislikes = heritages[indiceConversion].nbrdislikes;

                tab.push(objet);
                indiceConversion++;
            }
            console.log(tab);
            res.json(tab);
        }else{
            console.log(req.query.heritage);
            res.status(404).json({error : "No heritages found"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({error : "Something goes wrong on the server"});
    }finally {
        client.release();
    }
}
/**
 * @swagger
 * components:
 *  responses:
 *      AddedHeritage:
 *          description: Heritage Added
 *
 *
 */
module.exports.addHeritage = async (req,res) =>{
    const{heritageName,kindOfHeritage,author,localization,creationDate,frenchDesc,englishDesc, idLocality} =req.body;
    const picture = req.files.picture;
    if((heritageName === undefined || heritageName === "")
        || (kindOfHeritage === undefined ||kindOfHeritage === "")
        || (localization === undefined || localization==="")
        || (frenchDesc === undefined ||frenchDesc==="")
        || (englishDesc === undefined || englishDesc==="")
        || (picture === undefined)
        || (idLocality === undefined ||idLocality === "")
    ){
        res.status(400).json({error:"You forget some important input"});
    }else{

        const client = await pool.connect();
        const imgRandomName = uuid.v4();

        try{
            const result = await saveImg(picture[0].buffer, imgRandomName,destFolderImg);
            const authorDb= (author==="" || author === undefined)?null:author;
            const dateDb = (creationDate==="" ||creationDate=== undefined)?null:creationDate;
            console.log(dateDb);

            await heritageDB.addHeritage(client,heritageName,kindOfHeritage,authorDb,localization,dateDb,frenchDesc,englishDesc,idLocality,`/img/${imgRandomName}.jpeg`);

            res.sendStatus(201);

        }catch (e){
            console.log(e);
            const resultD = await discardImg(`${destFolderImg}/${imgRandomName}.jpeg`);
            res.status(500).json({error:"Error : Something goes wrong on the server"});
        }finally {
            client.release();
        }
    }
}
/**
 * @swagger
 * components:
 *  responses:
 *      HeritageDeleted:
 *          description: We have deleted this heritage
 */
module.exports.deleteHeritage = async (req,res) =>{
    const heritageId = req.query.heritageId;
    if((heritageId === undefined || heritageId === "")){
        res.status(400).json({error:"You forget to mention the heritage "});
    }else{
        const client = await pool.connect();
        try{

            await heritageDB.deleteHeritage(client,heritageId);

            console.log(req.query.picture);
            const resultD = await discardImg("./upload"+req.query.picture);

            res.sendStatus(204);
        }catch(e){
            console.log(e);
            res.status(500).json({error:"Error : Something goes wrong on the server"});
        }finally {
            client.release();
        }
    }
}
/**
 * @swagger
 * components:
 *  responses:
 *      UpdatedHeritage:
 *          description: Heritage Updated
 *  requestBodies:
 *      postHeritage:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          heritageId:
 *                              type: integer
 *                          heritageName:
 *                              type: string
 *                          kindOfHeritage:
 *                              type: string
 *                          author:
 *                              type: string
 *                          localization:
 *                              type: string
 *                          creationDate:
 *                              type: object
 *                          frenchDesc:
 *                              type: string
 *                          englishDesc:
 *                              type: string
 *                          idLocality:
 *                              type: integer
 *                          oldPicture:
 *                              type: string
 *                          picture:
 *                              type: string
 *                      required:
 *                          - heritageId
 *                          - heritageName
 *                          - kindOfHeritage
 *                          - frenchDesc
 *                          - englishDesc
 *                          - idLocality
 *                          - oldPicture
 *
 *
 *
 *
 *
 */
module.exports.updateHeritage = async(req,res) =>{
    const{heritageId,heritageName,kindOfHeritage,author,localization,creationDate,frenchDesc,englishDesc, idLocality,oldPicture} =req.body;

    const picture = req.files.picture === undefined ?"noImg":req.files.picture;
    if(heritageId === undefined){
        res.status(400).json({error:"You forget to mention the heritage "});
    }else{
        if( (heritageName === undefined || heritageName === "")
            || (kindOfHeritage === undefined ||kindOfHeritage === "")
            || (localization === undefined || localization==="")
            || (frenchDesc === undefined ||frenchDesc==="")
            || (englishDesc === undefined || englishDesc==="")
            || (picture === undefined)
            || (idLocality === undefined || idLocality === "")
            || (oldPicture === undefined ||oldPicture === "")

        ){
            res.status(400).json({error:"You forget to mention importantValue "});
        }else{
            const client = await pool.connect();
            const imgRandomName = uuid.v4();
            try{
                const authorDb= (author==="" || author === undefined)?null:author;
                const dateDb = (creationDate==="" ||creationDate=== undefined)?null:creationDate;
                if(picture === "noImg"){
                    await heritageDB.updateHeritage(client,heritageId,heritageName,kindOfHeritage,authorDb,localization,dateDb,frenchDesc,englishDesc,idLocality,oldPicture);
                }else{
                    const result = await saveImg(picture[0].buffer, imgRandomName,destFolderImg);

                    await heritageDB.updateHeritage(client,heritageId,heritageName,kindOfHeritage,authorDb,localization,dateDb,frenchDesc,englishDesc,idLocality,`/img/${imgRandomName}.jpeg`);
                    const resultD = await discardImg("./upload"+oldPicture);
                }
                res.sendStatus(204);
            }catch(e){
                if(picture !== undefined){
                    const resultD = await discardImg(`/img/${imgRandomName}.jpeg`);
                }
                console.log(e);
                res.status(500).json({error:"Error : Something goes wrong on the server"});
            }finally {
                client.release();
            }
        }
    }



}