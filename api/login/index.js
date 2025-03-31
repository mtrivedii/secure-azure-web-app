const { getConnection } = require('../db');
const sql = require('mssql');

module.exports = async function (context, req) {
  try {
    const { email, password } = req.body; // These are the credentials sent from the client
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Users WHERE email = @email AND password = @password');

    if (result.recordset.length > 0) {
      context.res = {
        status: 200,
        body: { message: 'Login successful' },
      };
    } else {
      context.res = {
        status: 401,
        body: { error: 'Invalid credentials' },
      };
    }
  } catch (err) {
    console.error('Error:', err);
    context.res = {
      status: 500,
      body: { error: 'Server error: ' + err.message },
    };
  }
};
