<template>
  <v-container>
    <div v-if="loading">
      <h2>Loading</h2>
    </div>
    <v-card v-else>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">User Information</h3>
          <div class="caption">Your data inputs will be in good hands</div>
        </div>
      </v-card-title>
      <!-- {{fields}} -->
      <form @submit.prevent="handleUpdate">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="fields.name"
                label="First Name"
                filled
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="genderItems"
                filled
                label="Filled style"
                :rules="[rules.required]"
                v-model="fields.gender"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="fields.age"
                label="Age"
                filled
                type="number"
                :rules="[rules.counter]"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="fields.mobile_no"
                label="Mobile Number"
                filled
                type="number"
                :rules="[rules.required, rules.mobile_no_counter_max]"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="fields.body_temp"
                label="Body Temperature (deg)"
                filled
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-checkbox
                v-model="fields.diagnosed"
                hide-details
                class="shrink mr-2 mt-0"
              >
                <template v-slot:label>
                  <div>Covid-19 Diagnosed</div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="fields.encountered"
                hide-details
                class="shrink mr-2 mt-0"
              >
                <template v-slot:label>
                  <div>Covid-19 Encountered</div>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="fields.vacinated"
                hide-details
                class="shrink mr-2 mt-0"
              >
                <template v-slot:label>
                  <div>Vacinated</div>
                </template>
              </v-checkbox>
            </v-col>

            <v-col cols="6">
              <ValidationProvider
                vid="nationality"
                name="Nationality"
                rules="required"
              >
                <v-text-field
                  v-model="fields.nationality"
                  label="Nationality"
                  filled
                  :rules="[rules.required]"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" type="submit">Submit </v-btn>
          <v-btn text color="white " type="reset" to="/app/dashboard">Back</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    this.get()
  },
  data() {
    return {
      fields: {
        name: '',
        gender: '',
        age: '',
        mobile_no: '',
        body_temp: '',
        diagnosed: false,
        encountered: false,
        vacinated: true,
        nationality: 'filipino',
      },
      genderItems: ['male', 'female'],
      rules: {
        required: (value) => !!value || 'Field is Required.',
        counter: (value) => value.length <= 2 || 'Max 2 characters',
        mobile_no_counter_max: (value) =>
          value.length <= 11 || 'Max 11 characters',
        mobile_no_counter_min: (value) =>
          value.length <= 10 || 'Min 10 characters',
        numbersOnly: (value) => value.match(/^[0-9]+$/) || 'Numbers Only Input',
      },
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      citizen: 'all/citizen',
    }),
    router_id() {
      return this.$route.params.id
    },
  },
  methods: {
    ...mapActions({
      show: 'all/show',
      update: 'all/update',
    }),
    async get() {
      try {
        this.loading = true
        await this.show(this.router_id)
        const { diagnosed, encountered, vacinated } = this.citizen
        this.fields = {
          ...this.citizen,
          diagnosed: diagnosed === 'YES' ? true : false,
          encountered: encountered === 'YES' ? true : false,
          vacinated: vacinated === 'YES' ? true : false,
        }
        this.loading = false;
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async handleUpdate() {
      try {
        this.loading = true
        const data = {
          ...this.fields,
        }
        await this.update(data)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async addCitizen() {
      try {
        const data = {
          ...this.fields,
        }
        await this.$store.dispatch('all/create', data)
        this.fields = {
          name: '',
          gender: '',
          age: '',
          mobile_no: '',
          body_temp: '',
          diagnosed: false,
          encountered: false,
          vacinated: true,
          nationality: 'filipino',
        }
        this.$router.push('/app/dashboard')
      } catch (error) {
        console.log(error)
        alert('Error Occur')
      }
    },
  },
}
</script>

<style></style>
