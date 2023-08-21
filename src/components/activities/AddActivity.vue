<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Activity</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <select-customer v-model="customer" />
          <select-contract
            v-model="contract"
            :customer_id="customer ? customer.value : null"
          />
          <q-input
            filled
            v-model="description"
            label="Description"
            hint="Description"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="detail"
            type="textarea"
            label="Detail"
            hint="Detail"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
// import { getCustomers } from '../../services/customers';
import { addActivity } from '../../services/activities';
import SelectCustomer from '../customers/SelectCustomer.vue';
import SelectContract from '../contracts/SelectContract.vue';
// import { moment } from 'moment';
import { formatDate } from '../../utils/date';

export default {
  components: { SelectCustomer, SelectContract },
  emits: ['updateActivities'],
  props: ['start', 'finish'],
  setup(props, { emit }) {
    const description = ref(null);
    const detail = ref(null);
    const customer = ref(null);
    const contract = ref(null);
    const $q = useQuasar();

    return {
      description,

      customer,
      contract,
      detail,
      onSubmit() {
        console.log(customer.value.label);
        addActivity({
          description: description.value,
          customer: customer.value.value,
          contract: contract.value.value,
          start: formatDate(props.start),
          finish: formatDate(props.finish),
          detail: detail.value,
        }).then((response) => {
          emit('updateActivities');
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Activity added',
          });
        });
      },
    };
  },
};
</script>

<style>
</style>
