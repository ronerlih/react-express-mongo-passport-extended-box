var crypto = require('crypto');

// Defining key 
const key = crypto.createHash('sha256').update(String(process.env.CRYPTO_PASS)).digest('base64').substr(0, 32);
const algorithm = process.env.CRYPTO_ALGO;
const iv = Buffer.from(process.env.CRYPTO_SALT, "hex"); 
  
const encrypt = stringToEnctypt => {
 
   // Creating Cipheriv with its parameter 
   let cipher = crypto.createCipheriv( 
      algorithm, Buffer.from(key), iv); 

   // Updating text 
   let encrypted = cipher.update(stringToEnctypt); 

    
   // Using concatenation 
   encrypted = Buffer.concat([encrypted, cipher.final()]); 
   
    // Returning encrypted data 
   return encrypted.toString('hex'); 
};

const decrypt = encryptedHex => {
   let encryptedText = 
      Buffer.from(encryptedHex, 'hex'); 
    
   // Creating Decipher 
   let decipher = crypto.createDecipheriv( 
          algorithm, Buffer.from(key), iv); 
    
   // Updating encrypted text 
   let decrypted = decipher.update(encryptedText); 
   decrypted = Buffer.concat([decrypted, decipher.final()]); 
    
   // returns data after decryption 
   return decrypted.toString();};

module.exports = {
	encrypt,
	decrypt
};