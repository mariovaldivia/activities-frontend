<template>
  <div class="q-pa-md">
    <q-btn label="Add" color="primary" @click="add_customer = true" />

    <q-table
      ref="tableRef"
      title="Empresas"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="identification" :props="props">
            {{ props.row.identification }}
          </q-td>
          <q-td key="address" :props="props">
            {{ props.row.address }}
          </q-td>
          <q-td>
            <q-icon
              name="edit"
              dense
              flat
              @click="editCustomer(props.row.id)"
            ></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="add_customer">
      <add-customer @update-customer="updateCustomerList" />
    </q-dialog>

    <q-dialog v-model="edit_customer">
      <edit-customer
        @update-customer="updateCustomerList"
        :customer="customer_selected"
      />
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCustomers } from '../../services/customers';

import AddCustomer from './AddCustomer.vue';
import EditCustomer from './EditCustomer.vue';
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'identification',
    align: 'center',
    label: 'Identificacion',
    field: 'identification',
    sortable: true,
  },
  { name: 'address', label: 'Address', field: 'address', sortable: true },
  {},
];

export default {
  components: { AddCustomer, EditCustomer },
  setup() {
    // const tableRef = ref();
    // const loading = ref(false);
    const add_customer = ref(false);
    const edit_customer = ref(false);
    const customer_selected = ref({});
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
      updateCustomerList();
    });

    function updateCustomerList() {
      getCustomers().then((response) => {
        console.log(response.data);
        rows.value = response.data;

        add_customer.value = false;
        edit_customer.value = false;
        customer_selected.value = {};
      });
    }

    return {
      columns,
      rows,
      add_customer,
      edit_customer,
      customer_selected,
      updateCustomerList,
      editCustomer(id) {
        console.log('editando empresa ' + id);
        const current_customer = rows.value.filter((row) => row.id == id)[0];
        console.log(current_customer);
        customer_selected.value = current_customer;
        edit_customer.value = true;
      },
    };
  },
};
</script>

<style>
</style>