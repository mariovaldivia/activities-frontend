<template>
  <div>
    <q-page class="">
      <user-list></user-list>
    </q-page>
  </div>
</template>

<script lang="ts">
// import { Todo, Meta } from 'components/models';
import UserList from 'src/components/users/UserList.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UsersPage',
  components: { UserList },
  setup() {
    return {};
  },
});
</script>
