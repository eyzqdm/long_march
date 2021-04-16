<template>
  <div>
    <lm-head></lm-head>
    <lm-main>
      <router-view></router-view>
    </lm-main>
    <lm-foot></lm-foot>
  </div>
</template>

<script setup>
import LmHead from "./components/Head.vue";
import LmMain from "./components/Main.vue";
import LmFoot from "./components/Foot.vue";
</script>

<style lang="less" scoped></style>
