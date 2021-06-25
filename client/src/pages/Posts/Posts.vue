<template>
    <page>
        <page-header>
            <template #title>Posts</template>
        </page-header>
        
        <page-body>
            <div class="q-pa-md q-gutter-xs">
                <q-card class="my-card">
                    <q-card-section>
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>What's your mind AAA ?</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-input v-model="text" :dense="dense" placeholder="지금의 기분을 입력해 보세요" />
                    </q-card-section>

                    <q-separator />

                    <q-card-actions align="center">
                        <q-uploader
                            url="http://localhost:4444/upload"
                            style="max-width: 300px"
                        />
                        <q-btn flat align="left" class="btn-fixed-width" color="teal" label="Photo" icon="collections" />
                        <q-btn flat align="left" class="btn-fixed-width" color="indigo" label="Tag" icon="label" />
                        <q-btn flat align="left" class="btn-fixed-width" color="deep-orange" label="Location" icon="location_on" />
                        <q-btn flat align="left" class="btn-fixed-width" color="brown-5" label="Feelings" icon="emoji_emotions" />
                        <q-btn push color="primary" label="Share" @click="onPost(text)" />
                    </q-card-actions>
                </q-card>

                <q-card class="my-card" v-for="post in store.state.posts.slice().reverse()" :key="post.id">
                    <q-card-section>
                        <q-list>
                            <q-item>
                                <q-item-section avatar>
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section> 
                                    akkkkkkkkkkk 
                                </q-item-section>
                                <q-item-section side>
                                    <q-item-label caption>{{ post.date }}</q-item-label>
                                </q-item-section>
                                <q-item-section top side>
                                    <div class="text-grey-8 q-gutter-xs">
                                        <q-btn size="12px" flat dense round icon="more_vert" />
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-item v-if="post.desc">
                                <q-item-section> {{ post.desc }} </q-item-section>
                            </q-item>
                        </q-list>
                        <router-link
                            :to="`/posts/${ post.id }`"
                        >
                            <img 
                                :src="post.photo" 
                                style="width: 100%; max-height: 500px"
                                :ratio="1"
                            />
                        </router-link>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-item>
                            <q-item-section>
                                <q-btn round flat>
                                <q-avatar size="24px">
                                    <img src="like.png">
                                </q-avatar>
                                </q-btn>
                            </q-item-section>
                            <q-item-section>
                                <q-btn round flat >
                                <q-avatar size="24px">
                                    <img src="heart.png">
                                </q-avatar>
                                </q-btn>
                            </q-item-section>
                            <q-item-section side>
                                {{ countLike(post.id) }} people like
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label caption> {{ countComment(post.id) }} comments</q-item-label>
                            </q-item-section>
                        </q-item>

                    </q-card-actions>
                </q-card>
            </div>
        </page-body>
    </page>
</template>

<script>
import { ref, mounted } from 'vue'
import store from 'src/myStore'

export default {
    name: 'Posts',
    setup () {
        let text = ref('')

        function countLike( postId ) {
            return store.getters.getPostLike( postId ).length
        }
        function countComment( postId ) {
            return store.getters.getPostComment( postId ).length
        }
        function countHeart( postId ) {
            return store.getters.getPostHeart( postId ).length
        }

        function onPost( desc ) {
            store.actions.setPostAdd( desc )
            text.value = null
        }


        return {
            text,
            ph: ref(''),
            dense: ref(false),
            store,
            countLike,
            countComment,
            countHeart,
            onPost,
        }
    }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%

</style>