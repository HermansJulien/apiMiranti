module.exports.getHeritages = async (client, name, localName, countryName, kind,order) => {
    console.log(order);
    if(order==="asc"){
        return await client.query(
            `  select sub1.nbrSeen,sub1.nbrLikes,sub1.nbrDislikes,heritage.technicalid, heritage.heritagename, heritage.kindofheritage, locality.localityname, country.countryname, heritage.author, heritage.creationdate , heritage.localization, heritage.englishdescription ,heritage.frenchdescription,heritage.picture from
            (select 
            COUNT(*) as nbrSeen,
            COUNT(isliked) filter (where isliked = 1) as nbrLikes,
            COUNT(isliked) filter (where isliked = 0) as nbrDisLikes,
            heritage.technicalid 
            from heritage 
            left join heritageuserrepertoryseen on heritage.technicalid = heritageuserrepertoryseen.technicalid 
            group by(heritage.technicalid)) as sub1
join heritage on sub1.technicalid = heritage.technicalid
            join locality on heritage.idlocality = locality.idlocality
            join country on country.idcountry = locality.idcountry 
        where (heritage.heritagename = $1 OR $1 is null)
        and (country.countryname = $2 OR $2 is null)
        and (locality.localityname = $3 OR $3 is null)
        and (heritage.kindofheritage = $4 OR $4 is null)
        order by heritage.heritagename asc;
    `,[name,countryName,localName,kind]);
    }else{
        if(order==="mostV"){
            return await client.query(`
             select sub1.nbrSeen,sub1.nbrLikes,sub1.nbrDislikes,heritage.technicalid, heritage.heritagename, heritage.kindofheritage, locality.localityname, country.countryname, heritage.author, heritage.creationdate , heritage.localization, heritage.englishdescription ,heritage.frenchdescription,heritage.picture from
            (select 
            COUNT(*) as nbrSeen,
            COUNT(isliked) filter (where isliked = 1) as nbrLikes,
            COUNT(isliked) filter (where isliked = 0) as nbrDisLikes,
            heritage.technicalid 
            from heritage 
            left join heritageuserrepertoryseen on heritage.technicalid = heritageuserrepertoryseen.technicalid 
            group by(heritage.technicalid)) as sub1
join heritage on sub1.technicalid = heritage.technicalid
            join locality on heritage.idlocality = locality.idlocality
            join country on country.idcountry = locality.idcountry 
            where (heritage.heritagename = $1 OR $1 is null)
            and (country.countryname = $2 OR $2 is null)
            and (locality.localityname = $3 OR $3 is null)
            and (heritage.kindofheritage = $4 OR $4 is null)
            order by nbrSeen DESC
            `,[name,countryName,localName,kind])
        }else{
            return await client.query(
                ` select sub1.nbrSeen,sub1.nbrLikes,sub1.nbrDislikes,heritage.technicalid, heritage.heritagename, heritage.kindofheritage, locality.localityname, country.countryname, heritage.author, heritage.creationdate , heritage.localization, heritage.englishdescription ,heritage.frenchdescription,heritage.picture from
            (select 
            COUNT(*) as nbrSeen,
            COUNT(isliked) filter (where isliked = 1) as nbrLikes,
            COUNT(isliked) filter (where isliked = 0) as nbrDisLikes,
            heritage.technicalid 
            from heritage 
            left join heritageuserrepertoryseen on heritage.technicalid = heritageuserrepertoryseen.technicalid 
            group by(heritage.technicalid)) as sub1
join heritage on sub1.technicalid = heritage.technicalid
            join locality on heritage.idlocality = locality.idlocality
            join country on country.idcountry = locality.idcountry 
            where (heritage.heritagename = $1 OR $1 is null)
            and (country.countryname = $2 OR $2 is null)
            and (locality.localityname = $3 OR $3 is null)
            and (heritage.kindofheritage = $4 OR $4 is null);
    `,[name,countryName,localName,kind]);
        }
    }

}
module.exports.addHeritage = async(client,heritageName,kindOfHeritage,author,localization,creationDate,frenchDesc,englishDesc,idLocality,address) => {
    console.log("test");
    return await client.query(`INSERT INTO heritage(heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDescription,englishDescription,picture) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[heritageName,kindOfHeritage,localization,author,creationDate,idLocality,frenchDesc,englishDesc,address]);
}
module.exports.deleteHeritage = async(client, heritageId) => {

    return await client.query(`DELETE from heritage h where h.technicalid = $1`,[heritageId]);
}


module.exports.updateHeritage = async(client,heritageId,heritageName,kindOfHeritage,author,localization,creationDate,frenchDesc,englishDesc,idLocality,address) =>{
    return await client.query(`UPDATE heritage set heritageName = $2, kindofheritage =$3, author = $4, localization = $5, creationdate = $6, frenchdescription = $7, englishdescription = $8, idlocality =$9, picture = $10 where technicalid = $1 `,[heritageId,heritageName,kindOfHeritage,author,localization,creationDate,frenchDesc,englishDesc,idLocality,address]);


}

module.exports.heritageExist = async(client, idHeritage)=>{
    return await client.query(`select * from heritage where technicalid =$1`,[idHeritage]);
}

