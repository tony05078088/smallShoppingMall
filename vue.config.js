module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://mall-pre.springboot.cn",
        changeOrigin: true, //跨域
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
  // ESLint關閉
  // lintOnSave: false

  productionSourceMap: false, //本地設成true,可看源碼;打包上線設false,看不到
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  },
};
