<template>
  <div class="wrap"  :class="$route.name">
    <header class="heade_wrap">
     <Header />
    </header>
    <div class="container fullLayout">
     <router-view />
    </div>
    <div :class="$route.meta.footer">
      <Footer />
      <a href="#" @click.prevent="gotoPageTop" class="btn_top" >맨위로</a>
    </div>
  </div>
</template>

<script>
export default {
  id: 'Full',
  components: {
    Header: () => import('../Header.vue'),
    Footer: () => import('../Footer.vue')
  },
  data () {
    return {
    }
  },
  methods: {
    gotoPageTop(e) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }
}
</script>
