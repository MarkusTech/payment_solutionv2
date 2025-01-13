module.exports = {
  apps: [
    {
      name: "app",
      script: "./dist/server.js",
      instances: "max", // Scale to use all CPU cores
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
