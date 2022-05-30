const jwksRsa = require('jwks-rsa');
const { expressjwt: jwt } = require('express-jwt');

const domain = process.env.AUTH0_DOMAIN
const identity = process.env.AUTH0_IDENTITY

const logger = (req, res, next) => {
  console.log(`Logging route: ${req.path}, Date: ${new Date().toISOString()}`)
  next()
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: identity,
  issuer: `https://${domain}/`,
  algorithms: ['RS256']
});

module.exports = {
  logger,
  checkJwt
}