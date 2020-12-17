require("dotenv").config();
const pool = require('../Model/database');
const clientDb = require('../Model/client');

/**
 * @swagger
 * components:
 *  schemas:
 *      Client:
 *          type: object
 *          properties:
 *              mailAddress:
 *                  type: string
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              role:
 *                  type: string
 */

/**
 * @swagger
 * components:
 *  responses:
 *      ClientsFound:
 *          description: We found clients
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Client'
 */
module.exports.getCLients = async (req, res) =>{
    const client = await pool.connect();
    try{
        const {rows : clients} = await clientDb.getClients(client,req.query.email, req.query.firstName, req.query.lastName, req.query.role);
        const clientDbFind = clients[0];
        if(clientDbFind !== undefined){
            let indiceConversion = 0;

            let tab = [];
            while(indiceConversion < clients.length){
                let objet = {};
                objet.mailAddress = clients[indiceConversion].mailaddress;
                objet.role = clients[indiceConversion].role;
                objet.lastName = clients[indiceConversion].name;
                objet.firstName = clients[indiceConversion].firstname;
                tab.push(objet);
                indiceConversion++;
            }
            res.json(tab);
        }else{
            res.status(404).json({error : "No clients found"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({error : "Something goes wrong"});
    }finally {
        client.release();
    }
}
/**
 * @swagger
 * components:
 *  responses:
 *     ClientExist:
 *          description: Client Id is already in the db
 *     AddedClient:
 *          description: Client added
 *  requestBodies:
 *       AddClient:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          mailAddress:
 *                              type: string
 *                          firstName:
 *                              type: string
 *                          name:
 *                             type: string
 *                          role:
 *                              type: string
 *                          password:
 *                              type: string
 *                      required:
 *                          - mailAddress
 *                          - firstName
 *                          - name
 *                          - role
 *                          - password
 */

module.exports.postClient = async (req,res) =>{
    const{mailAddress,name,firstName,role,password} =req.body;
    if( (mailAddress === undefined ||mailAddress === "")
        || (name === undefined ||name === "")
        || (firstName === undefined ||firstName === "")
        || (role === undefined || role==="")
        || (password === undefined ||password ==="")){
        res.status(400).json({error:"You forget some important input"});
    }else{
        const client = await pool.connect();
        try{
            const {rows : clientExists} = await clientDb.getClients(client, mailAddress);
            const clientDbFind = clientExists[0];
            if(clientDbFind !== undefined){
                res.status(401).json({error:"Username already taken"});
            }else{
                await clientDb.postClient(client,mailAddress,name,firstName,role,password);
                res.sendStatus(201);
            }
        }catch (e){
            console.log(e);
            res.status(500).json({error:"something goes wrong"});
        }finally {
            client.release();
        }

    }
}
/**
 * @swagger
 * components:
 *  responses:
 *      DeletedClient:
 *          description: Client deleted
 *  requestBodies:
 *      UpdatedClient:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          mailAddress:
 *                              type: string
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          role:
 *                              type: string
 *                          password:
 *                              type: string
 *                      required:
 *                          - mailAddress
 *                          - firstName
 *                          - lastName
 *                          - role
 */
module.exports.deleteClient = async (req,res) =>{
    const mailAddress = req.query.mailAddress;
    if(mailAddress === undefined || mailAddress === ""){
        res.status(400).json({error:"You forget to mention the client "});
    }else{
        const client = await pool.connect();
        try{
            await clientDb.deleteClient(client,req.query.mailAddress);
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
 *      UpdatedClient:
 *          description: Client updated
 */
module.exports.updateClient = async (req,res) =>{
    const{mailAddress,name,firstName,role,newPassword} =req.body;
    if( (mailAddress === undefined ||mailAddress === "")
        || (name === undefined ||name === "")
        || (firstName === undefined ||firstName === "")
        || (role === undefined || role==="")){
        res.status(400).json({error:"You forget some important input"});
    }else{
        const client = await pool.connect();
        try{
            console.log(mailAddress,name,firstName,role,newPassword,);
            await clientDb.updateClient(client,mailAddress,name,firstName,role,newPassword);
            res.sendStatus(204);
        }catch (e){
            console.log(e);
            res.status(500).json({error:"something goes wrong"});
        }finally {
            client.release();
        }
    }

}

