<template>
  <v-card>
    <v-text-field class="d-none" v-model="reload"></v-text-field>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      Edit User Mobile
      <v-spacer></v-spacer>
      <v-btn small icon @click="close(null)">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-text-field
        v-model="model.fristname"
        label="First Name"
        placeholder="First Name"
      ></v-text-field>
      <v-text-field
        v-model="model.lastname"
        label="Last Name"
        placeholder="Last Name"
      ></v-text-field>
      <v-text-field
        v-model="model.username"
        label="Userame"
        placeholder="Username"
      ></v-text-field>
      <v-text-field
        v-model="model.nohp"
        label="No HP"
        placeholder="No HP"
        type="number"
      ></v-text-field>
      <v-text-field
        v-model="model.email"
        label="Email"
        placeholder="Email"
      ></v-text-field>
      <v-select
        label="Status"
        v-model="model.isActive"
        :items="select"
        item-text="name"
        item-value="value"
      ></v-select>
      <v-text-field
        v-model="model.password"
        label="Password"
        placeholder="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="showPassword = !showPassword"
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
  name: "formUser",
  props: ["id", "data"],
  computed: {
    reload() {
      this.fetch();
    },
  },
  data: () => ({
    model: {
      fristname: "",
      lastname: "",
      username: "",
      email: "",
      nohp: "",
      password: "",
      isActive: true,
    },
    select: [
      { name: "Active", value: true },
      { name: "Not Active", value: false },
    ],
    message: "",
    mode: "",
    loadingBtn: false,
    textSnackbar: "",
    snackbar: false,
    showPassword: false,
  }),
  methods: {
    close(message) {
      (this.model = {
        fristname: "",
        lastname: "",
        username: "",
        email: "",
        nohp: "",
        password: "",
        isActive: true,
      }),
        this.$emit("close", message);
    },
    fetch() {
      this.model = {
        fristname: this.data.fristname,
        lastname: this.data.lastname,
        username: this.data.username,
        email: this.data.email,
        nohp: this.data.nohp,
        password: this.data.password,
        isActive: this.data.isActive,
      };
    },
    async proses() {
      this.loadingBtn = true;
      try {
        await axios.put("http://localhost:1231/user/" + this.id, {
          fristname: this.model.fristname,
          lastname: this.model.lastname,
          username: this.model.username,
          email: this.model.email,
          nohp: this.model.nohp,
          password: this.model.password,
          status: this.model.isActive,
        });
        this.message = "Update User Mobile Success";
        this.close(this.message);
      } catch (e) {
        this.textSnackbar = e.response.data.message;
        this.snackbar = true;
      }
      this.loadingBtn = false;
    },
  },
};
</script>
