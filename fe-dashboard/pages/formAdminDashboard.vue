<template>
  <v-card>
    <v-text-field class="d-none" v-model="reload"></v-text-field>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      {{ mode }} Admin Dashboard
      <v-spacer></v-spacer>
      <v-btn small icon @click="close(null)">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-text-field
        v-model="model.email"
        label="Email"
        placeholder="Email@email.com"
      ></v-text-field>
      <v-text-field
        v-model="model.username"
        label="Username"
        placeholder="User Name"
      ></v-text-field>
      <v-text-field
        v-model="model.password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="showPassword = !showPassword"
        placeholder="Password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions
      ><v-spacer></v-spacer>
      <v-btn :loading="loadingBtn" color="red lighten-1" text @click="proses"
        >Save</v-btn
      ></v-card-actions
    >
    <v-snackbar v-model="snackbar" top>
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  name: "formAdminDashboard",
  props: ["id", "username", "email", "password"],
  computed: {
    reload() {
      this.fetch();
    },
  },
  data: () => ({
    model: {
      username: "",
      email: "",
      password: "",
    },
    showPassword: false,
    message: "",
    mode: "",
    loadingBtn: false,
    textSnackbar: "",
    snackbar: false,
  }),
  methods: {
    close(message) {
      this.model.username = "";
      this.model.email = "";
      this.model.password = "";
      this.$emit("close", message);
    },
    fetch() {
      this.mode = "Add";
      if (this.id != "") {
        this.mode = "Edit";
        this.model.username = this.username;
        this.model.email = this.email;
        this.model.password = this.password;
      }
    },
    async proses() {
      this.loadingBtn = true;
      if (this.id != "") {
        try {
          await axios.put("http://localhost:1231/sysUser/" + this.id, {
            username: this.model.username,
            email: this.model.email,
            password: this.model.password,
          });
          this.message = "Update Admin Dashboard Success";
          this.close(this.message);
        } catch (e) {
          this.textSnackbar = e.response.data.message;
          this.snackbar = true;
        }
      } else {
        try {
          await axios.post("http://localhost:1231/sysUser", {
            username: this.model.username,
            email: this.model.email,
            password: this.model.password,
          });
          this.message = "Add Admin Dashboard Success";
          this.close(this.message);
        } catch (e) {
          this.textSnackbar = e.response.data.message;
          this.snackbar = true;
        }
      }
      this.loadingBtn = false;
    },
  },
};
</script>
