<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <a href="/"> Actividades </a>
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- <q-item-label header> Essential Links </q-item-label> -->

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Activities',
    caption: '',
    icon: 'calendar_month',
    link: '/#/activities',
  },
  {
    title: 'Customers',
    caption: '',
    icon: 'work',
    link: '/#/empresas',
  },
  {
    title: 'Contracts',
    caption: '',
    icon: 'handshake',
    link: '/#/contracts',
  },
  {
    title: 'Vehicles',
    caption: '',
    icon: 'directions_car',
    link: '/#/vehicles',
  },

  {
    title: 'Users',
    caption: '',
    icon: 'group',
    link: '/#/users',
  },
  {
    title: 'Login',
    caption: '',
    icon: 'login',
    link: '/#/login',
  },
];

import { useRouter } from 'vue-router';
import { globalRouter } from '../router/globalRouter';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter();
    globalRouter.router = router;
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
