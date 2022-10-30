<template>
  <v-card class="mt-3">
    <v-row class="mb-md-0 mb-sm-2">
      <v-col class="ml-2" md="3" sm="12">
        <v-text-field
          v-model="filter.name"
          placeholder="Product Code"
          label="Product Code"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="pl-md-1" md="3" sm="12"
        ><v-select
          v-model="filter.category"
          :items="category"
          item-text="name"
          item-value="_id"
          label="Category"
          outlined
          dense
        ></v-select
      ></v-col>
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
        @click="modal.showModalAdd = true"
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
              @click="getData(item._id, 1)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            ></template
          ><span>Edit Data</span></v-tooltip
        ><v-tooltip v-if="!item.realease && !item.newRealease" bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="blue darken-2"
              @click="updateRelease(item, 'newRelease')"
              ><v-icon>mdi-arrow-up-bold-box </v-icon></v-btn
            ></template
          ><span> Set New Release Product </span></v-tooltip
        ><v-tooltip v-if="item.realease && item.newRealease" bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="yellow darken-2"
              @click="updateRelease(item, 'release')"
              ><v-icon>mdi-arrow-right-bold-box </v-icon></v-btn
            ></template
          ><span> Set Our Product </span></v-tooltip
        ><v-tooltip v-if="item.realease && !item.newRealease" bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="orange darken-2"
              @click="updateRelease(item, 'notRelease')"
              ><v-icon>mdi-arrow-down-bold-box </v-icon></v-btn
            ></template
          ><span> Set Not Release Product </span></v-tooltip
        ><v-tooltip bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="blue darken-2"
              @click="getData(item._id, 2)"
              ><v-icon>mdi-receipt-outline</v-icon></v-btn
            ></template
          ><span>Detail Data</span></v-tooltip
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
                modal.id = item._id;
                modal.name = item.name;
                modal.showModalDelete = true;
              "
              ><v-icon>mdi-delete</v-icon></v-btn
            ></template
          ><span>Delete Data</span></v-tooltip
        > </template
      ><template v-slot:[`item.price`]="{ item }"
        >Rp {{ formatPrice(item.price) }}</template
      ><template v-slot:[`item.realease`]="{ item }">{{
        item.realease
          ? item.newRealease
            ? "New Release"
            : "Our Product"
          : "Not Release "
      }}</template>
    </v-data-table>
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
      v-model="modal.showModalAdd"
      persistent
      :scrollable="false"
      width="840"
      ><add-form @close="closeModal" :mode="'Add'"></add-form
    ></v-dialog>
    <v-dialog
      v-model="modal.showModalEdit"
      persistent
      :scrollable="false"
      width="840"
      ><edit-form
        @close="closeModal"
        :mode="'Edit'"
        :id="modal.id"
        :kode="detail.kode"
        :name="detail.name"
        :category="detail.category"
        :price="detail.price"
        :stock="detail.stock"
        :size="detail.size"
        :tags="detail.tags"
        :description="detail.description"
        :release="detail.release"
        :statusNewRealease="detail.newRelease"
        :p1="detail.p1"
        :p2="detail.p2"
        :p3="detail.p3"
      ></edit-form
    ></v-dialog>
    <v-dialog
      v-model="modal.showModalDetail"
      persistent
      width="840"
      :scrollable="false"
      ><detail-product
        @close="closeModal"
        :kode="detail.kode"
        :name="detail.name"
        :category="detail.category"
        :price="detail.price"
        :stock="detail.stock"
        :size="detail.size"
        :tags="detail.tags"
        :description="detail.description"
        :release="detail.release"
        :p1="detail.p1"
        :p2="detail.p2"
        :p3="detail.p3"
      ></detail-product
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
import editForm from "./formProduct.vue";
import addForm from "./formProduct.vue";
import DetailProduct from "./detailProduct.vue";
export default {
  layout: "default",
  components: { editForm, addForm, DetailProduct },
  data: () => ({
    table: {
      headers: [
        {
          text: "Product Code",
          value: "kode",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Name",
          value: "name",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Status",
          value: "realease",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Category",
          value: "categori.name",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Price",
          value: "price",
          divider: true,
          class: "grey white--text",
        },
        { text: "Action", value: "action", class: "grey white--text" },
      ],
      items: [],
      loading: false,
    },
    filter: { name: "", category: "" },
    modal: {
      showModalDelete: false,
      showModalEdit: false,
      showModalAdd: false,
      showModalDetail: false,
      id: "",
      data: "",
      name: "",
    },
    detail: {
      kode: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      size: "",
      tags: "",
      description: "",
      release: "",
      newRelease: "",
      p1: "",
      p2: "",
      p3: "",
    },
    snackbar: false,
    textSnackbar: "",
    category: [],
  }),
  mounted() {
    this.cekAuth();
    this.fetch();
    this.getCategory();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    cekAuth() {
      if (!localStorage.getItem("idUser")) {
        this.$router.push("/login");
      }
    },
    async fetch() {
      this.table.loading = true;
      let link = "http://localhost:1231/produk";
      if (this.filter.name != "") {
        link = link + "?kode=" + this.filter.name;
      }
      if (this.filter.category != "") {
        if (this.filter.name != "") {
          link = link + "&categori=" + this.filter.category;
        } else {
          link = link + "?categori=" + this.filter.category;
        }
      }
      let response = await axios.get(link);
      this.table.items = response.data.result.data.reverse();
      this.table.loading = false;
    },
    reset() {
      this.filter.name = "";
      this.filter.category = "";
      this.fetch();
    },
    closeModal(message) {
      (this.modal.showModalEdit = false),
        (this.modal.showModalAdd = false),
        (this.modal.showModalDetail = false);
      if (message != null) {
        this.textSnackbar = message;
        this.snackbar = true;
      }
      this.modal.id = "";
      this.detail = {
        kode: "",
        name: "",
        category: "",
        price: "",
        stock: "",
        size: "",
        tags: "",
        description: "",
        release: "",
        p1: "",
        p2: "",
        p3: "",
      };
      this.fetch();
    },
    async getCategory() {
      let response = await axios.get("http://localhost:1231/kategori");
      this.category = response.data.result.data;
    },
    async getData(id, mode) {
      try {
        let response = await axios.get("http://localhost:1231/produk/" + id);
        if (mode == 1) {
          this.modal.showModalEdit = true;
          this.detail.category = response.data.result.data.categori._id;
        } else {
          this.modal.showModalDetail = true;
          this.detail.category = response.data.result.data.categori.name;
        }

        this.modal.id = id;
        this.detail.kode = response.data.result.data.kode;
        this.detail.name = response.data.result.data.name;
        this.detail.price = response.data.result.data.price;
        this.detail.stock = response.data.result.data.stock;
        this.detail.size = response.data.result.data.size;
        this.detail.tags = response.data.result.data.tags;
        this.detail.description = response.data.result.data.description;
        this.detail.release = response.data.result.data.realease;
        this.detail.newRelease =
          response.data.result.data.newRealease == null
            ? false
            : response.data.result.data.newRealease;
        this.detail.p1 = response.data.result.data.photos.p1;
        this.detail.p2 = response.data.result.data.photos.p2;
        this.detail.p3 = response.data.result.data.photos.p3;
      } catch (error) {
        this.textSnackbar = error.response.data.message;
        this.snackbar = true;
      }
    },
    async delData() {
      try {
        await axios.delete("http://localhost:1231/produk/" + this.modal.id);
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

    async updateRelease(item, action) {
      let status, newRelease;
      if (action == "newRelease") {
        status = true;
        newRelease = true;
      }
      if (action == "release") {
        status = true;
        newRelease = false;
      }
      if (action == "notRelease") {
        status = false;
        newRelease = false;
      }
      try {
        await axios.put("http://localhost:1231/produk/" + item._id, {
          kode: item.kode,
          name: item.name,
          price: item.price,
          stock: item.stock,
          size: item.size,
          categori: item.categori._id,
          description: item.description,
          tags: item.tags,
          status: status,
          statusNewRealease: newRelease,
          photos: item.photos,
        });
        if (action == "notRelease") {
          this.textSnackbar = "Not Release Product Success";
        }
        if (action == "release") {
          this.textSnackbar = "Set Our Product Success";
        }
        if (action == "newRelease") {
          this.textSnackbar = "New Release Product Success";
        }
        this.snackbar = true;
      } catch (error) {
        if (action == "notRelease") {
          this.textSnackbar = "Not Release Product Failed";
        }
        if (action == "release") {
          this.textSnackbar = "Set Our Product Failed";
        }
        if (action == "newRelease") {
          this.textSnackbar = "New Release Product Failed";
        }
        this.snackbar = true;
      }
      this.fetch();
    },
  },
};
</script>
