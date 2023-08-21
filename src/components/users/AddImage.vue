<template>
  <div>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Add image</div>
      </q-card-section>
      <q-car-section class="row">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="q-pa-md">
            <q-file
              v-model="image"
              label="Select image"
              filled
              style="max-width: 300px"
            />
          </div>
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
// import { addCustomer } from '../../services/customers';
import { imageUser } from 'src/services/users';
export default {
  emits: ['updateCustomer'],
  props: ['username'],
  setup(props, { emit }) {
    const image = ref(null);
    const $q = useQuasar();
    return {
      image,
      onSubmit() {
        console.log('ID', props.username);
        let formData = new FormData();
        formData.append('image', image.value);
        console.log(image.value);
        imageUser(props.username, formData).then((response) => {
          console.log(response);
        });
        // addCustomer({
        //   name: name.value,
        //   identification: identification.value,
        //   address: address.value,
        // }).then((response) => {
        //   emit('updateCustomer');
        //   $q.notify({
        //     color: 'green-4',
        //     textColor: 'white',
        //     icon: 'cloud_done',
        //     message: 'Submitted',
        //   });
        // });
      },
    };
  },
};
</script>

<style>
</style>