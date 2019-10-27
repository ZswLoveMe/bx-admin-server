const db = require('./db.js');
module.exports = {
  getUser:async ()=>{
    let user = await db.q("select * from users",[]);
     console.log('user:',user);
    return user;
  },
  findUserByname:async username => await db.q("select 1 from users where username = ?",username),
  registerUser:async (...user) => await db.q("INSERT INTO `users` (`username`, `password`, `email`) VALUES ( ?, ?, ?)",user),
  findUserByNameAndPassword:async (...user)=>db.q("select * from users where username = ? and password = ?",user)
}