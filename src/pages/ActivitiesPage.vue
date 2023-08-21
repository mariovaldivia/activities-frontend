<template>
  <div class="q-pa-md">
    <h2>Activities</h2>

    <div>
      <q-select
        filled
        clearable
        v-model="customer"
        label="Customer"
        :options="customers"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
        @update:model-value="updateCalendar"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <FullCalendar
      ref="fullCalendar"
      :options="calendarOptions"
      @dateClick="handleDateClick"
      @select="handleSelection"
    />

    <q-dialog v-model="showForm">
      <add-activity
        @update-activities="updateCalendar"
        :start="fechaInicio"
        :finish="fechaTermino"
      />
    </q-dialog>

    <q-dialog v-model="showInfo">
      <info-activity @update-activities="updateCalendar" :event="event" />
    </q-dialog>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddActivity from 'src/components/activities/AddActivity.vue';
import InfoActivity from 'src/components/activities/InfoActivity.vue';
import { getActivities } from '../services/activities';
import { formatDate } from '../utils/date';
import { ActivityStatus } from 'src/components/models';
import { getCustomers } from 'src/services/customers';

function getActivityColor(status) {
  if (status == ActivityStatus.Done)
    return {
      backgroundColor: '#4CA20B',
      borderColor: '#336d07',
      textColor: '#FFF',
    };
  if (status == ActivityStatus.Executing)
    return {
      backgroundColor: '#9edad9',
      borderColor: '#79a7a6',
      textColor: '#666',
    };
  if (status == ActivityStatus.Accepted)
    return {
      backgroundColor: '#FFEF8F',
      borderColor: '#f6a828',
      textColor: '#666',
    };
  if (status == ActivityStatus.Registered)
    return {
      backgroundColor: '#FFFFCC',
      borderColor: '#f6a828',
      textColor: '#666',
    };

  return { backgroundColor: '#F5F5F5', borderColor: '#ddd', textColor: '#666' };
}
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    AddActivity,
    InfoActivity,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        firstDay: 1,
        dateClick: this.handleDateClick,
        // eventsSet: this.updateCalendar,
        events: this.getEvents,
        eventClick: this.eventHandler,
      },
      showForm: false,
      showInfo: false,
      fechaInicio: null,
      fechaTermino: null,
      event: null,
      events: [],
      customer: null,
      customers: null,
    };
  },
  methods: {
    getEvents: async function (info, successCallback, failureCallback) {
      console.log(info);
      const currentEvents = await getActivities({
        start: formatDate(info.start),
        end: formatDate(info.end),
        customer: this.customer?.value,
      }).then((response) => {
        // console.log(response.data);

        return response.data.map((event) => ({
          id: event.id,
          title: event.description,
          start: event.start,
          end: event.finish,
          ...getActivityColor(event.status),
        }));

        // this.calendarOptions.events = this.events;
        // console.log(this.events);
      });
      console.log(currentEvents);
      successCallback(currentEvents);
    },
    eventHandler: function (calEvent, jsEvent, view) {
      console.log('informacion de evento');
      console.log(calEvent);
      this.showInfo = true;
      this.event = calEvent.event;
    },
    getActivitiesCalendar: function () {
      getActivities().then((response) => {
        console.log(response.data);
        return response.data.map((event) => ({
          id: event.id,
          title: event.description,
          start: event.start,
          end: event.finish,
        }));
        // this.calendarOptions.events = this.events;
        // console.log(this.events);
      });
    },

    updateCalendar: function (events) {
      this.showForm = false;
      console.log('eventos' + events);
      console.log('actualizando calendario');
      let calendar = this.$refs.fullCalendar.getApi();
      console.log(calendar);
      calendar.refetchEvents();
    },
    handleDateClick: function (arg) {
      this.fechaInicio = arg.date;
      this.fechaTermino = arg.date;
      this.showForm = true;
      this.showInfo = false;

      console.log(this.fechaInicio);
      /* if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      } */
    },
    handleSelection: function (selectionInfo) {
      this.fechaInicio = selectionInfo.start;
      this.fechaTermino = selectionInfo.end;
      this.showForm = true;
      console.log(this.fechaInicio);
      /* if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      } */
    },
    filterFn(val, update, abort) {
      if (this.customers !== null) {
        // already loaded
        update();
        return;
      }
      update(() => {
        getCustomers().then((response) => {
          this.customers = response.data.map((customer) => ({
            label: customer.name,
            value: customer.id,
          }));
          console.log(response.data);
        });
      });
    },
    abortFilterFn() {
      // console.log('delayed filter aborted')
    },
  },
};
</script>

<style>
</style>
