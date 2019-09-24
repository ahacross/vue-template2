<template>
  <div class="AppMenu">
    <h1 class="AppMenu__title"> {{ lang('title') }} </h1>
    <el-menu
      @select="saveMenuPath"
      :default-active="defaultActive"
      :unique-opened="true"
      :router="true"
      ref="appElMenu">
      <el-menu-item index="dashboard" route="/">
        <i class="el-icon-document"></i>
        <span slot="title">{{ lang('dashboard') }}</span>
      </el-menu-item>
      <el-submenu index="serviceDevelopment">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('serviceDevelopment') }}</span>
        </template>
        <el-menu-item index="smartContractDevelopment">{{ lang('smartContractDevelopment') }}</el-menu-item>
        <el-menu-item index="smartContractVerification">{{ lang('smartContractVerification') }}</el-menu-item>
        <el-menu-item index="smartContractVerificationResult">{{ lang('smartContractVerificationResult') }}</el-menu-item>
        <el-menu-item index="developmentGuide">{{ lang('developmentGuide') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="blockchainOperation">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('blockchainOperation') }}</span>
        </template>
        <el-menu-item index="operatingService">{{ lang('operatingService') }}</el-menu-item>
        <el-menu-item index="changeServiceInformation">{{ lang('changeServiceInformation') }}</el-menu-item>
        <el-menu-item index="developerManagement">{{ lang('developerManagement') }}</el-menu-item>
        <el-menu-item index="blockInformationSearch">{{ lang('blockInformationSearch') }}</el-menu-item>
        <el-menu-item index="transactionInformationSearch">{{ lang('transactionInformationSearch') }}</el-menu-item>
        <el-menu-item index="platformUsageHistory">{{ lang('platformUsageHistory') }}</el-menu-item>
        <el-menu-item index="PlatformUsageDetails">{{ lang('PlatformUsageDetails') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="operationalStatistics">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('operationalStatistics') }}</span>
        </template>
        <el-menu-item index="4-1">{{ lang('callStatistics') }}</el-menu-item>
        <el-menu-item index="4-2">{{ lang('blockCreationTrend') }}</el-menu-item>
        <el-menu-item index="4-3">{{ lang('sCTransactionShare') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="monitoring">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('monitoring') }}</span>
        </template>
        <el-menu-item index="nodeMonitoring">{{ lang('nodeMonitoring') }}</el-menu-item>
      </el-submenu>
      <el-menu-item index="logout">
        <i class="el-icon-switch-button"></i>
        <span>{{ lang('logout') }}</span>
      </el-menu-item>
      <el-menu-item index="language">
        <el-row>
          <el-col :span="10">
            {{ lang('language')}}
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
      defaultActive: '/'
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
      const menuPath = []

      for (const index of keyIdxPath.reverse()) {
        if (node.index !== index) {
          node = node.parentMenu
        }
        menuPath.push(this.getMenuText(node))
      }
      menuPath.push(this.lang('title'))
      this.menuPath(menuPath.reverse())
    },
    getMenuText(node) {
      let menuText = node.$slots.default.first().text
      if (!menuText) {
        menuText = node.$slots.title.filter(vn => vn.tag === 'span').first().children.first().text
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
