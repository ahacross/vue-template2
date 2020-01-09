<template>
  <div class="home">
    <h1>Home</h1>
    <el-form ref="form" v-model="ruleForm" label-width="200px">
      <el-form-item label="validator 없는 input" prop="label">
        <el-input v-model="ruleForm.label" />
      </el-form-item>
      <el-form-item label="validator 있는 input" prop="name">
        <el-input
          v-model="ruleForm.name"
          v-only-input-regexp="rules.nameInput"
          labelName="하하하"
          ruleName="name"
        />
      </el-form-item>
      <el-form-item label="validator 있는 select" prop="selectCd">
        <el-select
          v-model="ruleForm.selectCd"
          labelName="우히히"
          ruleName="selectCd"
          placeholder="Select">
          <el-option
            v-for="item in selOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="validator 있는 datepicker" prop="date">
        <el-date-picker
          v-model="ruleForm.date1"
          labelName="날짜"
          ruleName="date"
          v-bind="datePickerOption"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="validator 있는 radio" prop="radio">
        <el-radio-group
          v-model="ruleForm.radio"
          labelName="라디오"
          ruleName="radio"
        >
          <el-radio :label="3">Option A</el-radio>
          <el-radio :label="6">Option B</el-radio>
          <el-radio :label="9">Option C</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button @click="valid">테스트</el-button>
    </el-form>
</div>
</template>

<script>
import { i18nTranslator } from '@/mixins/i18n'
import { validate, required, lengMinMax } from '@/lib/validator/ValidateRule'
import { engSLNum } from '@/lib/validator/RegExpTypes'
import { datePickerOption } from '@/lib/datepicker'

export default {
  name: 'home',
  data() {
    return {
      ruleForm: {
        label: '',
        name: '',
        selectCd: '',
        date1: '',
        radio: ''
      },
      rules: {
        name: [ required(), lengMinMax(3, 10) ],
        nameInput: engSLNum,
        selectCd: [ required() ],
        date: [ required() ],
        radio: [ required() ]
      },
      selOptions: [{
        value: 'op1',
        label: 'Option1'
      }, {
        value: 'op2',
        label: 'Option2'
      }, {
        value: 'op3',
        label: 'Option3'
      }, {
        value: 'op4',
        label: 'Option4'
      }, {
        value: 'op5',
        label: 'Option5'
      }]
    }
  },
  computed: {
    datePickerOption() {
      return datePickerOption
    }
  },
  methods: {
    valid() {
      if (validate(this, this.$refs.form)) {
      }
    }
  },
  mixins: [i18nTranslator('')]
}
</script>
