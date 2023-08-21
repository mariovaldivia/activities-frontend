<template>
  <q-page class="items-center justify-evenly">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section class="">
        <q-form @submit="onSubmit" class="q-gutter-md">
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

          <q-input
            filled
            v-model="password"
            label="Password"
            hint="Password"
            type="password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <!-- <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            /> -->
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { login } from '../services/users';
import { useUserStore } from '../stores/users';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup(props, { emit }) {
    const username = ref(null);
    const password = ref(null);
    const $q = useQuasar();
    const userToken = useUserStore();
    const router = useRouter();
    userToken.removeToken();
    return {
      username,
      password,
      onSubmit() {
        login({
          email: username.value,
          password: password.value,
        })
          .then((response) => {
            // console.log(response.data);
            if (response.data.access) {
              console.log(response.data.access);
              userToken.setToken(response.data);
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted',
              });
              router.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
            $q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Incorrect username or password',
            });
          });
      },
    };
  },
};
</script>

<style>
</style>