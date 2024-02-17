<template>
   <h1>账户信息:</h1>
   <van-divider :margin="12" />
   <p>地址:{{address}}</p>
   <van-divider :margin="12" />
   <p>私钥:{{privateKey}}</p>
   <van-divider :margin="12" />
   <p>余额:{{balance}}</p>
   
   <van-divider :margin="12" />
   <h1>转账操作</h1>
   <van-button type="primary" @click="send">开始转账</van-button>
</template>

<script setup>
import { ref, inject } from "vue";
import Web3, { ContractTransactionDataAndInputError } from "web3";
import Tx from 'ethereumjs-tx';

const wssGoerliTest = inject('$wssGoerliTest');//注入全局方法
 
var web3 = new Web3(Web3.givenProvider || wssGoerliTest);
//var web311 = new web3(web3.givenProvider || "ws://localhost:8545");
//console.log("Web3:", web3) 

//创建账号
// const account = web3.eth.accounts.create("123");
// console.log("account-->",account)

const address = ref("0xB36abFFDb423bD33d4C11sdf0DCe7414422d234f06FCe4")
const privateKey= ref("0x60e5fac5413a63ded9b739401df6b7wer234c51a43b8b34392342dff7e54a8e0e271d4430")

const balance = ref(0)

//balance.value = 
web3.eth.getBalance(address.value).then((res)=>{
    balance.value = res
})
//console.log("balance----->",balance)


//单位转换
let num1 = web3.utils.toWei('0.30','ether');
let num2 = web3.utils.fromWei("300000000000",'ether');
console.log("num2---->",num2);

//转账
const send = async ()=>{
    //1.构建转账参数
    //获取账户交易次数
    const nonce = await web3.eth.getTransactionCount(address.value);
    console.log("nonce--->",nonce)
    //获取预计转账gas
    const gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice--->",gasPrice);
    //转账金额 以wei 作为单位
    const value = web3.utils.toWei('0.000', 'ether');

    const rawTx = {
        from:address.value,
        to:'0x75844F334e4fDa3FD590fd5A2824324C939csdfs8E17c2D4E',
        nonce,
        gasPrice,
        value,
        data:'0x0000',
    };

    //2. 生成 serializedTx

    //转换成私钥
    const pKys = Buffer(privateKey.value.slice(2),'hex')
    console.log('pKys--->',pKys);
    //gas 估算
    const gas = await web3.eth.estimateGas(rawTx);
    console.log("gas---->",gas)
    rawTx.gas = gas;
    
    // ethereumjs-tx 实现私钥加密
    const tx = new Tx(rawTx);
    tx.sign(pKys)

    //生成 serializedTx 
    const serializedTx = `0x${tx.serialize().toString('hex')}`;
    console.log("serializedTx---->",serializedTx);

    //3.开始转账
    const trans = web3.eth.sendSignedTransaction(serializedTx)

    //监控
    trans.on('transactionHash',(txid)=>{
        console.log("交易ID",txid);
        console.log('h')
    })

    trans.on('receipt',(res)=>{
        console.log("节点确认",res);
    })

    trans.on('confirmation',()=>{
        console.log("第N个节点确认");
    })

}


</script>

<style>

</style>