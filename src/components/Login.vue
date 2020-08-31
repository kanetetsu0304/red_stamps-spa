<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
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
                    type="email"
                    v-model="form.email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    id="email"
                    :error-messages="errors.email"
                    @keydown="clearError('email')"
                  ></v-text-field>

                  <v-text-field
                    type="password"
                    v-model="form.password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    id="password"
                    :error-messages="errors.password"
                    @keydown="clearError('password')"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" @click.prevent="login">Login</v-btn>
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

export default {
  props: {
    source: String
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: []
    };
  },
  methods: {
    login() {
      User.login(this.form)
        .then(() => {
          this.$root.$emit("login", true);
          localStorage.setItem("auth", "true");
          this.$router.push({ name: "RedStampList" });
        })

        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>