const { sql, config } = require("../db");

module.exports = async function (context, req) {
  try {
    const { email, password } = req.body;

    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email} AND Password = ${password}`;

    if (result.recordset.length > 0) {
      context.res = {
        status: 200,
        body: { message: "Login successful" }
      };
    } else {
      context.res = {
        status: 401,
        body: { error: "Invalid credentials" }
      };    
    }
  } catch (err) {
    context.log("LOGIN ERROR:", err); // This will show up in App Insights
    context.res = {
      status: 500,
      body: { error: "Internal Server Error" }
    };
  }
};
