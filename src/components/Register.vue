<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    type="text"
                    v-model="form.name"
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    id="name"
                  >
                    <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                  </v-text-field>

                  <v-text-field
                    type="email"
                    v-model="form.email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    id="email"
                  >
                    <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
                  </v-text-field>

                  <v-text-field
                    type="password"
                    v-model="form.password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    id="password"
                  >
                    <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
                  </v-text-field>

                  <v-text-field
                    type="password"
                    v-model="form.password_confirmation"
                    label="Confirm Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    id="password_confirmation"
                  >
                    <span
                      class="text-danger"
                      v-if="errors.password_confirmation"
                    >{{ errors.password_confirmation[0] }}</span>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" @click.prevent="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import User from "../apis/User";
import Csrf from "../apis/Csrf";

export default {
  props: {
    source: String
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: []
    };
  },
  methods: {
    register() {
      Csrf.getCookie().then(() => {
        User.register(this.form)
          // .then(() => {
          //   this.$router.push({ name: "Login" });
          // })

          // .catch(error => {
          //   if (error.response.status === 419) {
          //     this.errors = error.response.data.errors;
          //   }
          // });
      });
    }
  }
};
</script>