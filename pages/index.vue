<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">nuxt-web3-alpha</h1>
      <h2 class="subtitle">My Awesome Nuxt.js project</h2>
      <div class="links">
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
export default {
  data() {
    return {
      // コントラクトから取得する数値
      message: "",
      // フォームから入力された数値
      inputMessage: ""
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
      // MetaMask で使っているアカウントの取得
      let accounts = await this.$web3.eth.getAccounts();
      console.log(accounts);
      let account = accounts[0];
      // コントラクトへの書き込み部分
      let ret = await this.$contract.methods
        .set(this.inputMessage)
        .send({ from: account });
    }
  },
  mounted() {
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
