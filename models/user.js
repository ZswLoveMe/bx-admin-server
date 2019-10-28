const db = require('./db.js');
module.exports = {
  findUserByName:async email => {
     let user = await db.row("select * from users where email = ?",email)
    return user
  },
}