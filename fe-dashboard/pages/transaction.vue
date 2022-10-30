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
        </v-btn> </v-col
      ><v-spacer></v-spacer>
      <v-btn
        color="green darken-3"
        class="mt-4 mr-2 white--text"
        @click="generateExcel"
        rounded
      >
        Excel
        <v-icon right dark> mdi-download </v-icon>
      </v-btn>
      <v-btn
        color="red darken-3"
        class="mt-4 mr-6 white--text"
        @click="generatePdf"
        rounded
      >
        PDF
        <v-icon right dark> mdi-download</v-icon>
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
        <v-tooltip bottom v-if="item.status == 'Pesanan Sedang Di Proses'"
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="green darken-2"
              @click="updateStatus(item._id, 'Barang Sedang Dikirim')"
              ><v-icon>mdi-arrow-up-bold-box</v-icon></v-btn
            ></template
          ><span>Update Status</span></v-tooltip
        ><v-tooltip bottom v-if="item.status == 'Barang Sedang Dikirim'"
          ><template v-slot:activator="{ on }"
            ><v-btn
              class="mr-2"
              v-on="on"
              small
              icon
              rounded
              outlined
              color="red darken-2"
              @click="updateStatus(item._id, 'Pesanan Selesai')"
              ><v-icon>mdi-store-check-outline</v-icon></v-btn
            ></template
          ><span>Transaction Completed</span></v-tooltip
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

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"
      filename="report-pdf"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a5"
      pdf-orientation="landscape"
      pdf-content-width="100%"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <table-pdf :table="modal.table"></table-pdf>
      </section>
    </vue-html2pdf>
  </v-card>
</template>

<script>
import axios from "axios";
import DetailTransaction from "./detailTransaction.vue";
import VueHtml2pdf from "vue-html2pdf";
import exportFromJSON from "export-from-json";
import TablePdf from "./tablePdf";
import moment from "moment-timezone";
const dateToFormat = (date, format) => {
  if (date == "today") {
    date = new Date();
  }
  return moment(date).tz("Asia/Jakarta").locale("id").format(format);
};
export default {
  components: {
    DetailTransaction,
    VueHtml2pdf,
    TablePdf,
    exportFromJSON,
  },
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
      table: [],
      excel: [],
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
      this.modal.table = [];
      this.modal.excel = [];
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
          response.data.result.data[i].payment_details.transaction_status ==
          "settlement"
        ) {
          this.table.items.push(response.data.result.data[i]);
          this.modal.table.push(response.data.result.data[i]);
          this.modal.excel.push({
            Tanggal: "tgl " + response.data.result.data[i].tanggal,
            "Order Id": "id " + response.data.result.data[i].order_id,
            Username: response.data.result.data[i].users.username,
            Nominal:
              "Rp " +
              this.formatPrice(response.data.result.data[i].gross_amount),
            Status: response.data.result.data[i].status,
            "Status Midtrans":
              response.data.result.data[i].payment_details.transaction_status,
          });
        }
      }
      this.table.items = this.table.items.reverse();
      this.modal.table = this.modal.table.reverse();
      this.modal.excel = this.modal.excel.reverse();
      this.table.loading = false;
    },
    reset() {
      this.filter.tgl1 = dateToFormat("today", "YYYY-MM-DD");
      this.filter.tgl2 = dateToFormat("today", "YYYY-MM-DD");
      this.fetch();
    },
    async updateStatus(id, status) {
      try {
        const { data } = await axios.put(
          "http://localhost:1233/transaction/" + id,
          { status: status }
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

    generatePdf() {
      if (this.modal.table.length == 0) {
        this.textSnackbar = "Tidak ada data";
        return (this.snackbar = true);
      }
      this.$refs.html2Pdf.generatePdf();
    },
    generateExcel() {
      if (this.modal.table.length == 0) {
        this.textSnackbar = "Tidak ada data";
        return (this.snackbar = true);
      }
      const data = this.modal.excel;
      const fileName = "report-excel";
      const exportType = exportFromJSON.types.xls;

      if (data) exportFromJSON({ data, fileName, exportType });
    },
  },
};
</script>
