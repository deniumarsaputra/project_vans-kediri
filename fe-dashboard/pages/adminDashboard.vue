<template>
  <v-card class="mt-3">
    <v-row class="mb-md-0 mb-sm-2">
      <v-col class="ml-2 pr-md-1" md="3" sm="12">
        <v-text-field
          v-model="filter.username"
          placeholder="Username"
          label="Username"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pl-md-1" md="3" sm="5">
        <v-btn
          color="blue"
          class="mb-1 mt-1 white--text"
          @click="fetch"
          rounded
        >
          Search
          <v-icon right dark> mdi-magnify </v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="mb-1 mt-1 white--text"
          @click="reset"
          rounded
        >
          Reset
          <v-icon right dark> mdi-refresh</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-btn
        color="green"
        class="mt-4 mr-6 white--text"
        @click="modal.showModalForm = true"
        rounded
      >
        Add
        <v-icon right dark> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-data-table
      class="ml-2 mr-2"
      v-if="table.items.length > 0"
      :loading="table.loading"
      :headers="table.headers"
      :items="table.items"
      disable-sort
      ><template v-slot:[`item.action`]="{ item }">
        <v-tooltip bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="grey darken-2"
              @click="getData(item._id)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            ></template
          ><span>Edit Data</span></v-tooltip
        ><v-tooltip bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              v-on="on"
              small
              icon
              rounded
              outlined
              color="red darken-2"
              @click="
                modal.showModalDelete = true;
                modal.id = item._id;
                modal.name = item.username;
              "
              ><v-icon>mdi-delete</v-icon></v-btn
            ></template
          ><span>Delete Data</span></v-tooltip
        >
      </template></v-data-table
    >
    <p v-else class="text-center pb-6 title">Data Kosong</p>

    <v-dialog v-model="modal.showModalDelete" persistent max-width="290">
      <v-card>
        <v-card-title class="headline red white--text"
          >Delete Data</v-card-title
        >
        <v-card-text class="pt-5">Delete {{ modal.name }} ?</v-card-text>
        <v-card-text>Be Careful. Deleted data cannot be restored.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="modal.showModalDelete = false"
            >CANCEL</v-btn
          >
          <v-btn color="red lighten-1" text @click="delData">DELETE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="modal.showModalForm"
      persistent
      :scrollable="false"
      width="420"
      ><form-admin-dashboard
        @close="closeModal"
        :id="modal.id"
        :username="modal.username"
        :email="modal.email"
        :password="modal.password"
      ></form-admin-dashboard
    ></v-dialog>
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
import formAdminDashboard from "./formAdminDashboard.vue";
export default {
  components: { formAdminDashboard },
  layout: "default",
  data: () => ({
    filter: { username: "" },
    textSnackbar: "",
    snackbar: false,
    modal: {
      showModalForm: false,
      showModalDelete: false,
      id: "",
      username: "",
      email: "",
      password: "",
      name: "",
    },
    table: {
      headers: [
        {
          text: "Username",
          value: "username",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Email",
          value: "email",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Action",
          value: "action",
          class: "grey white--text",
        },
      ],
      items: [],
      loading: false,
    },
  }),
  mounted() {
    this.cekAuth();
    this.fetch();
  },
  methods: {
    cekAuth() {
      if (!localStorage.getItem("idUser")) {
        this.$router.push("/login");
      }
    },
    async fetch() {
      this.table.loading = true;
      let link = "http://localhost:1231/sysUser";
      if (this.filter.username != "") {
        link = link + "?username=" + this.filter.username;
      }
      let response = await axios.get(link);
      this.table.items = response.data.result.data;
      this.table.loading = false;
    },
    reset() {
      this.filter.username = "";
      this.fetch();
    },
    closeModal(message) {
      if (message != null) {
        this.textSnackbar = message;
        this.snackbar = true;
      }
      this.modal.showModalForm = false;
      this.modal.showModalDelete = false;
      this.modal.id = "";
      this.modal.username = "";
      this.modal.password = "";
      this.modal.email = "";
      this.modal.name = "";
      this.fetch();
    },
    async getData(id) {
      const { data } = await axios.get("http://localhost:2022/sysUser/" + id);
      this.modal.id = data.result.data._id;
      this.modal.username = data.result.data.username;
      this.modal.email = data.result.data.email;
      this.modal.password = data.result.data.password;
      this.modal.showModalForm = true;
    },
    async delData() {
      try {
        await axios.delete("http://localhost:2022/sysUser/" + this.modal.id);
        this.modal = {
          showModalDelete: false,
          id: "",
          name: "",
        };
        this.textSnackbar = "Delete Data Success";
        this.snackbar = true;
        this.fetch();
      } catch (e) {
        this.textSnackbar = e.response.data.message;
        this.snackbar = true;
      }
    },
  },
};
</script>
