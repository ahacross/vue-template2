<template>
  <div class="home">
    <h1>Home</h1>
    <el-form ref="form" v-model="ruleForm" label-width="200px">
      <el-form-item label="validator 없는 input" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="validator 있는 input" prop="name2">
        <el-input
          v-model="ruleForm.name2"
          v-only-input-regexp="rules.name2Input"
          name="하하하"
          rules="name2"
        />
      </el-form-item>
      <el-button @click="valid">테스트</el-button>
    </el-form>
</div>
</template>

<script>
import { i18nTranslator } from '@/mixins/i18n'
import { required, lengMin, validate } from '@/lib/ValidateRule'
import { engSLNum } from '@/lib/RegExpTypes'

export default {
  name: 'home',
  data() {
    return {
      ruleForm: {
        name: '',
        name2: ''
      },
      rules: {
        name2: [ required(), lengMin(3) ],
        name2Input: engSLNum
      }
    }
  },
  methods: {
    valid() {
      const result = validate(this, this.$refs.form)
      console.log(`validate Result: ${result}`)
    }
  },
  mixins: [i18nTranslator('')]
}
</script>
