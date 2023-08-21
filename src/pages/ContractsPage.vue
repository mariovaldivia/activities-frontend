<template>
  <div>
    <q-page class="">
      <contract-list></contract-list>
    </q-page>
  </div>
</template>

<script lang="ts">
import ContractList from 'src/components/contracts/ContractList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContractsPage',
  components: { ContractList },
  setup() {
    return {};
  },
});
</script>
