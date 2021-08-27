var mysql = require("mysql2");

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "globalbit",
});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();

const DB = {
  async register({ email, firstname, lastname, address, password }) {
    try {
      await promisePool.execute(
        "Insert Into users (email, firstname, lastname, address, password) Values (?,?,?,?,?);",
        [email, firstname, lastname, address, password]
      );
      return { success: true, message: "Registration Successful" };
    } catch (err) {
      if (err.errno === 1062) return { success: false, message: "Email already exists. Try another one." };
      return { success: false, message: "Registration error. Try again later." };
    }
  },

  async login({ email, password }) {
    try {
      const result = await promisePool.execute("Select * From users Where (email = ?)", [email]);

      if (!result[0].length) return { success: false, message: "User does not exist" };
      if (result[0][0]["password"] !== password) return { success: false, message: "Incorrect password" };
      return { success: true, message: "Login Successful" };
      
    } catch (err) {
      return { success: false, message: "Registration error. Try again later." };
    }
  },
};

module.exports = {
  DB,
};
