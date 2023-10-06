<template>
  <Transition name="modal">
    <div class="modal" @click="closeModal">
      <div class="modal__block" @click.stop>
        <h3 class="modal__block_title">
          {{ edit ? 'Изменить заметку' : 'Добавить заметку' }}
        </h3>

        <div class="modal__block_inputs">
          <label>
            <span>Title</span>
            <input type="text" placeholder="Title" v-model="title" />
          </label>

          <label>
            <span>Content</span>
            <textarea placeholder="Content" v-model="text"></textarea>
          </label>
        </div>

        <div class="modal__block_btns">
          <button class="modal__block_btns-btn del" @click="closeModal">
            Отмена
          </button>

          <button
            v-if="!edit"
            class="modal__block_btns-btn edit"
            @click="addNote"
          >
            Добавить
          </button>

          <button v-else class="modal__block_btns-btn edit" @click="changeNote">
            Изменить
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  methods: {
    closeModal() {
      this.$emit('close')
      this.title = this.text = ''
    },
    addNote() {
      if (this.text != '' || this.title != '') {
        const newNote = {
          id: uuidv4(),
          title: this.title,
          text: this.text,
          /* 26.09.23 */
          date: new Date().toLocaleDateString(),
        }
        this.$emit('addNote', newNote)
        this.closeModal()
      }
    },
    changeNote() {
      if (this.title.length >= 3 && this.text.length >= 3) {
        const newIditedNote = {
          id: this.editedNote.id,
          title: this.title,
          text: this.text,
          date: new Date().toLocaleDateString(),
        }
        this.$emit('changedNote', newIditedNote), this.closeModal()
      }
    },
  },
  data() {
    return {
      title: '',
      text: '',
    }
  },
  props: {
    edit: Boolean,
    editedNote: Object,
  },
}
</script>
