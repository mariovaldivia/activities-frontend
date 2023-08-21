<template>
  <div class="q-pa-md">
    <q-btn label="Add" color="primary" @click="add_user = true" />

    <q-table
      ref="tableRef"
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="username"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-avatar
              rounded
              size="48px"
              @click="setImageUser(props.row.username)"
            >
              <img :src="props.row.image ?? default_user" />
            </q-avatar>
          </q-td>
          <q-td key="first_name" :props="props">
            {{ props.row.first_name }}
          </q-td>
          <q-td key="last_name" :props="props">
            {{ props.row.last_name }}
          </q-td>
          <q-td key="username" :props="props">
            {{ props.row.username }}
          </q-td>
          <!-- <q-td>
            <q-icon
              name="edit"
              dense
              flat
              @click="editCustomer(props.row.id)"
            ></q-icon>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="add_image">
      <add-image :username="user_id"></add-image>
    </q-dialog>

    <q-dialog v-model="add_user">
      <add-user @update-user="updateUserList" />
    </q-dialog>
    <!-- 
    <q-dialog v-model="edit_customer">
      <edit-customer
        @update-customer="updateUserList"
        :customer="customer_selected"
      />
    </q-dialog> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getUsers } from '../../services/users';
import AddImage from './AddImage.vue';
import default_user from '../../assets/user.png';
import AddUser from './AddUser.vue';

const columns = [
  {},
  {
    name: 'first_name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'last_name',
    align: 'center',
    label: 'Identificacion',
    field: 'identification',
    sortable: true,
  },
  { name: 'username', label: 'Username', field: 'username', sortable: true },
];

export default {
  components: { AddImage, AddUser },
  setup() {
    // const tableRef = ref();
    // const loading = ref(false);
    const add_user = ref(false);
    const edit_customer = ref(false);
    const add_image = ref(false);
    const customer_selected = ref({});
    const image = ref(null);
    const user_id = ref(null);
    // const pagination = ref({
    //   sortBy: 'desc',
    //   descending: false,
    //   page: 1,
    //   rowsPerPage: 3,
    //   rowsNumber: 10,
    // });
    const rows = ref([]);
    onMounted(() => {
      // get initial data from server (1st page)
      //tableRef.value.requestServerInteraction()
      updateUserList();
    });

    function updateUserList() {
      getUsers().then((response) => {
        console.log(response.data);
        rows.value = response.data;

        add_user.value = false;
        edit_customer.value = false;
        customer_selected.value = {};
      });
    }

    return {
      columns,
      rows,
      default_user,
      add_user,
      edit_customer,
      customer_selected,
      add_image,
      user_id,
      image,
      updateUserList,
      editCustomer(id) {
        console.log('editando empresa ' + id);
        const current_customer = rows.value.filter((row) => row.id == id)[0];
        console.log(current_customer);
        customer_selected.value = current_customer;
        edit_customer.value = true;
      },
      setImageUser(id) {
        add_image.value = true;
        user_id.value = id;
      },
    };
  },
};
</script>

<style>
</style>