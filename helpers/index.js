const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const upload = require("./upload");


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...upload
}