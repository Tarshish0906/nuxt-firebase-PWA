<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-web3-alpha</h1>
      <h2 class="subtitle">My Awesome Nuxt.js project</h2>

      <div class="links" v-if="!isSignedIn">
        <button @click="signIn()">Sign In</button>
      </div>

      <div class="links" v-if="isSignedIn">
        <input type="text" v-model="inputMessage" placeholder="input message" />
        <button @click="setMessage()">Set Message to contract</button>
      </div>
      <div class="links">
        <button @click="getMessage()">Get Message from contract</button>
      </div>
      <div>Message:{{ message }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import sha256 from "js-sha256";
import toContract from "~/plugins/toContract.js";
export default {
  data() {
    return {
      // コントラクトから取得する文字
      message: "",
      // フォームから入力された文字
      inputMessage: "",
      // サインイン
      isSignedIn: false,
      // 秘密鍵
      pk: "",
      // アドレス
      address: ""
    };
  },
  methods: {
    getMessage: async function() {
      // コントラクトからの読み込み部分
      let ret = await this.$contract.methods.get().call();
      // フロントに反映
      this.message = ret;
    },
    setMessage: async function() {
      // // MetaMask で使っているアカウントの取得
      // let accounts = await this.$web3.eth.getAccounts();
      // console.log(accounts);
      // let account = accounts[0];
      // // コントラクトへの書き込み部分
      // let ret = await this.$contract.methods
      //   .set(this.inputMessage)
      //   .send({ from: account });
      const functionAbi = await this.$contract.methods
        // 呼び出す関数と引数の設定
        .set(this.inputMessage)
        .encodeABI();

      // toContract の呼び出し
      let result = await toContract(
        this,
        this.address,
        this.privateKey,
        functionAbi
      );
    },
    signIn: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  },
  mounted() {
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
    // 認証情報の受け取り
    var self = this;
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          let user = result.user;
          self.isSignedIn = true;
          console.log(user.uid);
          // 秘密鍵の生成
          self.privateKey = "0x" + sha256.hex(user.uid);
          self.address = self.$web3.eth.accounts.privateKeyToAccount(
            self.privateKey
          ).address;
          self.$web3.eth.defaultAccount = self.address;
          console.log("Address:" + self.address);
        }
      })
      .catch(function(error) {
        let errorMessage = error.message;
        console.log(errorMessage);
      });
    console.log("Current Block Number");
    this.$web3.eth.getBlockNumber().then(console.log);
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
