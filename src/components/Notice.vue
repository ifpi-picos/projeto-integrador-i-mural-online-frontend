<template>
  <div>
    <fa-icon icon="thumbtack" id="pin"></fa-icon>
    <div class="card py-2">
      <div>
        <p class="card-title">{{title}}</p>
        <p class="card-text">{{description}}</p>
      </div>
      <div class="options" v-if="!disabled">
        <template v-if="editable">
          <button @click="updateN" v-b-modal.updateNoticeModal>
            <b-icon-pencil></b-icon-pencil>
          </button>
          <button @click="deleteN">
            <b-icon-trash></b-icon-trash>
          </button>
        </template>
        <button v-else>
          <b-icon-bookmark></b-icon-bookmark>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteN() {
      this.$emit('delete')
		},
    updateN() {
      this.$emit('update')
		},
  }
}
</script>
<style scoped>
.card {
  min-height: 30vh;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 
    0 0 5px rgba(11, 11, 19, 0.4),
    0 0 6px rgba(11, 11, 19, 0.3),
    0 0 8px rgba(11, 11, 19, 0.2);
  animation: shake 900ms ease-out;
  transform-origin: top;
}
@keyframes shake {
  0% {
    transform: rotate(-5deg);
  }
  40% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.card .card-title {
  font-weight: bold;
  font-size: 18px;
}
#pin {
  position: relative;
  left: 50%;
  bottom: -15px;
  z-index: 100;
  font-size: 30px;
  transform: rotate(40deg);
}
.options {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.options button {
  border: none;
  position: relative;
  bottom: -28px;
  background-color: rgba(0,0,0,.1);
  border-radius: 50%;
}
.card:hover .options button {
  animation: showbuttons 500ms ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes showbuttons {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-28px);
  }
}
</style>