// const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');
// const { expressjwt: jwt } = require("express-jwt");

const jwksClient = require('jwks-rsa');

// const logger = () => {}


const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.status(401).send('Token is missing');
  }

  jwt.verify(token, getKey, {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  }, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).send('Invalid token');
    }

    console.log('Decoded JWT:', decoded);
    req.user = decoded;
    next();
  });
};


// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   // Validate the audience and the issuer.
//   audience: process.env.AUTH0_IDENTITY,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256'],

 

//   getToken: (req) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//     console.log('Token:', token);  
//     return token;}
// });

const logDecodedJwt = (req, res, next) => {
  console.log('Decoded JWT:', req.user);
  next();
};





// checkJwt.use((req, res, next) => {
//   console.log('Decoded JWT:', req.user);
//   next();
// });

// const checkJwtWithLogging = (req, res, next) => {
//   checkJwt(req, res, (err) => {
//     if (err) {
//       console.error('JWT Error:', err);
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     console.log('Decoded JWT:', req.user);
//     next();
//   });
// };

module.exports = {
  
  checkJwt,
  logDecodedJwt
}