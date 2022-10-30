<template>
  <v-card>
    <v-text-field class="d-none" v-model="reload"></v-text-field>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      {{ mode }} Product
      <v-spacer></v-spacer>
      <v-btn small icon @click="close(null)">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-row>
        <v-col md="6">
          <v-text-field
            v-model="model.kode"
            label="Product Code"
            placeholder="Product Code"
          ></v-text-field>
          <v-text-field
            v-model="model.name"
            label="Name"
            placeholder="Name"
          ></v-text-field>
          <v-text-field
            v-model="model.price"
            label="Price"
            placeholder="Price"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="model.stock"
            label="Stock"
            placeholder="10"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="model.size"
            label="Size"
            placeholder="40"
            type="number"
          ></v-text-field>
          <v-select
            v-model="model.category"
            :items="itemCategory"
            item-text="name"
            item-value="_id"
            label="Category"
            placeholder="Category"
          ></v-select>
        </v-col>
        <v-col md="6">
          <v-text-field
            v-model="model.tags"
            label="Tags"
            placeholder="Tags"
          ></v-text-field>
          <v-textarea
            v-model="model.description"
            height="170"
            label="Description"
            placeholder="Description"
          ></v-textarea
          ><uploadcare
            v-if="
              model.photos.p1 == '' ||
              model.photos.p2 == '' ||
              model.photos.p3 == ''
            "
            publicKey="7107dae560248eea0194"
            @success="onSuccess"
            @error="onError"
          >
            <v-btn
              class="mt-6 white--text"
              width="150"
              rounded
              small
              color="green"
              ><v-icon>mdi-upload</v-icon> Image</v-btn
            ></uploadcare
          ></v-col
        >
      </v-row>
      <p
        v-if="
          model.photos.p1 != '' ||
          model.photos.p2 != '' ||
          model.photos.p3 != ''
        "
      >
        Photos
      </p>
      <v-row
        class="pt-3"
        v-if="
          model.photos.p1 != '' ||
          model.photos.p2 != '' ||
          model.photos.p3 != ''
        "
      >
        <div class="pa-3" v-if="model.photos.p1" style="position: relative">
          <v-btn
            class="right:0px; position:absolute;"
            x-small
            icon
            rounded
            color="red"
            @click="delPhoto(1)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-img max-width="100" class="ma-3" :src="model.photos.p1"> </v-img>
        </div>
        <div class="pa-3" v-if="model.photos.p2" style="position: relative">
          <v-btn
            class="right:0px; position:absolute;"
            x-small
            icon
            rounded
            color="red"
            @click="delPhoto(2)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-img max-width="100" class="ma-3" :src="model.photos.p2"></v-img>
        </div>
        <div class="pa-3" v-if="model.photos.p3" style="position: relative">
          <v-btn
            class="right:0px; position:absolute;"
            x-small
            icon
            rounded
            color="red"
            @click="delPhoto(3)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-img max-width="100" class="ma-3" :src="model.photos.p3"></v-img>
        </div>
      </v-row>
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
import Uploadcare from "uploadcare-vue";
export default {
  components: { Uploadcare },
  name: "formProduct",
  props: [
    "mode",
    "id",
    "kode",
    "name",
    "price",
    "stock",
    "size",
    "category",
    "description",
    "description",
    "tags",
    "release",
    "statusNewRealease",
    "p1",
    "p2",
    "p3",
  ],
  computed: {
    reload() {
      this.fetch();
      this.getCategory();
    },
  },
  data: () => ({
    model: {
      kode: "",
      name: "",
      price: "",
      stock: "",
      size: "",
      category: "",
      description: "",
      tags: "",
      isRelease: false,
      photos: {
        p1: "",
        p2: "",
        p3: "",
      },
    },
    itemCategory: [],
    message: "",
    mode: "",
    loadingBtn: false,
    textSnackbar: "",
    snackbar: false,
  }),
  methods: {
    close(message) {
      this.model.kode = "";
      this.model.name = "";
      this.model.price = "";
      this.model.stock = "";
      this.model.size = "";
      this.model.category = "";
      this.model.description = "";
      this.model.tags = "";
      this.model.photos.p1 = "";
      this.model.photos.p2 = "";
      this.model.photos.p3 = "";
      this.$emit("close", message);
    },
    fetch() {
      if (this.mode == "Edit") {
        this.model.kode = this.kode;
        this.model.name = this.name;
        this.model.price = this.price;
        this.model.stock = this.stock;
        this.model.size = this.size;
        this.model.category = this.category;
        this.model.description = this.description;
        this.model.tags = this.tags;
        this.model.isRelease = this.release;
        this.model.photos.p1 = this.p1;
        this.model.photos.p2 = this.p2;
        this.model.photos.p3 = this.p3;
      }
    },
    async proses() {
      this.loadingBtn = true;
      if (
        this.model.photos.p1 == "" ||
        this.model.photos.p2 == "" ||
        this.model.photos.p3 == ""
      ) {
        this.textSnackbar = "Upload 3 Photo";
        this.loadingBtn = false;
        this.snackbar = true;
        return false;
      }
      if (this.mode == "Edit") {
        try {
          await axios.put("http://localhost:1231/produk/" + this.id, {
            kode: this.model.kode,
            name: this.model.name,
            price: this.model.price,
            stock: this.model.stock,
            size: this.model.size,
            categori: this.model.category,
            description: this.model.description,
            tags: this.model.tags,
            status: this.model.isRelease,
            statusNewRealease: this.statusNewRealease,
            photos: this.model.photos,
          });
          this.message = "Update Product Success";
          this.close(this.message);
        } catch (e) {
          this.textSnackbar = e.response.data.message;
          this.snackbar = true;
        }
      } else {
        try {
          await axios.post("http://localhost:1231/produk", {
            kode: this.model.kode,
            name: this.model.name,
            price: this.model.price,
            stock: this.model.stock,
            size: this.model.size,
            categori: this.model.category,
            description: this.model.description,
            tags: this.model.tags,
            photos: this.model.photos,
          });
          this.message = "Add Product Success";
          this.close(this.message);
        } catch (e) {
          this.textSnackbar = e.response.data.message;
          this.snackbar = true;
        }
      }
      this.loadingBtn = false;
    },
    async getCategory() {
      let response = await axios.get("http://localhost:1231/kategori");
      this.itemCategory = response.data.result.data;
    },
    onSuccess(value) {
      if (this.model.photos.p1 == "") {
        this.model.photos.p1 = "https://ucarecdn.com/" + value.uuid + "/";
      } else if (this.model.photos.p2 == "") {
        this.model.photos.p2 = "https://ucarecdn.com/" + value.uuid + "/";
      } else if (this.model.photos.p3 == "") {
        this.model.photos.p3 = "https://ucarecdn.com/" + value.uuid + "/";
      }
    },
    onError() {
      console.log("error");
    },
    delPhoto(photos) {
      if (photos == 1) {
        this.model.photos.p1 = "";
      }
      if (photos == 2) {
        this.model.photos.p2 == "";
      }
      if (photos == 3) {
        this.model.photos.p3 = "";
      }
    },
  },
};
</script>
