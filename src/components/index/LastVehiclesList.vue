<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Last vehicles</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label
            >{{ vehicle.type_name }} {{ vehicle.brand }}
            {{ vehicle.model }}</q-item-label
          >
          <q-item-label caption lines="1"
            >Plate: {{ vehicle.plate }}</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item v-if="!vehicles || vehicles.length == 0">
        No vehicles registered
      </q-item>
    </q-list>
  </div>

  <!-- <q-dialog v-model="showInfo">
    <info-activity @update-customer="updateCalendar" :event="event" />
  </q-dialog> -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { getLastVehicles } from '../../services/vehicles'; // import InfoActivity from 'src/components/activities/InfoActivity.vue';
import default_user from '../../assets/user.png';

export default {
  components: {},
  setup() {
    const vehicles = ref(null);
    const showInfo = ref(null);
    onMounted(() => {
      // get initial data from server (1st page)
      //tableRef.value.requestServerInteraction()
      getVehicleList();
    });

    function getVehicleList() {
      getLastVehicles().then((response) => {
        console.log(response.data);
        vehicles.value = response.data;

        // vehicle_selected.value = {};
      });
    }
    return {
      vehicles,
      default_user,
    };
  },
};
</script>
