<template>
  <div style="width: 600px; max-width: 80vw">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Workers</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            filled
            v-model="user"
            label="Trabajador"
            :options="users"
            @filter="filterFn"
            @filter-abort="abortFilterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            filled
            v-model="role"
            label="Cargo"
            hint="Cargo"
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
import { getUsers } from '../../services/users';
import { addWorkerActivity } from '../../services/activities';
// import { moment } from 'moment';
import { formatDate } from '../../utils/date';
export default {
  emits: ['updateActivity'],
  props: ['activity'],
  setup(props, { emit }) {
    const users = ref(null);
    const role = ref(null);
    const user = ref(null);
    const $q = useQuasar();

    return {
      role,
      users,
      user,
      onSubmit() {
        console.log(user.value.label);
        addWorkerActivity(props.activity.id, {
          role: role.value,
          worker: user.value.value,
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
        if (users.value !== null) {
          // already loaded
          update();
          return;
        }
        update(() => {
          getUsers().then((response) => {
            users.value = response.data.map((user) => ({
              label: `${user.first_name} ${user.last_name}`,
              value: user.id,
            }));
            console.log(response.data);
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