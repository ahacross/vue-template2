<template>
  <div>
    <div class="footer_wrap">
      <ul class="sns">
        <li><a :href="url.facebook" target="_blank" @click="$root.openLink"><img src="/assets/images/common/ico_sns_fb.png" alt=""></a></li>
        <li><a :href="url.instagram" target="_blank" @click="$root.openLink"><img src="/assets/images/common/ico_sns_insta.png" alt=""></a></li>
        <li><a :href="url.youtube" target="_blank" @click="$root.openLink"><img src="/assets/images/common/ico_sns_yt.png" alt=""></a></li>
        <li><a :href="url.naver" target="_blank" @click="$root.openLink"><img src="/assets/images/common/ico_sns_naver.png" alt=""></a></li>
      </ul>
      <ul class="terms">
        <li><a href="#" @click.prevent="onClickPrivacy">개인정보취급방침</a></li>
        <li><a href="#" @click.prevent="onClickTerms">이용약관</a></li>
        <li><a :href="`mailto:${helpmail}`">문의하기</a></li>
      </ul>
      <div class="copy">Copyright © 2020 DREAMPLUS All rights reserved.</div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      url: {
        facebook: 'https://www.facebook.com/dreamplusasia',
        instagram: 'https://www.instagram.com/dreamplusasia/',
        youtube: 'https://www.youtube.com/channel/UCfsuEZ6UAlLV5yvpAMM1mBA/featured',
        naver: 'https://post.naver.com/my.nhn?memberNo=38894602'
      },
      helpmail: 'help@dreamplus.asia',
      privacyParams: {
        open: false
      },
      termsParams: {
        open: false
      }
    }
  },
  methods: {
    onClickPrivacy() {
      if (!this.privacyParams.open) {
        this.privacyParams.open = true
      }
    },
    onClickTerms() {
      if (!this.termsParams.open) {
        this.termsParams.open = true
      }
    }
  }
}
</script>
