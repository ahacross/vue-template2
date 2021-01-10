<template>
  <div class="wrap"  :class="$route.name">
    <header class="heade_wrap min"  :class="$route.meta.btnType">
     <Header />
    </header>
    <div class="container" >
      <router-view />
    </div>
    <div class="mo_none">
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  id: 'Header',
  components: {
    Header: () => import('../Header.vue'),
    Footer: () => import('../Footer.vue')
  }
}
</script>
