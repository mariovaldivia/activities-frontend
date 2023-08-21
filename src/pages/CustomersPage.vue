<template>
  <div>
    <q-page class="">
      <customer-list></customer-list>
    </q-page>
  </div>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import CustomerList from 'src/components/customers/CustomerList.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'EmpresasPage',
  components: { CustomerList },
  setup() {
    return {};
  },
});
</script>
