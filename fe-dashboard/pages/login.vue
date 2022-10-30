<template>
  <v-app id="login" class="primary">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-5 pa-3" color="#000000cc">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="../static/logo.png"
                    alt="Vans"
                    width="240"
                    height="120"
                  />
                  <h1 class="flex my-4 white--text">Vans Kediri Dashboard</h1>
                </div>
                <v-form>
                  <v-text-field
                    dark
                    color="white"
                    append-icon="mdi-account-circle"
                    name="email"
                    label="Email"
                    hide-details="true"
                    type="text"
                    v-model="model.email"
                    aria-autocomplete="off"
                  ></v-text-field>
                  <v-text-field
                    dark
                    color="white"
                    :append-icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
                    @click:append="showPassword = !showPassword"
                    name="password"
                    label="Password"
                    hide-details="true"
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="model.password"
                    aria-autocomplete="off"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" top>
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  layout: "empty",
  data: () => ({
    loading: false,
    snackbar: false,
    textSnackbar: "",
    model: {
      email: "",
      password: "",
    },
    showPassword: false,
  }),
  mounted() {
    this.cekAuth();
  },
  methods: {
    cekAuth() {
      if (!localStorage.getItem("idUser")) {
        this.$router.push("/login");
      } else {
        this.$router.push("/transaction");
      }
    },
    async login() {
      this.loading = true;
      try {
        let response = await axios.post(`http://localhost:1231/login`, {
          email: this.model.email,
          password: this.model.password,
        });
        localStorage.setItem("username", response.data.result.data.username);
        localStorage.setItem("idUser", response.data.result.data._id);
        localStorage.setItem("email", response.data.result.data.email);
        setTimeout(() => {
          this.$router.push("/transaction");
        }, 1000);
      } catch (e) {
        this.loading = false;
        this.textSnackbar = e.response.data.message;
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
  background-color: #000000cc;
}
</style>
