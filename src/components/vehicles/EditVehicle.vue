<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Edit Customer</div>
      </q-card-section>
      <q-car-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Customer name"
            hint="Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

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
            v-model="address"
            label="Address"
            hint="Adress"
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
      </q-car-section>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { updateCustomer } from '../../services/customers';

export default {
  emits: ['updateCustomer'],
  props: ['customer'],
  setup(props, { emit }) {
    const $q = useQuasar();

    const name = ref(props.customer.name);
    const identification = ref(props.customer.identification);
    const address = ref(props.customer.address);
    console.log(props.customer);
    return {
      name,
      identification,
      address,

      onSubmit() {
        updateCustomer(props.customer.id, {
          name: name.value,
          identification: identification.value,
          address: address.value,
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