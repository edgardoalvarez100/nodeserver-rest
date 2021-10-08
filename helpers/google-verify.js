const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerification = async(token='') => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });
  const {name,email, picture } = ticket.getPayload();

  return {nombre: name,correo: email, img: picture };
 
}


module.exports = googleVerification
