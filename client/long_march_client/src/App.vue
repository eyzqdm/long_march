<template>
<div>
<div @click="changeNum">num:{{num}}</div>
  <router-view></router-view>
</div>
</template>

<script lang="ts">
import { provide} from 'vue'
import {useNum } from './model/useTest'

export default{
  setup(){
    const res = useNum()
    provide('test',res)
    const {num,changeNum}  = res
    return {
      num,
      changeNum
    }
  }
}
</script>

<style></style>
