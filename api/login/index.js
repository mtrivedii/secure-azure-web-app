module.exports = async function (context, req) {
    const { email, password } = req.body || {};
  
    if (!email || !password) {
      context.res = {
        status: 400,
        body: { error: "Missing email or password" }
      };
      return;
    }
  
    // Hardcoded creds (replace with DB check later)
    const validUser = email === "admin@example.com" && password === "secure123";
  
    context.res = {
      status: validUser ? 200 : 401,
      body: validUser
        ? { message: "Login successful" }
        : { error: "Invalid credentials" }
    };
  };
  