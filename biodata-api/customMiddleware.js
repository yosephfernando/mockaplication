const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.json({"status":401, "message":"Token is empty"})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.json({"status":401, "message":"Not allowed"})
    req.user = user
    if(req.user.role == "admin"){
      req.user.id_user = ""
    }
    next()
  })
}

module.exports = authenticateToken
