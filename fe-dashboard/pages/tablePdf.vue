<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Tanggal</th>
          <th class="text-left">Order Id</th>
          <th class="text-left">Username</th>
          <th class="text-left">Nominal</th>
          <th class="text-left">Status</th>
          <th class="text-left">Status Midtrans</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in table" :key="item.order_id">
          <td>{{ item.tanggal }}</td>
          <td>{{ item.order_id }}</td>
          <td>{{ item.users.username }}</td>
          <td>Rp {{ formatPrice(item.gross_amount) }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.payment_details.transaction_status }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["table"],
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
