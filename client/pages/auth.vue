<template>
  <div class="ma-16">
    <v-card class="transparent" :height="500">
      <v-row justify="center" align="center">
        <v-col cols="5">
          <v-card :loading="loading">
            <v-card-text>
              <div class="text-center">
                <h3 class="headline mb-0">BWApp</h3>
                <div class="overline">Case Study</div>
              </div>
            </v-card-text>
            <v-card-text>
              <ValidationObserver ref="loginForm" v-slot="{ invalid }">
                <form @submit.prevent="login">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Username"
                    rules="required"
                  >
                    <v-text-field
                      v-model="fields.uname"
                      :error-messages="errors"
                      label="Username"
                      required
                      filled
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <v-text-field
                      v-model="fields.password"
                      :error-messages="errors"
                      label="Password"
                      required
                      filled
                      :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showpass = !showpass"
                      :type="showpass ? 'text' : 'password'"
                    ></v-text-field>
                  </validation-provider>
                </form>
              </ValidationObserver>
            </v-card-text>
            <v-card-actions>
              <v-btn text block dark type="submit" @click="login">LogIn</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      loading: false,
      showpass: false,
      fields: {
        uname: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      try {
        const loginForm = this.$refs.loginForm
        loginForm.validate().then(async (success) => {
          if (success) {
            try {
              const data = { ...this.fields }
              const response = await this.$auth.loginWith('laravelSanctum', {
                data,
              })
            } catch (error) {
              alert(error.response.data.message)
            }
          }
        })
      } catch (error) {
        console.log(error);
        // console.log(error.response.data.message);
        // alert('Error Occured')
      }
    },
  },
}
</script>

<style></style>
