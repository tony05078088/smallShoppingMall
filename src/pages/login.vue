<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt="" />
      </a>
    </div>
    <div class="wrapper">
      <div class="login_form">
        <h3>
          <span>
            帳號登錄
          </span>
          <span>
            QRCode登錄
          </span>
        </h3>
        <div class="input_area">
          <div class="input">
            <input type="text" placeholder="請輸入帳號" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="請輸入密碼"
              v-model="password"
            />
          </div>
        </div>
        <button class="btn" @click="login">登錄</button>
        <div class="tips">
          <div class="sms" @click="register">
            手機簡訊登錄/註冊
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "login",
  //data宣告為一個function,避免頁面之間及組件之間數據 全局的竄用
  data() {
    return {
      username: "",
      password: "",
      userId: "",
    };
  },
  methods: {
    // saveUserName === this.$store.dispatch('saveUserName)
    ...mapActions(["saveUserName"]),
    login() {
      // 因變量掛載在Vue實例上,可使用解構
      let {username, password} = this;
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then(res => {
          console.log(res);
          this.$cookie.set("userId", res.id, {
            expires: "Session",
          });
          //todo: 保存使用者名稱
          //this.$store.dispatch("saveUserName", res.username);
          this.saveUserName(res.username);
          this.$router.push({
            // path:'/index',
            //query傳參數用path,params傳參要用name,對應的是路由的名稱
            name: "index",
            params: {
              from: "login",
            },
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      this.axios
        .post("/user/register", {
          username: "tony",
          password: "123456",
          email: "tony@tony.com",
        })
        .then(res => {
          console.log(res);
          this.$message.info("註冊成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/button.scss";

.login {
  width: 100%;
  height: 100%;
  .container {
    width: 20%;
    height: 10%;
    padding: 0 70% 0 10%;
  }
  .wrapper {
    position: relative;
    width: 100%;
    height: 600px;
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .login_form {
      position: absolute;
      top: 10%;
      right: 6%;
      width: 30%;
      height: 80%;
      display: flex;
      flex-direction: column;
      background-color: $colorG;
      padding: 2% 2.5% 15% 2.5%;
      box-sizing: border-box;
      h3 {
        width: 75%;
        display: flex;
        line-height: 10%;
        height: 10%;
        color: $colorA;
        font-size: $fontG;
        margin: 0 auto 10% auto;
        span {
          width: 50%;
          &:first-child {
            &:after {
              position: absolute;
              right: 55%;
              transform: translate(-50%, -50%);
              content: "";
              height: 4%;
              border: 1px solid black;
            }
          }
        }
      }
      .input_area {
        height: 50%;
        .input {
          padding: 0 3%;
          border: 1px solid rgb(229, 229, 229);
          height: 50%;
          margin-bottom: 5%;
          input {
            border: none;
            height: 100%;
          }
        }
      }
      .btn {
        width: 100%;
        line-height: 30px;
        height: 30px;
        margin-top: 10%;
        background-color: $colorA;
        font-size: 1rem;
        text-align: center;
      }
      .tips {
        color: $colorA;
        height: 3%;
        margin-top: 2%;
      }
    }
  }
  .footer {
    height: 300px;
    background-color: $colorG;
  }
}
</style>
