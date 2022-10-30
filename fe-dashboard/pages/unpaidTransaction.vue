<template>
  <v-card class="mt-3">
    <v-row class="mb-md-0 mb-sm-2">
      <v-col class="ml-2 pr-md-1" md="2" sm="12">
        <v-text-field
          v-model="filter.tgl1"
          label="Dari"
          outlined
          dense
          @click.native="
            modal.picker = true;
            modal.pickerVal = filter.tgl1;
            modal.pickerEdited = 'tgl1';
          "
        ></v-text-field>
      </v-col>
      <v-col class="pl-md-2" md="2" sm="12">
        <v-text-field
          v-model="filter.tgl2"
          label="Sampai"
          outlined
          dense
          @click.native="
            modal.picker = true;
            modal.pickerVal = filter.tgl2;
            modal.pickerEdited = 'tgl2';
          "
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
    </v-row>
    <v-data-table
      class="ml-2 mr-2"
      v-if="table.items.length > 0"
      :loading="table.loading"
      :headers="table.headers"
      :items="table.items"
      disable-sort
      ><template v-slot:[`item.action`]="{ item }">
        <v-tooltip
          bottom
          v-if="item.payment_details.transaction_status != 'settlement'"
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="blue darken-2"
              @click="cekStatus(item.order_id)"
              ><v-icon>mdi-update</v-icon></v-btn
            ></template
          ><span>Cek Status</span></v-tooltip
        ><v-tooltip bottom
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="grey darken-2"
              @click="getItem(item._id)"
              ><v-icon>mdi-receipt-outline</v-icon></v-btn
            ></template
          ><span>Items Transaction</span></v-tooltip
        ></template
      ><template v-slot:[`item.gross_amount`]="{ item }"
        >Rp {{ formatPrice(item.gross_amount) }}</template
      ></v-data-table
    >
    <p v-else class="text-center pb-6 title">Data Kosong</p>
    <v-dialog
      v-model="modal.showModalDetail"
      persistent
      :scrollable="false"
      width="560"
      ><detail-transaction
        :items="modal.item"
        @close="
          modal.item = '';
          modal.showModalDetail = false;
          fetch;
        "
      ></detail-transaction
    ></v-dialog>
    <v-snackbar v-model="snackbar" top>
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="modal.picker" :scrollable="false" width="290px">
      <v-date-picker
        locale="id-id"
        v-model="modal.pickerVal"
        no-title
        @input="updPicker"
      ></v-date-picker>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import DetailTransaction from "./detailTransaction.vue";
import moment from "moment-timezone";
const dateToFormat = (date, format) => {
  if (date == "today") {
    date = new Date();
  }
  return moment(date).tz("Asia/Jakarta").locale("id").format(format);
};
export default {
  components: { DetailTransaction },
  layout: "default",
  data: () => ({
    filter: {
      tgl1: dateToFormat("today", "YYYY-MM-DD"),
      tgl2: dateToFormat("today", "YYYY-MM-DD"),
    },
    textSnackbar: "",
    snackbar: false,
    modal: {
      showModalDetail: false,
      item: "",
      picker: false,
      pickerVal: "",
      pickerEdited: "",
    },
    table: {
      headers: [
        {
          text: "Tanggal",
          value: "tanggal",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Order ID",
          value: "order_id",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Username",
          value: "users.username",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Nominal",
          value: "gross_amount",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Status",
          value: "status",
          divider: true,
          class: "grey white--text",
        },
        {
          text: "Status Midtrans",
          value: "payment_details.transaction_status",
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
      itemsPending: [],
      loading: false,
    },
  }),
  mounted() {
    this.cekAuth();
    this.fetch();
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
    updPicker() {
      this.filter[this.modal.pickerEdited] = this.modal.pickerVal;
      this.modal.pickerVal = "";
      this.modal.picker = false;
    },
    async fetch() {
      this.table.loading = true;
      this.table.items = [];
      let link = "http://localhost:1233/transaction";
      if (this.filter.tgl1 != "") {
        link = link + "?tgl1=" + this.filter.tgl1;
      }
      if (this.filter.tgl2 != "") {
        link = link + "&tgl2=" + this.filter.tgl2;
      }
      let response = await axios.get(link);
      for (let i = 0; i < response.data.result.data.length; i++) {
        if (
          response.data.result.data[i].payment_details.transaction_status !=
          "settlement"
        ) {
          this.table.items.push(response.data.result.data[i]);
        }
      }
      this.table.items = this.table.items.reverse();
      this.table.loading = false;
    },
    reset() {
      this.filter.tgl1 = dateToFormat("today", "YYYY-MM-DD");
      this.filter.tgl2 = dateToFormat("today", "YYYY-MM-DD");
      this.fetch();
    },
    async cekStatus(orderId) {
      try {
        const { data } = await axios.get(
          "http://localhost:1233/payment/status/" + orderId
        );
        this.fetch();
      } catch (error) {
        this.textSnackbar = error.response.data.message;
        this.snackbar = true;
      }
    },
    async getItem(id) {
      try {
        let response = await axios.get(
          "http://localhost:1233/transaction/" + id
        );
        this.modal.item = response.data.result.data.item_details;
        this.modal.showModalDetail = true;
      } catch (error) {
        this.textSnackbar = error.response.data.message;
        this.snackbar = true;
      }
    },
  },
};
</script>
