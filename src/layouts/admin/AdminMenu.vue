<template>
  <div class="AppMenu">
    <h1 class="AppMenu__title"> {{ $l('title') }} </h1>
    <el-menu
      @select="saveMenuPath"
      :unique-opened="true"
      :router="true"
      ref="appElMenu">
      <el-menu-item index="default" route="/">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $l('default') }}</span>
      </el-menu-item>
      <el-submenu index="grid0">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $l('grid') }}</span>
        </template>
        <el-menu-item index="grid">{{ $l('grid') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="chart0">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $l('chart') }}</span>
        </template>
        <el-menu-item index="chart">{{ $l('chart') }}</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="false" index="logout">
        <i class="el-icon-switch-button"></i>
        <span>{{ $l('logout') }}</span>
      </el-menu-item>
      <el-menu-item index="language">
        <el-row>
          <el-col :span="10">
            {{ $l('language')}}
          </el-col>
          <el-col :span="14">
            <el-select
              @change="changeLanguage"
              size="small"
              v-model="curLang"
              :value="currentLanguage">
              <el-option
                v-for="item in languages"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { i18nTranslator } from '@/mixins/i18n'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AppMenu',
  data () {
    return {
      curLang: '',
      defaultActive: '/',
      activeIndex: null,
      prefix: '/admin/'
    }
  },
  computed: {
    ...mapGetters({
      languages: 'getLanguages',
      currentLanguage: 'currentLanguage'
    })
  },
  created() {
    this.curLang = this.currentLanguage.key
  },
  mounted() {
    const routePath = this.$route.path

    for (const [key, vm] of Object.entries(this.$refs.appElMenu.items)) {
      if (vm.route === routePath) {
        this.defaultActive = key
      }
    }
  },
  methods: {
    ...mapActions(['changeLanguage']),
    ...mapMutations('common', ['menuPath']),
    saveMenuPath(keyIdx, keyIdxPath, node) {
      if (keyIdx === 'logout') {
        return false
      } else if (this.activeIndex !== keyIdx) {
        const menuPath = []

        for (const index of keyIdxPath.reverse()) {
          if (node.index !== index) {
            node = node.parentMenu
          }
          menuPath.push(this.getMenuText(node))
        }
        menuPath.push(this.$l('title'))
        this.menuPath(menuPath.reverse())
        this.activeIndex = keyIdx
      }
    },
    getMenuText(node) {
      let menuText

      if (node.items) {
        menuText = node.$el.querySelector('[slot=title]').textContent
      } else {
        menuText = node.$el.textContent
      }

      return menuText
    }
  },
  mixins: [i18nTranslator('menus')]
}
</script>

<style scoped lang="scss">
.AppMenu {
  &__title {
    padding: 0 20px;
  }
}
</style>
