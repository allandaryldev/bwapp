<template>
  <v-container class="">
    <h1 v-if="loading">Loading</h1>
    <div v-else>
      <div class="my-4">
        <v-row v-if="!loading">
          <v-col v-for="(item, index) in counter" :key="index" cols="12" sm="4">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ item.title }}</h3>
                  <div>{{ item.count }}</div>
                </div>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="my-4">
        <v-data-table
          :headers="headers"
          :items="citizens.data"
          :options.sync="search"
          :server-items-length="totalPages"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar text>
              <v-toolbar-title>Citizens</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon text v-bind="attrs" v-on="on" to="create">
                    <v-icon>mdi-plus-thick</v-icon>
                  </v-btn>
                </template>
                <span>Add CItizen</span>
              </v-tooltip>
            </v-toolbar>
          </template>
          <template v-slot:no-data> No Data Found </template>
          <template v-slot:item.body_temp="{ item }">
            {{ item.body_temp }} &deg;
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="blue darken-4"
                  icon
                  text
                  v-bind="attrs"
                  v-on="on"
                  :to="`${item.id}/update`"
                >
                  <v-icon>mdi-pencil-outline</v-icon></v-btn
                >
              </template>
              <span>Update </span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="amber darken-4"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="handleDeleteModal(true, item.id)"
                  ><v-icon>mdi-delete-outline</v-icon></v-btn
                >
              </template>
              <span>Remove</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialogDelete" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Are you sure? </v-card-title>

        <v-card-text>
          By Removing Citizen Data, data will be permanently removed
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="white" text @click="handleDeleteModal(false, 0)">
            Close
          </v-btn>

          <v-btn color="red darken-4" text @click="handleDelete"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  async created() {
    this.loading = true
    // await this.fetch();
    await this.fetchCounter()
    // await Promise.all([this.fetch(), this.fetchCounter()])
    this.loading = false
  },
  data() {
    return {
      dialogDelete: false,
      selected: 0,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Gender', value: 'gender', sortable: false, },
        { text: 'Age', value: 'age' },
        { text: 'Body temp (DEGREE)', value: 'body_temp' },
        { text: 'Diagnosed', value: 'diagnosed', sortable: false, },
        { text: 'Encountered', value: 'encountered', sortable: false, },
        { text: 'Vacinated', value: 'vacinated', sortable: false, },
        { text: 'Nationality', value: 'nationality' , sortable: false,},
        { text: 'Action', value: 'action' , sortable: false,},
      ],
      loading: false,
      selected: [],
      modalUpdate: false,
      modalCreate: false,
      search: {},
    }
  },
  computed: {
    ...mapGetters({
      counter: 'all/counter',
      citizens: 'all/citizens',
    }),
    totalPages() {
      return this.citizens.meta.total
    },
    filters() {
      return { ...this.search }
    },
  },
  methods: {
    ...mapActions({
      get: 'all/get',
      getCounter: 'all/getCounter',
      delete: 'all/delete',
    }),
    async handleDeleteModal(modal, data) {
      this.dialogDelete = modal
      this.selected = data
    },
    async handleDelete() {
      try {
        this.loading = true
        await this.delete(this.selected)
        await this.fetch()
        this.handleDeleteModal(false, 0)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async setSearch(value) {
      try {
        this.loading = true
        const { itemsPerPage, page, sortBy, sortDesc } = this.search
        const data = {
          size: itemsPerPage,
          page,
          order_by: sortBy[0],
          direction: sortDesc[0] === false ? 'asc' : 'desc',
        }
        const params = {
          params: {
            ...data,
            // ...value
          },
        }
        this.get(params)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async fetch() {
      try {
        // this.loading = true
        await this.get()
        // this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async fetchCounter() {
      try {
        // this.loading = true
        await this.getCounter()
        // this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
  },
  watch: {
    search: {
      handler() {
        this.setSearch()
      },
      deep: true,
    },
    // filters() {
    //   this.setSearch()
    // },
  },
}
</script>

<style></style>
