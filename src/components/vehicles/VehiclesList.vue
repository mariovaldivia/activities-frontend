<template>
  <div class="q-pa-md">
    <q-btn label="Add" color="primary" @click="add_vehicle = true" />

    <q-table
      ref="tableRef"
      title="Vehicles"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @request="onRequest"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="type_name" :props="props">
            {{ props.row.type_name }}
          </q-td>
          <q-td key="brand" :props="props">
            {{ props.row.brand }}
          </q-td>
          <q-td key="model" :props="props">
            {{ props.row.model }}
          </q-td>
          <q-td key="plate" :props="props">
            {{ props.row.plate }}
          </q-td>
          <q-td>
            <q-icon
              name="edit"
              dense
              flat
              @click="editVehicle(props.row.id)"
            ></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="add_vehicle">
      <add-vehicle @update-customer="updateVehicleList" />
    </q-dialog>

    <!-- <q-dialog v-model="edit_vehicle">
      <edit-vehicle
        @update-customer="updatevehicleList"
        :vehicle="vehicle_selected"
      />
    </q-dialog> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getVehicles } from '../../services/vehicles';

import AddVehicle from './AddVehicle.vue';
// import EditVehicle from './EditVehicle.vue';
const columns = [
  {
    name: 'type_name',
    required: true,
    label: 'Type',
    align: 'left',
    field: (row) => row.type_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'brand',
    required: true,
    label: 'Brand',
    align: 'left',
    field: (row) => row.brand,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'model',
    align: 'center',
    label: 'Model',
    field: 'model',
    sortable: true,
  },
  { name: 'plate', label: 'Plate', field: 'plate', sortable: true },
  {},
];

export default {
  components: { AddVehicle },
  setup() {
    // const tableRef = ref();
    // const loading = ref(false);
    const add_vehicle = ref(false);
    const edit_vehicle = ref(false);
    const vehicle_selected = ref({});
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
      updateVehicleList();
    });

    function updateVehicleList() {
      getVehicles().then((response) => {
        console.log(response.data);
        rows.value = response.data;

        add_vehicle.value = false;
        edit_vehicle.value = false;
        vehicle_selected.value = {};
      });
    }

    return {
      columns,
      rows,
      add_vehicle,
      edit_vehicle,
      vehicle_selected,
      updateVehicleList,
      editVehicle(id) {
        const current_vehicle = rows.value.filter((row) => row.id == id)[0];
        console.log(current_vehicle);
        vehicle_selected.value = current_vehicle;
        edit_vehicle.value = true;
      },
    };
  },
};
</script>

<style>
</style>
