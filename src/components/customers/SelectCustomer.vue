<template>
  <q-select
    filled
    v-model="customer"
    label="Customer"
    :value="value"
    :options="customers"
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
import { getCustomers } from '../../services/customers';

export default {
  emits: ['update:modelValue'],
  props: ['value'],
  setup(props, { emit }) {
    const customers = ref(null);
    const customer = ref(null);
    return {
      customer,
      customers,
      filterFn(val, update, abort) {
        if (customers.value !== null) {
          // already loaded
          update();
          return;
        }
        update(() => {
          getCustomers().then((response) => {
            customers.value = response.data.map((customer) => ({
              label: customer.name,
              value: customer.id,
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