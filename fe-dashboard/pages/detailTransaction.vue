<template>
  <v-card>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      Items Transaction
      <v-spacer></v-spacer>
      <v-btn small icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-data-table
        class="ml-2 mr-2"
        v-if="items.length > 0"
        :loading="table.loading"
        :headers="table.headers"
        :items="items"
        disable-sort
        ><template v-slot:[`item.price`]="{ item }"
          >Rp {{ formatPrice(item.price) }}</template
        ></v-data-table
      >
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "detailTransaction",
  props: ["items"],
  data: () => ({
    table: {
      loading: false,
      headers: [
        {
          text: "Name",
          value: "name",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Price",
          value: "price",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Quantity",
          value: "quantity",
          divider: true,
          class: "grey white--text",
        },
      ],
    },
  }),
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
