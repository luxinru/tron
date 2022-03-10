<template>
  <div class="header_bar_root">
    <van-popover
      v-model="showPopover"
      trigger="click"
      placement="bottom-end"
      :actions="actions"
      @select="onChangeLanguage"
    >
      <template #reference>
        <img src="@/assets/tron/组101拷贝1@2x.png" alt="" />
      </template>
    </van-popover>

    <img
      src="@/assets/tron/组101拷贝3@2x.png"
      alt=""
      @click="$router.push('/notice')"
    />
    <img src="@/assets/tron/组101拷贝2@2x.png" alt="" @click="$router.push('/kefu')" />
  </div>
</template>
 
<script>
export default {
  name: 'HeaderBar',

  data() {
    return {
      showPopover: false,
      actions: [
        {
          text: 'English',
          value: 'en',
        },
        {
          text: '한국어',
          value: 'kr',
        },
        {
          text: '日本語',
          value: 'jp',
        },
        {
          text: 'بالعربية',
          value: 'ar',
        },
        {
          text: 'Deutsch',
          value: 'de',
        },
        {
          text: 'Français',
          value: 'fr',
        },
        {
          text: 'português',
          value: 'pt',
        },
        {
          text: 'Türk',
          value: 'tr',
        },
        {
          text: 'Español',
          value: 'es',
        },
        {
          text: 'IndonesiaName',
          value: 'id',
        },
      ],
    }
  },

  methods: {
    onChangeLanguage(action) {
      window.localStorage.setItem('lang', action.value)
      window.location.reload()
    },
  },
}
</script>
 
<style lang='less' scoped>
.header_bar_root {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  img {
    width: 25px;
    margin-right: 16px;
  }
}
</style>