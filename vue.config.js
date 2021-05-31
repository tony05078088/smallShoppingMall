module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://mall-pre.springboot.cn", // 接口地址
        changeOrigin: true, //跨域
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
  // ESLint關閉
  // lintOnSave: false
};
