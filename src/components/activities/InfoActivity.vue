<template>
  <div style="min-width: 700px; max-width: 80vw">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h4">
          {{ activity.description }}
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-btn
            label="Aceptar"
            color="green"
            icon="check"
            v-if="
              activity.status == ActivityStatus.Registered &&
              activity.workers_assigned.length > 0
            "
            @click="acceptActivity"
          />

          <q-btn
            label="Rechazar"
            color="red"
            icon="close"
            v-if="activity.status == ActivityStatus.Registered"
            @click="acceptActivity"
          />

          <q-btn
            label="Ejecutar"
            color="primary"
            icon="people"
            v-if="activity.status == ActivityStatus.Accepted"
            @click="executeActivity"
          />

          <q-btn
            label="Finish"
            color="primary"
            icon="check"
            v-if="activity.status == ActivityStatus.Executing"
            @click="finishActivity"
          />
        </div>

        <div>
          <div class="row">
            <div class="col col-md-6">Date</div>
            <div class="col col-md-">
              {{ activity.start }}
            </div>
          </div>

          <div class="row">
            <div class="col col-md-6">Customer</div>
            <div class="col col-md-">
              {{ activity.customer ? activity.customer.name : '' }}
            </div>
          </div>

          <div class="row">
            <div class="col col-md-6">Contract</div>
            <div class="col col-md-">
              {{ activity.contract ? activity.contract.identification : '' }}
              <br />
              {{ activity.contract ? activity.contract.description : '' }}
            </div>
          </div>

          <div class="row">
            <div class="col col-md-6">Description</div>
            <div class="col col-md-">
              {{ activity.description }}
            </div>
          </div>

          <div class="row">
            <div class="col col-md-6">Detail</div>
            <div class="col col-md-">
              {{ activity.detail }}
            </div>
          </div>

          <div>
            <h5>Workers</h5>
            <q-chip
              v-for="worker in activity.workers_assigned"
              :key="worker.id"
            >
              <q-avatar>
                <img :src="worker.worker.image ?? default_user" alt="" />
              </q-avatar>
              {{ worker.worker.first_name }} {{ worker.worker.last_name }}
            </q-chip>
          </div>

          <q-btn
            label="Add worker"
            color="primary"
            icon="people"
            v-if="activity.status == ActivityStatus.Registered"
            @click="add_workers = true"
          />

          <div>
            <h5>Vehicles</h5>
            <q-chip
              v-for="vehicle in activity.vehicles_assigned"
              :key="vehicle.id"
            >
              {{ vehicle.vehicle.brand }} {{ vehicle.vehicle.model }}
              {{ vehicle.vehicle.plate }}
            </q-chip>
          </div>

          <q-btn
            label="Add vehicle"
            color="primary"
            icon="directions_car"
            v-if="activity.status == ActivityStatus.Registered"
            @click="add_vehicle = true"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="add_workers">
    <add-workers @update-activity="updateActivityInfo" :activity="activity" />
  </q-dialog>

  <q-dialog v-model="add_vehicle">
    <add-vehicle @update-activity="updateActivityInfo" :activity="activity" />
  </q-dialog>
</template>

<script>
// import { useQuasar } from 'quasar';
import { ref } from 'vue';
import {
  getActivity,
  setAcceptActivity,
  setRejectActivity,
  setExecutedActivity,
  setDoneActivity,
} from '../../services/activities';
import AddWorkers from './AddWorkers.vue';
import AddVehicle from './AddVehicle.vue';
import default_user from '../../assets/user.png';
import { ActivityStatus } from '../models';

// import { formatDate } from '../utils/date';

export default {
  emits: ['updateCustomer'],
  props: ['event'],
  components: { AddWorkers, AddVehicle },
  setup(props, { emit }) {
    // const $q = useQuasar();
    const add_workers = ref(false);
    const add_vehicle = ref(false);
    const activity = ref({});
    getActivity(props.event.id).then((response) => {
      //   console.log(response);
      activity.value = response.data;
    });

    function updateActivityInfo() {
      getActivity(props.event.id).then((response) => {
        activity.value = response.data;
      });
      add_workers.value = false;
      add_vehicle.value = false;
    }
    console.log(activity.value);
    return {
      ActivityStatus,
      activity: activity,
      default_user,
      add_workers,
      add_vehicle,
      updateActivityInfo,
      acceptActivity() {
        setAcceptActivity(props.event.id).then((response) => {
          updateActivityInfo();
          emit('updateCustomer');
        });
      },
      rejectActivity() {
        setRejectActivity(props.event.id).then((response) => {
          updateActivityInfo();
          emit('updateCustomer');
        });
      },
      executeActivity() {
        setExecutedActivity(props.event.id).then((response) => {
          updateActivityInfo();
          emit('updateCustomer');
        });
      },
      finishActivity() {
        setDoneActivity(props.event.id).then((response) => {
          updateActivityInfo();
          emit('updateCustomer');
        });
      },
    };
  },
};
</script>


<style>
h5 {
  margin-bottom: 0.3rem;
}
</style>
