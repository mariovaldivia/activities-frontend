<template>
  <q-select
    filled
    v-model="contract"
    label="Contract"
    :value="value"
    :options="contracts"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
    @update:modelValue="updateValue"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { ref } from 'vue';
import { getContractsByCustomer } from '../../services/contracts';

export default {
  emits: ['update:modelValue'],
  props: ['value', 'customer_id'],
  setup(props, { emit }) {
    const contracts = ref(null);
    const contract = ref(null);
    // watch(props.customer_id, async (newCustomer, oldCustomer) => {
    //   console.log(newCustomer);
    // });
    return {
      contract,
      contracts,
      filterFn(val, update, abort) {
        // if (contracts.value !== null) {
        //   // already loaded
        //   update();
        //   return;
        // }
        update(() => {
          getContractsByCustomer(props.customer_id).then((response) => {
            contracts.value = response.data.map((contract) => ({
              label: contract.description,
              value: contract.id,
            }));
            console.log(response.data);
          });
        });
      },
      abortFilterFn() {
        // console.log('delayed filter aborted')
      },
      updateValue(value) {
        emit('update:modelValue', value);
      },
    };
  },
};
</script>

<style>
</style>