<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="{ 'ios-browser-swiping-back' : store.state.iosBrowserSwipingBack }"
  >
    <q-footer 
      v-if="
        route.name !== 'Post' 
        && route.name !== 'Image' 
      "
      bordered class="bg-white text-primary"
    >
      <q-tabs
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        no-caps
      >
        <q-route-tab
          v-for="navItem in store.state.navItems"
          :key="navItem.root"
          :to="navItem.to"
          :label="navItem.label"
          :icon="navItem.icon"
        />

      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import store from 'src/myStore'
import { useRoute } from 'vue-router'

export default {
  name: 'MainLayout',

  setup () {
    let route = useRoute()
    return {
      store,
      route
    }
  }
}
</script>
