module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    publicPath: "./",
    proxy: {
      "/api": {
        target: "https://www,imooc.com", // 接口地址
        changeOrigin: true, //跨域
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
};
