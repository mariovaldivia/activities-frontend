<template>
  <q-page>
    <div class="row">
      <activity-list class="col-6"></activity-list>

      <div class="col-4">
        <last-workers-list></last-workers-list>
        <last-vehicles-list></last-vehicles-list>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import ActivityList from 'components/index/ActivityList.vue';
import LastWorkersList from 'components/index/LastWorkersList.vue';
import LastVehiclesList from 'components/index/LastVehiclesList.vue';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { ActivityList, LastWorkersList, LastVehiclesList },
  setup() {
    return {};
  },
});
</script>
