

<script setup>
import { ref } from "vue";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import ethwllet, { hdkey, fromV3 } from "ethereumjs-wallet";

import Web3 from "web3";

//创建助记词
// const mnemonic = generateMnemonic();
// console.log("mnemonic--->",mnemonic)

const gm = ref(
  "slab soon raise mushroom foil bunker explain sleep style story piano number  "
);
//const seed =
const genMnemonic = async () => {
  const seed = await mnemonicToSeed(gm.value);
  console.log("seed---->", seed);
  const hdWallet = hdkey.fromMasterSeed(seed);

  const keypair = hdWallet.derivePath("m/44'/60'/0'/0/0");
  console.log("keypair--->", keypair);

  //获取私钥
  //1.获取钱包对象
  const wallet = keypair.getWallet();
  console.log("wallet---->", wallet);

  //2.获取钱包地址
  const lowerCaseAddress = wallet.getAddressString();
  console.log("lowerCaseAddress--->", lowerCaseAddress);
  //3.获取钱包的校验地址
  const checkAddress = wallet.getChecksumAddressString();
  //4.获取私钥
  const pkey = wallet.getPrivateKey().toString("hex");
  console.log("pkey----<>", pkey);

  //导出keystore

  //1.web3js

  var web3 = new Web3(
    Web3.givenProvider ||
      "wss://goerli.infura.io/ws/v3/dc92288a8359d44v3548907ede39td9d7ba5861"
  );
  //const keystore = web3.eth.accounts.encrypt('0x4c0883a69102937d6231471b5dbb6204fve5412961708c2792ae468d01a3f362318', "111");
  //console.log("keystore----->",keystore)

  const keystore2 = await wallet.toV3("111");
  console.log("keystore2----->",keystore2);

  //通过keystore 获取私钥
  //1.web3
  //const res = web3.eth.accounts.decrypt(keystore,'111')
 // console.log("res----->", res)

  //2.wallet

  const res2 = await ethwllet.fromV3(keystore2, "111") ;

  const key = res2.getPrivateKey().toString("hex");
  console.log("key----", key);
};
genMnemonic();
</script>

<template>
  <h1>助记词</h1>
  <p>{{ gm }}</p>

  <p>账号地址:0x4f98c8f01c3e70f9dac82fe86d7d0bdc5389e32fa8d</p>
  <p>
    账号私钥:6ecbaa87da47eb92255bc0bb5ce1d134g0b7cf9w1390234ba0475b2c5bd82e52d94ec
  </p>
</template>
<style>
</style>