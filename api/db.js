const sql = require('mssql');

const config = {
  server: 'maanit-sql-server.database.windows.net',
  database: 'secureAppDB',
  authentication: {
    type: 'azure-active-directory-password',
    options: {
      userName: '455184@student.fontys.nl',
      password: process.env.DB_PASSWORD
    }
  },
  options: {
    encrypt: true
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('DB connection error:', err);
    throw err;
  }
}

module.exports = { getConnection };
