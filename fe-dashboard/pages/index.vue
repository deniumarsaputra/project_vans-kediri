<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6></v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "empty",
  mounted() {
    this.cekAuth();
  },
  methods: {
    cekAuth() {
      if (!localStorage.getItem("idUser")) {
        this.$router.push("/login");
      } else {
        this.$router.push("/transaction");
      }
    },
  },
};
</script>
