<template>
  <div style="width: 600px; max-width: 80vw">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Vehicle</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            filled
            v-model="vehicle"
            label="Vehicle"
            :options="vehicles"
            @filter="filterFn"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <!-- <q-input
            filled
            v-model="role"
            label="Cargo"
            hint="Cargo"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          /> -->

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
import { getVehicles } from '../../services/vehicles';
import { addVehicleActivity } from '../../services/activities';
// import { moment } from 'moment';
import { formatDate } from '../../utils/date';
export default {
  emits: ['updateActivity'],
  props: ['activity'],
  setup(props, { emit }) {
    const vehicles = ref(null);
    // const role = ref(null);
    const vehicle = ref(null);
    const $q = useQuasar();

    return {
      //   role,
      vehicles,
      vehicle,
      onSubmit() {
        console.log(vehicle.value.label);
        addVehicleActivity(props.activity.id, {
          //   role: role.value,
          vehicle: vehicle.value.value,
        })
          .then((response) => {
            emit('updateActivity');
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted',
            });
          })
          .catch((error) => {
            console.log(error.response.data.message);
            $q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'exclamation',
              message: error.response.data.message,
            });
          });
      },
      filterFn(val, update, abort) {
        if (vehicles.value !== null) {
          // already loaded
          update();
          return;
        }
        update(() => {
          getVehicles().then((response) => {
            vehicles.value = response.data.map((vehicle) => ({
              label: `${vehicle.brand} ${vehicle.model} ${vehicle.plate}`,
              value: vehicle.id,
            }));
          });
        });
      },
      abortFilterFn() {
        // console.log('delayed filter aborted')
      },
    };
  },
};
</script>

<style>
</style>