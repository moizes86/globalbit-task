const mysql = require("mysql2");
const bycrypt = require("bcrypt");
const saltRounds = 10;

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "globalbit",
});

const promisePool = pool.promise();

const DB = {
  async register({ email, firstname, lastname, address, password }) {
    let hash = await new Promise((resolve, reject) => {
      bycrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return await promisePool.execute(
      "Insert Into users (email, firstname, lastname, address, password) Values (?,?,?,?,?);",
      [email, firstname, lastname, address, hash]
    );
  },

  async login({ email, password }) {
    const result = await promisePool.execute("Select * From users Where (email = ?)", [email]);

    if (!result[0].length) throw Error("User does not exist");
    const match = await bycrypt.compare(password, result[0][0]["password"]);
    if (!match) throw Error("Incorrect password");
    return;
  },

  async verify({ email, code }) {
    let user = await promisePool.execute("Select email, code From users Where (email = ?)", [email]);
    user = user[0][0];
    if (user.code === +code) {
      const result = await promisePool.execute("Update users SET verified = 1, code = 0 WHERE (email = ?)", [
        email,
      ]);
      return;
    }
    throw Error("Verification failed - code does not match");
  },

  async getUsersToDisplay() {
    try {
      const result = await promisePool.execute("Select firstname, lastname, email From users");
      return { success: true, payload: result[0] };
    } catch (err) {
      return { success: false, payload: "Something went wrong. Try again later" };
    }
  },

  async insertCode(email, code) {
    try {
      const result = promisePool.execute("Update users Set code = ? WHERE (email = ?);", [code, email]);
      return { success: true, payload: "Updated" };
    } catch (err) {
      return { success: false, payload: "Something went wrong. Try again later" };
    }
  },
};

module.exports = {
  DB,
};
