<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Coming Activities</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="activity in activities"
        :key="activity.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ activity.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ activity.description }}</q-item-label>
          <q-item-label caption lines="1">{{ activity.start }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>

      <q-item v-if="!activities || activities.length == 0">
        No coming activities
      </q-item>
    </q-list>
  </div>

  <!-- <q-dialog v-model="showInfo">
    <info-activity @update-customer="updateCalendar" :event="event" />
  </q-dialog> -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { getComingActivities } from '../../services/activities';
import InfoActivity from 'src/components/activities/InfoActivity.vue';

import { formatDate } from '../../utils/date';

export default {
  components: {},
  setup() {
    const activities = ref(null);
    const showInfo = ref(null);
    const event = ref(null);
    onMounted(() => {
      // get initial data from server (1st page)
      //tableRef.value.requestServerInteraction()
      getActivitiesList();
    });

    function getActivitiesList() {
      getComingActivities().then((response) => {
        console.log(response.data);
        activities.value = response.data;
      });
    }
    return {
      activities,
    };
  },
};
</script>
