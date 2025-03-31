const { getConnection } = require('../db');
const sql = require('mssql');

module.exports = async function (context, req) {
  try {
    const { email, password } = req.body;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Users WHERE email = @email AND password = @password');

    if (result.recordset.length > 0) {
      context.res = {
        status: 200,
        body: { message: 'Login successful' }
      };
    } else {
      context.res = {
        status: 401,
        body: { error: 'Invalid credentials' }
      };
    }
  } catch (err) {
    console.error('API Error:', err); // Log error to server logs
    context.log.error(`Error details: ${err.message}`, { stack: err.stack }); // Additional logging
    context.res = {
      status: 500,
      body: { error: 'Server error: ' + err.message }
    };
  }
};
