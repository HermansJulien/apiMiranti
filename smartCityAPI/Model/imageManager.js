const sharp = require('sharp');
const fs = require('fs');
module.exports.saveImg = (imageBuffer, imageName, destFolder) => {
    console.log(imageBuffer);
    return sharp(imageBuffer)
        .jpeg()
        .resize({
            fit: 'inside',
            width: 200,
            height: 200
        })
        .toFile(`${destFolder}/${imageName}.jpeg`);
};

module.exports.discardImg = (address) => {
   if(fs.existsSync(address)){
       fs.unlink(address,(err) => {
           if(err) throw err;
       })
   }

}