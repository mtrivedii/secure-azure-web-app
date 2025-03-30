module.exports = async function (context, req) {
    context.res = {
      status: 200,
      body: {
        message: "Backend API is working ✅",
        timestamp: new Date()
      }
    };
  };
  