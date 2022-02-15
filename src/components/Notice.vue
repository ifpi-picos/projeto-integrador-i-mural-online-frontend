<template>
  <div class="rounded">
    <fa-icon icon="thumbtack" id="pin"></fa-icon>
    <div class="card py-2 px-2" :style="{'background-color': notice.backgroundColor}">
      <div :style="{'color': notice.textColor}">
        <p class="card-title">{{notice.title}} ({{notice.category}})</p>
        <p class="card-text text-justify">{{notice.description}}</p>
      </div>
      <div class="options" v-if="!disabled">
        <template v-if="editable">
          <button class="green-back" data-toggle="tooltip" title="Atualizar Postagem" @click="updateN" v-b-modal.updateNoticeModal>
            <b-icon-pencil variant="light"></b-icon-pencil>
          </button>
          <button class="btn-danger" data-toggle="tooltip" title="Deletar Postagem" @click="deleteN">
            <b-icon-trash variant="light"></b-icon-trash>
          </button>
        </template>
        <template v-else>
          <button :disabled="disabledSaveButton" class="green-back" data-toggle="tooltip" title="Favoritar Postagem" @click="saveOrUnsaveN" v-if="authenticated">
            <b-icon-check v-if="hasSaved" variant="light"></b-icon-check>
            <b-icon-bookmark v-else variant="light"></b-icon-bookmark>
          </button>
          <button class="green-back" 
            @click="$bvModal.show(`commentsModal-${notice.id}`)"
          >
            <b-icon-chat variant="light"></b-icon-chat>
          </button>
          <b-modal 
            :id="`commentsModal-${notice.id}`" 
            :ref="`commentsModal-${notice.id}`" 
            title="comentarios" 
            hide-footer
          >
            <div 
              class="border-bottom" 
              v-for="(comment, index) in notice.comments"
              :key="index"
            >
              <p>
                <b-icon-person-circle/>
                {{comment.owner.email}}
                <b-icon-trash 
                  variant="danger"
                  @click="removeComment(comment.id, index)"
                  v-if="authenticated && comment.userId == userAuthenticated.id"
                ></b-icon-trash>
              </p>
              <p>
                {{comment.message}}
              </p>
            </div>
            <b-form v-if="authenticated" @submit.prevent="addComment">
              <b-form-input 
                size="sm" 
                class="mr-sm-2 mt-2 ml-2" 
                placeholder="adicione um comentário"
                v-model="commentToAdd"
              ></b-form-input>
            </b-form>
          </b-modal>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from '@/services/axios.js'
export default {
  data: ()=>({
    commentToAdd: ''
  }),
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasSaved: {
      type: Boolean,
      default: false
    },
    disabledSaveButton: {
      type: Boolean,
      default: false
    },
    notice: {
      type: Object,
      default: ()=>({
        title: "Sem Noticias", 
        description: "Você ainda não postou nada",
        textColor: '#000',
        backgroundColor: '#fff',
      })
    }
  },
  computed: {
    ...mapGetters('auth', ['authenticated', 'userAuthenticated']),
  },
  methods: {
    deleteN() {
      this.$emit('delete')
		},
    updateN() {
      this.$emit('update')
		},
    saveOrUnsaveN() {
      if(this.hasSaved){
        this.$emit('unsave')
      } else {
        this.$emit('save')
      }
		},
    async addComment(){
      if(this.commentToAdd){
        try {
          const { data: commentAdded } = await axios.post(`comments`, {
            message: this.commentToAdd,
            noticeId: this.notice.id
          })
          this.notice.comments.push({
            ...commentAdded,
            owner: {
              email: this.userAuthenticated.email
            } 
          })
        } catch(error){
          console.log({...error})
          const message = error.response.data.error
          this.$swal({
            title: 'Oops ...',
            text: message,
            icon: 'error',
            timer: '1900'
          })
        }
      }
    },
    async removeComment(id, index){
      try {
        await axios.delete(`comments/${id}`)
        this.notice.comments.splice(index, 1)
      } catch(error){
        console.log({...error})
        const message = error.response.data.error
        this.$swal({
          title: 'Oops ...',
          text: message,
          icon: 'error',
          timer: '1900'
        })
      }
    }
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
  box-shadow: 2px 2px 5px rgba(11, 11, 19, 0.4);
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
  border-radius: 50%;
}
.green-back {
  background-color: #004910
}
.card:hover .options button {
  animation: showbuttons 270ms ease-in-out;
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