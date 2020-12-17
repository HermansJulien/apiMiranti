module.exports.getHeritagesSeen = async (client, mail,name, localName, countryName, kind)=>{
    return await client.query(
        `select   
            h2.isliked ,h.technicalid, h.heritagename, h.kindofheritage, l.localityname, c2.countryname, h.author, h.creationdate , h.localization, h.englishdescription ,h.frenchdescription,h.picture from heritage h
            inner join heritageuserrepertoryseen h2 on (h2.technicalid = h.technicalid)
            inner join locality l ON (h.idlocality = l.idlocality)
            inner join country c2 on (l.idcountry = c2.idcountry)
            inner join client c on (h2.mailaddress = c.mailaddress)
            where (h.heritagename = $1 OR $1 is null)
            and (c2.countryname = $2 OR $2 is null)
            and (l.localityname = $3 OR $3 is null)
            and (h.kindofheritage = $4 OR $4 is null)
            and c.mailaddress = $5 
            order by h.heritagename asc;
        
      
    `,[name,countryName,localName,kind,mail]);
}

module.exports.addHeritageSeen = async (client, mail, heritage,isLiked) =>{
    return await client.query(`insert into heritageuserrepertoryseen values($1,$2,$3)
    `,[isLiked,mail,heritage]);
}

module.exports.heritageSeenExist = async (client,mailAddress,idHeritage) =>{
    return await client.query(
        `select * from heritageuserrepertoryseen
           where mailaddress = $1 
           and technicalid = $2;
    `,[mailAddress,idHeritage]);
}

module.exports.deleteHeritageSeen = async (client,idHeritage,mailAddress) =>{
    console.log(idHeritage,mailAddress);
  return await client.query(`delete from heritageuserrepertoryseen where mailaddress =$1 and technicalid=$2 `,[mailAddress,idHeritage]);

}

module.exports.updateHeritageSeen = async (client,mailAddress,idHeritage,isLiked) =>{
    return await client.query(`update heritageuserrepertoryseen set isliked = $1 where mailaddress=$2 AND technicalid=$3
    `,[isLiked,mailAddress,idHeritage]);
}