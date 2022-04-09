/**
 * index.js
 * Connects to the mysql database
 */

const config = require("./config");
const mysql = require("mysql");

exports.handler = async (event, context) => {
  console.log("Testing cloudwatch logging");
  const email = event.request.userAttributes.email;
  console.log("email ", email);
  const username = event.request.userAttributes["preferred_username"];
  console.log("username ", username);

  var con = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
  });

  con.connect(function (err) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log("Connected to MySQL database!");

    const query = `INSERT INTO public.iuser (id, email, username) VALUES ('${username}', '${email}', '${username}')`;

    con.query(query, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });

  context.done(null, event);
};
