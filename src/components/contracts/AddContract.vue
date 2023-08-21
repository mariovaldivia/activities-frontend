<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Add Contract</div>
      </q-card-section>
      <q-car-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <!-- <q-select
            filled
            v-model="customer"
            label="Customer"
            :options="customers"
            @filter="filterFn"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select> -->
          <select-customer v-model="customer" />

          <q-input
            filled
            v-model="identification"
            label="Identification"
            hint="Identification"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
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

          <q-input
            filled
            label="Start"
            v-model="start"
            mask="##/##/####"
            :rules="['##/##/####']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="start" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            filled
            label="Finish"
            v-model="finish"
            mask="##/##/####"
            :rules="['##/##/####']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="finish" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

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
      </q-car-section>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { addContract } from '../../services/contracts';
import { getCustomers } from '../../services/customers';
import SelectCustomer from '../customers/SelectCustomer.vue';
import { formatDate, getDate } from '../../utils/date';
export default {
  components: { SelectCustomer },
  emits: ['updateCustomer'],
  setup(props, { emit }) {
    const customer = ref(null);
    const customers = ref(null);
    const identification = ref(null);
    const description = ref(null);
    const detail = ref(null);
    const start = ref(null);
    const finish = ref(null);
    const $q = useQuasar();
    return {
      customer,
      customers,
      identification,
      description,
      detail,
      start,
      finish,
      onSubmit() {
        let startDate = Date.parse(start.value);
        console.log(startDate, typeof startDate);
        addContract({
          customer: customer.value.value,
          identification: identification.value,
          description: description.value,
          start: formatDate(getDate(start.value)),
          finish: formatDate(getDate(finish.value)),
          detail: detail.value,
        }).then((response) => {
          emit('updateCustomer');
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        });
      },
    };
  },
};
</script>

<style>
</style>