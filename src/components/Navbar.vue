<template>
  <nav class="nav" v-if="nav">
    <button class="nav__lang" @click="switchlang">{{ $i18n.locale }}</button>

    <h1 class="nav__title">{{ $t('notes') }}</h1>
    <button class="nav__search_icon" @click="nav = !nav">
      <img src="@/assets/img/search.svg" alt="" />
    </button>
  </nav>

  <nav class="nav" v-else>
    <button class="nav__back" @click="nav = !nav">
      <img src="@/assets/img/back.svg" alt="" />
    </button>
    <input
      type="text"
      class="nav__input"
      :placeholder="$t('searchInput')"
      v-model="search"
    />
    <button class="nav__clear">
      <img src="@/assets/img/close.svg" alt="" />
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      nav: true,
      search: '',
    }
  },
  watch: {
    search(newVal) {
      this.$emit('search', newVal)
    },
  },
  methods: {
    switchlang() {
      this.$i18n.locale == 'ru'
        ? (this.$i18n.locale = 'eng')
        : (this.$i18n.locale = 'ru')

      localStorage.lang = this.$i18n.locale
    },
  },
}
</script>
