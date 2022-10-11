const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use("/api/user/login",
    createProxyMiddleware({
      target:"http://pompei-classroom-api.fly.dev",
      changeOrigin: true
    })
  );
  app.use("/api/user/signup",
    createProxyMiddleware({
      target:"http://pompei-classroom-api.fly.dev",
      changeOrigin: true
    })
  );
  app.use("/api/homework",
    createProxyMiddleware({
      target:"http://pompei-classroom-api.fly.dev",
      changeOrigin: true
    })
  );
};