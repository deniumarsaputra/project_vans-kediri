<template>
  <v-card>
    <v-text-field class="d-none" v-model="reload"></v-text-field>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      {{ mode }} Category
      <v-spacer></v-spacer>
      <v-btn small icon @click="close(null)">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-text-field
        v-model="model.name"
        label="Name"
        placeholder="Name Category"
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
  name: "formCategory",
  props: ["id", "name"],
  computed: {
    reload() {
      this.fetch();
    },
  },
  data: () => ({
    model: {
      name: "",
    },
    message: "",
    mode: "",
    loadingBtn: false,
    textSnackbar: "",
    snackbar: false,
  }),
  methods: {
    close(message) {
      this.model.name = "";
      this.$emit("close", message);
    },
    fetch() {
      this.mode = "Add";
      if (this.id != "") {
        this.mode = "Edit";
        this.model.name = this.name;
      }
    },
    async proses() {
      this.loadingBtn = true;
      if (this.id != "") {
        try {
          await axios.put("http://localhost:1231/kategori/" + this.id, {
            name: this.model.name,
          });
          this.message = "Update Category Success";
          this.close(this.message);
        } catch (e) {
          this.textSnackbar = e.response.data.message;
          this.snackbar = true;
        }
      } else {
        try {
          await axios.post("http://localhost:1231/kategori", {
            name: this.model.name,
          });
          this.message = "Add Category Success";
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
