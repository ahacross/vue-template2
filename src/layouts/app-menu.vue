<template>
  <div class="AppMenu">
    <h1 class="AppMenu__title"> {{ lang('title') }} </h1>
    <el-menu @select="kakao">
      <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span slot="title">{{ lang('dashboard') }}</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('serviceDevelopment') }}</span>
        </template>
        <el-menu-item index="2-1">{{ lang('smartContractDevelopment') }}</el-menu-item>
        <el-menu-item index="2-2">{{ lang('smartContractVerification') }}</el-menu-item>
        <el-menu-item index="2-3">{{ lang('smartContractVerificationResult') }}</el-menu-item>
        <el-menu-item index="2-4">{{ lang('developmentGuide') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('blockchainOperation') }}</span>
        </template>
        <el-menu-item index="3-1">{{ lang('operatingService') }}</el-menu-item>
        <el-menu-item index="3-2">{{ lang('changeServiceInformation') }}</el-menu-item>
        <el-menu-item index="3-3">{{ lang('developerManagement') }}</el-menu-item>
        <el-menu-item index="3-4">{{ lang('blockInformationSearch') }}</el-menu-item>
        <el-menu-item index="3-5">{{ lang('transactionInformationSearch') }}</el-menu-item>
        <el-menu-item index="3-6">{{ lang('platformUsageHistory') }}</el-menu-item>
        <el-menu-item index="3-7">{{ lang('PlatformUsageDetails') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('operationalStatistics') }}</span>
        </template>
        <el-menu-item index="4-1">{{ lang('callStatistics') }}</el-menu-item>
        <el-menu-item index="4-2">{{ lang('blockCreationTrend') }}</el-menu-item>
        <el-menu-item index="4-3">{{ lang('sCTransactionShare') }}</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ lang('monitoring') }}</span>
        </template>
        <el-menu-item index="5-1">{{ lang('nodeMonitoring') }}</el-menu-item>
      </el-submenu>
      <el-menu-item index="6">
        <i class="el-icon-switch-button"></i>
        <span>{{ lang('logout') }}</span>
      </el-menu-item>
      <el-menu-item index="7">
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AppMenu',
  data () {
    return {
      curLang: ''
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
  methods: {
    ...mapActions(['changeLanguage']),
    kakao() {
      console.log(arguments)
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
