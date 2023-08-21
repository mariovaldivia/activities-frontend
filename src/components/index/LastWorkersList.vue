<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Last workers</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="worker in workers"
        :key="worker.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="worker.image ?? default_user" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            >{{ worker.first_name }} {{ worker.last_name }}</q-item-label
          >
          <!-- <q-item-label caption lines="1">{{ activity.start }}</q-item-label> -->
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
      <q-item v-if="!workers || workers.length == 0">
        No workers registered
      </q-item>
    </q-list>
  </div>

  <!-- <q-dialog v-model="showInfo">
    <info-activity @update-customer="updateCalendar" :event="event" />
  </q-dialog> -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { getLastUsers } from '../../services/users';
// import InfoActivity from 'src/components/activities/InfoActivity.vue';
import default_user from '../../assets/user.png';

import { formatDate } from '../../utils/date';

export default {
  components: {},
  setup() {
    const workers = ref(null);
    const showInfo = ref(null);
    onMounted(() => {
      // get initial data from server (1st page)
      //tableRef.value.requestServerInteraction()
      getWorkersList();
    });

    function getWorkersList() {
      getLastUsers().then((response) => {
        // console.log(response.data);
        workers.value = response.data;
      });
    }
    return {
      workers: workers,
      default_user,
    };
  },
};
</script>
