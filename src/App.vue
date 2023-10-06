<template>
  <Navbar @search="searchValue = $event" />

  <Notes :notes="filterNotes" @delNote="delNote" @change="change" />

  <Modal
    v-show="isModalOpen"
    @close="isModalOpen = false"
    @addNote="addNote"
    :edit="edit"
    :editedNote="editedNote"
    @changedNote="changedNote"
  />

  <button
    class="addNote"
    @click=";(isModalOpen = true), (edit = false)"
    v-show="!isModalOpen"
  >
    <img src="@/assets/img/pens.svg" alt="" />
  </button>
</template>

<script>
import Modal from './components/Modal.vue'
import Navbar from './components/Navbar.vue'
import Notes from './components/Notes.vue'

export default {
  components: {
    Navbar,
    Notes,
    Modal,
  },
  data() {
    return {
      notes: [],
      isModalOpen: false,
      edit: false,
      editedNote: null,
      searchValue: '',
    }
  },
  methods: {
    addNote(note) {
      this.notes.push(note)
    },
    delNote(id) {
      // let index = this.notes.findIndex((note) => note.id == id)
      // this.notes.splice(index, 1)

      this.notes.splice(id, 1)
    },
    change(id) {
      this.isModalOpen = this.edit = true

      let currentNote = this.notes.find((note) => note.id == id)

      this.editedNote = currentNote
    },
    changedNote(newNote) {
      this.notes.forEach((note) => {
        if (note.id == newNote.id) {
          note.title = newNote.title
          note.text = newNote.text
          note.date = newNote.date
        }
      })
    },
    getNotes() {
      let localNotes = localStorage.notes
      if (localNotes) {
        this.notes = JSON.parse(localNotes)
      }
    },
  },
  computed: {
    filterNotes() {
      return this.searchValue
        ? this.notes.filter((note) =>
            note.title.toLowerCase().includes(this.searchValue.toLowerCase())
          )
        : this.notes
    },
  },
  watch: {
    notes: {
      handler() {
        localStorage.notes = JSON.stringify(this.notes)
      },
      deep: true,
    },
  },
  created() {
    this.getNotes()
  },
}
</script>
