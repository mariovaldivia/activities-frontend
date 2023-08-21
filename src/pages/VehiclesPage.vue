<template>
  <div>
    <q-page class="">
      <vehicles-list></vehicles-list>
    </q-page>
  </div>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import VehiclesList from 'src/components/vehicles/VehiclesList.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VehiclesPage',
  components: { VehiclesList },
  setup() {
    return {};
  },
});
</script>
