<template>
  <div class="notes container">
    <div class="notes__top">
      <h2 class="notes__top_title">{{ $t('allNotes') }}</h2>

      <button class="notes__top_btn" @click="view = !view">
        <img v-show="view" src="@/assets/img/list.svg" alt="" />
        <img v-show="!view" src="@/assets/img/layout.svg" alt="" />

        <span>{{ view ? 'Список' : 'Сетка' }}</span>
      </button>
    </div>

    <div class="notes__list" :class="{ active: !view }">
      <NotesItem :notes="notes" :view="view" @delNote="$emit('delNote', $event)" @change="$emit('change', $event)" />
    </div>
  </div>
</template>

<script>
import NotesItem from './NotesItem.vue'

export default {
  components: { NotesItem },
  data() {
    return {
      view: true,
    }
  },
  props: {
    notes: {
      typeof: Array,
    },
  },
}
</script>
