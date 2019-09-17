<template>
  <div class="LayoutDefault">
    <appHeader />
    <main class="LayoutDefault__main">
      <slot />
    </main>
    <footer class="LayoutDefault__footer">
      &copy; Awesome2
    </footer>
  </div>
</template>

<script>
import AppHeader from './app-header'
export default {
  name: 'LayoutDefault2',
  components: { AppHeader }
}
</script>

<style scoped lang="scss">
.LayoutDefault {
  max-width: 42em;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1em;
  padding-left: 1em;

  &__main {
    padding-top: 1.5em;
    padding-bottom: 2em;
  }

  &__footer {
    padding-top: 1em;
    padding-bottom: 1em;
    border-top: 1px solid #c0c0c0;
  }
}
</style>
