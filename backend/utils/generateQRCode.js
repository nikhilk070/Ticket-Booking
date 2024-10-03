const QRCode = require("qrcode");
const fs = require('fs');
const path = require('path')

const generateQRCode = async (text) => {


//   try {
//     const qrCode = await QRCode.toDataURL(text);
//     return qrCode;
//   } catch (error) {
//     throw new Error("Failed to generate QR code");
//   }
    try{
      const qrDirectory = path.join(__dirname, '../qrcode')
      const filepath = path.join(qrDirectory, `${text}.png`)

      if(!fs.existsSync(qrDirectory)){
        fs.mkdirSync(qrDirectory, {recursive : true})
      }

      await QRCode.toFile(filepath, text, {
        width : 300,
        margin : 2,
        color: {
          dark: '#000000',
          light: '#0000'    // Transparent background
        }
      })

      return filepath

    } catch(err){
      console.log("err while generating ", err)
    }
    
};

module.exports = generateQRCode;
