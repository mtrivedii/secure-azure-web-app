const { sql, config } = require('../db');

module.exports = async function (context, req) {
  const { email, password } = req.body || {};
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    context.res = {
      status: 403,
      body: { error: "Forbidden: Invalid API key" }
    };
    return;
  }

  if (!email || !password) {
    context.res = {
      status: 400,
      body: { error: "Missing email or password" }
    };
    return;
  }

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;

    const validUser = result.recordset.length > 0;

    context.res = {
      status: validUser ? 200 : 401,
      body: validUser
        ? { message: "Login successful" }
        : { error: "Invalid credentials" }
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: "Internal Server Error", details: err.message }
    };
  }
};
