<template>
  <div>
      <span>testModel</span>
      <div @click="changeNum">test:{{num}}</div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
setup(){
    const useNum = inject('test')
    const {changeNum,num} = useNum
    return {
        num,
        changeNum
    }
}
}
</script>

<style>

</style>