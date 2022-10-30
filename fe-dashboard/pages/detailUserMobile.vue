<template>
  <v-card>
    <v-card-title class="headline grey lighten-2 grey--text text--darken-1">
      Detail User Mobile
      <v-spacer></v-spacer>
      <v-btn small icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card-title
    ><v-card-text class="pt-5 pb-0">
      <v-row>
        <v-col md="3">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Username</p>
          <p>No HP</p>
          <p>Email</p>
          <p>Status</p>
        </v-col>
        <v-col
          ><p>{{ data.fristname }}</p>
          <p>{{ data.lastname }}</p>
          <p>{{ data.username }}</p>
          <p>{{ data.nohp }}</p>
          <p>{{ data.email }}</p>
          <p>{{ data.isActive ? "Active" : "Not Active" }}</p></v-col
        >
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "detailUserMobile",
  props: ["data"],
  data: () => ({}),
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
