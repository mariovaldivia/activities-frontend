<template>
  <div>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Add User</div>
      </q-card-section>
      <q-car-section class="row">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="firstName"
            label="First Name"
            hint="First Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="lastName"
            label="Last Name"
            hint="Last Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="email"
            label="Email"
            hint="Email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="username"
            label="Username"
            hint="Username"
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
import { addUser } from '../../services/users';

export default {
  emits: ['updateUser'],
  setup(props, { emit }) {
    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    const username = ref(null);
    const $q = useQuasar();
    return {
      firstName,
      lastName,
      username,
      email,

      onSubmit() {
        addUser({
          first_name: firstName.value,
          last_name: lastName.value,
          username: username.value,
          email: email.value,
        }).then((response) => {
          emit('updateUser');
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