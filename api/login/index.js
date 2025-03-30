module.exports = async function (context, req) {
    const { email, password } = req.body || {};
    const apiKey = req.headers['x-api-key'];
  
    // Require API key to match what's set in Azure app settings
    if (apiKey !== process.env.API_KEY) {
      context.res = {
        status: 403,
        body: { error: "Forbidden: Invalid API key" }
      };
      return;
    }
  
    // Validate input
    if (!email || !password) {
      context.res = {
        status: 400,
        body: { error: "Missing email or password" }
      };
      return;
    }
  
    // Hardcoded user check (replace with SQL DB later)
    const validUser = email === "admin@example.com" && password === "secure123";
  
    context.res = {
      status: validUser ? 200 : 401,
      body: validUser
        ? { message: "Login successful" }
        : { error: "Invalid credentials" }
    };
  };
  