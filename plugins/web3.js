import Web3 from "web3";
// コントラクトのコンパイル後の設定ファイルの読み込み
// import artifacts from "~~/build/contracts/SingleNumRegister.json";
import artifacts from "~~/build/contracts/Message.json";

export default async function(context, inject) {
  let web3;

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch(error => {
      console.log(error);
    });
  } else if (
    typeof window !== "undefined" &&
    typeof window.web3 !== "undefined"
  ) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    const httpEndpoint = "http://127.0.0.1:7545";
    web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint));
  }
  // チェーンのネットワークIDを取得
  let networkId = await web3.eth.net.getId();
  // コントラクトのインスタンスの初期化。設定ファイルと、アドレスが必要
  let contract = new web3.eth.Contract(
    // コントラクトのコンパイル後の設定ファイル
    artifacts.abi,
    // ネットワークIDごとに保存されているコントラクトのアドレスを読みこむ
    artifacts.networks[networkId].address
  );
  inject("web3", web3);
  inject("contract", contract);
}
