<template>
  <div class="header">
    <span class="mbtns">
      <a href="#" class="lnk btn_prev" @click.prevent="back">이전으로</a>
      <a href="#" class="lnk btn_close" @click.prevent="pcMainLink">닫기</a>
      <a href="#" class="lnk btn_menu" :class="{on: gnbHover}" @click.prevent="onClickGnbHover('menu')"><span>전체 메뉴</span></a>
    </span>
    <!-- -->
    <h1>
      <a href="#" @click.prevent="pcMainLink" class="mo_none">
        <strong :class="{title:true, show:!!headerTitle}">{{ $route.meta.title }}</strong>
        <span :class="{lnk:true, logo:true, show:!headerTitle}">
          <img src="/assets/images/common/logo_b.png" class=" black" alt="">
          <img src="/assets/images/common/logo_w.png" class=" white" alt="">
        </span>
      </a>
      <span class="pc_none">
        <strong :class="{title:true, show:!!headerTitle}">{{ $route.meta.title }}</strong>
        <span :class="{lnk:true, logo:true, show:!headerTitle}">
          <img src="/assets/images/common/logo_b.png" class=" black" alt="">
          <img src="/assets/images/common/logo_w.png" class=" white" alt="">
        </span>
      </span>
    </h1>
    <div class="gnb_wrap " :class="{on:!!gnbHover}">
      <div class="bg"></div>
      <nav class="gnb_box">
        <div class="util">
          <a href="#" @click.prevent="onClickUserInfo" class="name">
            <em class="user_img" :class="{noimg: !isUrl(profilePath)}">
              <span v-if="isUrl(profilePath)"  :style="`background-image:url(${profilePath})`"></span><!-- <img  :src="profilePath" @alt="userName"> -->
            </em>
            <strong>{{ userName }}</strong>
          </a>
          <a href="#" @click.prevent="onClickLogout" class="logout">Logout</a>
          <a :href="portal" target="_blank" class="logopotal"><span class="blind">DREAMPLUS</span></a>
        </div>
        <ul>
          <li><a href="#" class="home" @click.prevent="go('main')">Home</a></li>
          <li><a href="#" class="depth_1" @click.prevent="go('centerGuideList')">Guide</a></li>
          <li class="has_child" @mouseleave="offFocusGnb" @mouseenter="onFocusGnb">
            <a href="#" class="depth_1" @click.prevent="onClickGnb" @blur.prevent="offFocusGnb" @focus.prevent="onFocusGnb">News</a>
            <div class="gnb_sub">
              <ul>
                <li><a href="#" class="depth_2" @blur="offFocusGnb" @focus="onFocusGnb" @click.prevent="go('newsNoticeList')">Notice</a></li>
                <li><a href="#" class="depth_2" @blur="offFocusGnb" @focus="onFocusGnb" @click.prevent="go('newsEventList')">Event</a></li>
              </ul>
            </div>
          </li>
          <li><a href="#" class="depth_1" @click.prevent="go('helpList')">Help</a></li>
          <li><a href="#" class="depth_1" @click.prevent="go('benefits')">Benefits</a></li>
          <li><a href="#" class="depth_1" @click.prevent="go('company')">Company</a></li>
          <li class="has_child" @mouseleave="offFocusGnb" @mouseenter="onFocusGnb"><a href="#" class="depth_1" @click.prevent="onClickGnb" @blur.prevent="offFocusGnb" @focus.prevent="onFocusGnb">Reservation</a>
            <div class="gnb_sub">
              <ul>
                <li><a href="#" class="depth_2" @blur="offFocusGnb" @focus="onFocusGnb" @click.prevent="go('meetingroom', { params: { clear: true } })">Meeting Room</a></li>
                <li><a href="#" class="depth_2" @blur="offFocusGnb" @focus="onFocusGnb" @click.prevent="go('mainmulti')">Event Hall</a></li>
                <li><a href="#" class="depth_2" @blur="offFocusGnb" @focus="onFocusGnb" @click.prevent="go('mediaCenter')">Media Center</a></li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 2020.09.29 모바일 앱일경우 셋팅 버튼 노출 -->
        <div class="setting" v-if="isApp">
          <a href="#" @click.prevent="onClickSetting">Setting</a>
        </div>
        <!-- //모바일 앱일경우 셋팅 버튼 노출 -->

        <!-- 2020.09.29 모바일 웹일 경우 로그아웃버튼만 노출 -->
        <div class="logout_mobile" v-else>
<!--          onClickLogout-->
          <a href="#" @click.prevent="onClickLogout">Logout</a>
        </div>
        <!-- //모바일 웹일 경우 로그아웃버튼만 노출 -->
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>
