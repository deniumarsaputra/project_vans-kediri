<template>
  <v-card>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      Detail Product
      <v-spacer></v-spacer>
      <v-btn small icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-row>
        <v-col md="2">
          <p>Product Code</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Stock</p>
          <p>Size</p>
          <p>Tags</p>
          <p>Description</p>
          <p>Status</p>
          <p v-if="p1 != '' || p2 != '' || p3 != ''">Photos</p>
        </v-col>
        <v-col
          ><p class="font-weight-medium">{{ kode }}</p>
          <p class="font-weight-medium">{{ name }}</p>
          <p class="font-weight-medium">{{ category }}</p>
          <p class="font-weight-medium">{{ price }}</p>
          <p class="font-weight-medium">{{ stock }}</p>
          <p class="font-weight-medium">{{ size }}</p>
          <p class="font-weight-medium">{{ tags }}</p>
          <p class="font-weight-medium">{{ description }}</p>
          <p class="font-weight-medium">
            {{ release ? "Release" : "Not Release" }}
          </p>
          <v-row v-if="p1 != '' || p2 != '' || p3 != ''">
            <v-col v-if="p1 != ''" md="3">
              <v-img :src="p1" max-width="100" class="ma-3"></v-img>
            </v-col>
            <v-col v-if="p2 != ''" md="3">
              <v-img :src="p2" max-width="100" class="ma-3"></v-img>
            </v-col>
            <v-col v-if="p3 != ''" md="3">
              <v-img :src="p3" max-width="100" class="ma-3"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "detailProduct",
  props: [
    "kode",
    "name",
    "category",
    "price",
    "stock",
    "size",
    "tags",
    "description",
    "release",
    "p1",
    "p2",
    "p3",
  ],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
