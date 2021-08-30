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

    try {
      await promisePool.execute(
        "Insert Into users (email, firstname, lastname, address, password) Values (?,?,?,?,?);",
        [email, firstname, lastname, address, hash]
      );
      return { success: true, payload: "Registration Successful" };
    } catch (err) {
      if (err.errno === 1062) return { success: false, payload: "Email already exists. Try another one." };
      return { success: false, payload: "Registration error. Try again later." };
    }
  },

  async login({ email, password }) {
    try {
      const result = await promisePool.execute("Select * From users Where (email = ?)", [email]);

      if (!result[0].length) return { success: false, payload: "User does not exist" };
      if (!bycrypt.compare(password, result[0][0]["password"]))
        return { success: false, payload: "Incorrect password" };
      return { success: true, payload: "Login Successful" };
    } catch (err) {
      return { success: false, payload: "Registration error. Try again later." };
    }
  },

  async verify({ email, code }) {
    try {
      let user = await promisePool.execute("Select email, code From users Where (email = ?)", [email]);
      user = user[0][0];
      if (user.code === +code) {
        const result = await promisePool.execute(
          "Update users SET verified = 1, code = 0 WHERE (email = ?)",
          [email]
        );
        return { success: true, payload: "Congratulations! User activated" };
      }

      return { success: false, payload: "Verification failed - code doesn'nt match" };
    } catch (err) {
      return { success: false, payload: "Verification error. Try again later." };
    }
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
