const crypto = require('crypto');

function generateJwtSecret() {
    const jwtSecret = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex characters
    return jwtSecret;
}

console.log(generateJwtSecret());
