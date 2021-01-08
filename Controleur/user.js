require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../Model/database');
const userDB = require('../Model/authUser');
const clientDb = require('../Model/client');

/**
 * @swagger
 * components:
 *  requestBodies:
 *      clientSigninForm:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      clientSigned:
 *          description: The client is signed
 */
module.exports.signin = async (req,res) =>{
    const { email, password, firstName, lastName} = req.body;

    if((email === undefined ||email === "")
        || (password === undefined || password === "")
        ||(firstName === undefined|| firstName==="")
        || (lastName === undefined ||lastName ==="")){
        res.status(400).json({error:"Missing important inputs"});
    }else{
        const client = await pool.connect();
        try{

            const {rows : clientExists} = await clientDb.getClients(client, email);
            const clientDbFind = clientExists[0];
            if(clientDbFind !== undefined){
                res.status(401).json({error:"Username already taken"});
            }else{
                await clientDb.postClient(client,email,lastName,firstName,"user",password);
                res.status(201).json({error:"Client added"});
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
 *  requestBodies:
 *      clientLoggedForm:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      token:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 */
/**
 * @swagger
 * components:
 *  responses:
 *      clientLogged:
 *          description: The client is logged
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/token'
 */
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    if ((email === undefined ||email==="") || (password === undefined ||password === "")) {
        res.status(400).json({error:"Don't forget to write your id"});
    } else {
        const client = await pool.connect();
        try {
            const result = await userDB.getUser(client, email, password);
            console.log(email + "" + password);          
            const { userType, value } = result;
            if (userType === "inconnu") {

                res.status(404).json({error:"No match between this email and the password entered "});
            } else if (userType === "admin") {
                const mailAddress = value.mailaddress;
                const firstName = value.firstname;
                const payload = { status: userType, value: { mailAddress, firstName } };
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    { expiresIn: '12h' }
                );
                res.json(token);

            } else {
                const mailAddress = value.mailaddress;
                const firstName = value.firstname;
                const lastName = value.lastname;
                const payload = { status: userType, value: { mailAddress, firstName, lastName } };
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    { expiresIn: '12h' }
                );
                res.json(token);
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({error:"Something goes wrong on the server"});
        } finally {
            client.release();
        }
    }
};