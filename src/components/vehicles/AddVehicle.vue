<template>
  <div style="width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Add Vehicle</div>
      </q-card-section>
      <q-car-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="brand"
            label="Brand"
            hint="brand"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="model"
            label="Model"
            hint="model"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="plate"
            label="Plate"
            hint="plate"
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
import { addVehicle } from '../../services/vehicles';

export default {
  emits: ['updateCustomer'],
  setup(props, { emit }) {
    const brand = ref(null);
    const model = ref(null);
    const plate = ref(null);
    const $q = useQuasar();
    return {
      brand,
      model,
      plate,

      onSubmit() {
        addVehicle({
          brand: brand.value,
          model: model.value,
          plate: plate.value,
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