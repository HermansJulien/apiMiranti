const { getHash } = require('../utils/utils');
module.exports.getClients = async (client, mail, firstName, lastName, role) => {
    return await client.query(
        `SELECT mailaddress,name,firstname,role from client
        where (mailaddress = $1 OR $1 is null)
        and (name = $2 OR $2 is null)
        and (firstname= $3 OR $3 is null)
        and (role = $4 OR $4 is null)
        order by mailaddress asc;
        
    `,[mail,lastName,firstName,role]);
}
module.exports.postClient = async(client ,mailAddress,name,firstName,role,password) =>{
    const mdp = await getHash(password);

    return await client.query(`INSERT INTO client(mailAddress,accountpassword,role,name,firstname) values($1,$2,$3,$4,$5)`,[mailAddress,mdp,role,name,firstName])

}
module.exports.deleteClient = async(client,mail)=>{

    return await client.query(`DELETE from client where mailaddress = $1`,[mail]);
}

module.exports.updateClient = async (client,mailAddress,name,firstName,role,newPassword) =>{

        if(newPassword === undefined){
            return await client.query(`UPDATE client set role = $1, name = $2, firstname=$3 where mailaddress = $4`,[role,name,firstName,mailAddress]);
        }else{
            const mdp = await getHash(newPassword);
            return await client.query(`UPDATE client set role = $1, name = $2, firstname=$3, accountpassword=$4 where mailaddress = $5`,[role,name,firstName,mdp,mailAddress])
        }

}