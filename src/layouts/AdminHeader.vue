<template>
  <nav class="AppHeader">
    <div class="AppHeader__services">
      <el-select
        v-model="selectedService"
        :value="selectedService"
        @change="changeLabel"
      >
        <el-option
          v-for="item in options" :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <p class="description">{{ description }}</p>
      <p class="stateMsg">{{ state.msg }}</p>
    </div>
    <div class="AppHeader__menuPath">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="menu in getMenuPath" :key="menu">{{ menu }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="tempLabelLengthDiv" style="display: none;"></div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'AppHeader',
  data () {
    return {
      selectedService: 1,
      options: [
        {
          label: 'BCN성능테스트TE0122222',
          value: 1
        },
        {
          label: 'BCN성능테스트TE01333333333333',
          value: 2
        },
        {
          label: 'BCN성능테스트TE0144444444444444444',
          value: 3
        }
      ],
      description: '기간에 따른 Block 생성 수를 조회할 수 있습니다.',
      state: {
        class: 'red',
        msg: 'BCN 다운 : [vm925] BCN 컨테이너 재기동 요함'
      }
    }
  },
  computed: {
    ...mapGetters('common', ['getMenuPath'])
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.changeLabel(this.selectedService)
      }, 1000)
    })
  },
  methods: {
    changeLabel(val) {
      const tempLengthDiv = $('.AppHeader #tempLabelLengthDiv')
      tempLengthDiv.text(this.options.filter(item => item.value === val).first().label)
      $('.AppHeader .el-select').css({ width: `${Math.ceil(tempLengthDiv.width()) + 45}px` })
    }
  }
}
</script>

<style lang="scss">
  .AppHeader {
    font-family: 'Noto Sans KR', serif;
    font-weight: 300;
    font-size: 16px;
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid #c0c0c0;
    display: flex;

    &__services {
      flex: 1;

      & p {
        padding: 0 20px;
      }

      & .description {
        margin-top: 0;
        font-size: 14px;
      }

      & .el-select {
        & .el-input__inner {
          border: none;
          font: 700 34px Noto Sans KR!important;
          color: #000;
        }
      }
    }

    &__menuPath {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #454646;
    }

    & #tempLabelLengthDiv {
      font: 700 34px Noto Sans KR!important;
    }
  }
</style>
