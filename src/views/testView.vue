<template>
  <!-- <h1>{{string}}</h1>
 
<van-button type="primary">主要按钮</van-button> -->
 
<!-- <web-3-api></web-3-api> -->
<account-sys></account-sys>
</template>

<script setup>
 
import {ref} from "vue";
import web3Api from "../components/web3Api.vue"
import AccountSys from "../components/AccountSys.vue"

const string = ref("hello web3")
 


</script>

<style lang="less">
h1{
  color:red;
}
</style>
