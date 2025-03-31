const sql = require('mssql');
const config = {
  user: process.env.DB_USER, // e.g., sa or another SQL login
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // Your SQL Server name
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use encryption if your SQL Server supports it
    trustServerCertificate: true, // Needed for self-signed certificates
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error('Error connecting to database: ', error);
    throw error;
  }
}

module.exports = {
  getConnection,
};
