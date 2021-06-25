<template>
  <page>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back
          label="Posts"
        />
      </template>
      <template #title>Post</template>
    </page-header>
    <page-body>
      <transition
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <div
          v-if="image"
        >
          <q-card 
            flat 
          >
            <q-img
              :src="image.photo"
              class="no-pointer-events"
              no-transition
              no-spinner
            />
            <q-card-actions align="right">
              <q-btn flat round color="blue" icon="thumb_up_alt" />
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
            
          </q-card>
          <div class="q-pa-lg">
            <div class="text-h5 q-mb-md">{{ image.desc }}</div>
            <div style="width: 100%">
              <div v-for="comment in comments.slice().reverse()" :key="comment.id">
                <!-- <q-chat-message
                  name="me"
                  :text="['헤이~ 코멘트좀 입력해줘']"
                  sent
                /> -->
                <q-chat-message
                  :name="comment.userName"
                  :text="[comment.comment]"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </page-body>
    <q-footer>
      <q-toolbar class="bg-grey-1 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="comment" placeholder="댓글을 입력해 보세요" />
        <q-btn round flat icon="done" @click="onComment( '3', '세롱', comment )"/>
      </q-toolbar>
    </q-footer>
  </page>
</template>

<script>
import { onActivated, onDeactivated, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from 'src/myStore'

export default {
  name: 'Post',
  setup() {
    let image = ref()
    let comments = ref()
    let comment = ref('')
    let route = useRoute()

    
    onActivated(() => {      
      image.value = store.getters.getPostImage(route.params.id)
      comments.value = store.getters.getPostComment(route.params.id)
    })

    onDeactivated(() => {
      image.value = null
      comments.value = null
    })

    function onComment( userId, userName, addComment) {
      if (addComment) {
        store.actions.setPostComment(route.params.id , userId, userName, addComment)
        comments.value = store.getters.getPostComment(route.params.id)
        comment.value = null
      }
    }


    return {
      comment,
      store,
      image,
      comments,
      onComment
    }
  }
}
</script>
