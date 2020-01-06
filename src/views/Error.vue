<template>
  <div class="error" :style="{ height: height+'px'}">
    <div>{{ $l('msg.err404') }}</div>
    <div>{{ $l('msg.err404Path', { path }) }}</div>
  </div>
</template>

<script>
import { i18nTranslator } from '@/mixins/i18n'
export default {
  name: 'Error',
  data() {
    return {
      height: window.innerHeight,
      path: this.$route.fullPath
    }
  },
  mixins: [ i18nTranslator('') ]
}
</script>

<style lang="scss" scoped>
.error {
  background-color: #0c232a;
  font-size: 50px;
  font-weight: 700;
  color: #5482BD;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
