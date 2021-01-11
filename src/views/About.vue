<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ num | commaOn }}<br>
    {{ num2 | commaOff }}
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      num: 12345,
      num2: '1,234,567'
    }
  }
}
</script>
