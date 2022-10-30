<template>
  <v-app style="background-color: lightgrey">
    <v-navigation-drawer v-model="drawer" color="#000000cc" fixed app dark>
      <v-app-bar color="#000000cc"
        ><img src="../static/logo.png" height="36" />
        <span class="title pl-6">Vans Kediri</span></v-app-bar
      >
      <v-list dense expand shaped color="purle">
        <template v-for="(item, i) in items">
          <!--TYPE HEADER-->
          <template v-if="item.type == 'header'">
            <v-divider v-if="i != 0" class="mt-2" :key="i"></v-divider>
            <v-subheader
              class="mt-0 mb-0 pl-5 font-weight-medium"
              :key="item._id"
              >{{ item.title }}</v-subheader
            >
          </template>
          <!--TYPE MENU-->
          <template v-else>
            <v-list-group
              v-if="item.items"
              :key="item._id"
              :prepend-icon="item.icon"
              no-action="no-action"
            >
              <v-list-item class="pl-0" slot="activator">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <template v-for="subItem in item.items">
                <v-list-item
                  :key="subItem._id"
                  :to="subItem.to ? subItem.to : null"
                  ripple="ripple"
                  @click="changeTitle(subItem.title)"
                >
                  <v-list-item-action class="mt-1 mb-0" v-if="subItem.icon">
                    <v-icon>{{ subItem.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
            <v-list-item
              v-else
              :to="item.to ? item.to : null"
              ripple="ripple"
              rel="noopener"
              :key="item._id"
              @click="changeTitle(item.title)"
            >
              <v-list-item-action class="mt-1 mb-0" v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content class="mt-1 mb-0">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="#000000cc" fixed app>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <span class="title pl-3 white--text">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        origin="center center"
        :nudge-right="140"
        :nudge-bottom="10"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="30px" color="white">
              <span class="black--text font-weight-bold">{{ initial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in options"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer color="#000000cc" class="white--text" app>
      <v-spacer></v-spacer> &copy; {{ new Date().getFullYear() }} Deni Umar
      Saputra
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { type: "header", title: "Master Data" },
        {
          icon: "mdi-chart-areaspline-variant",
          title: "Transaction",
          items: [
            { title: "Transaction Paid", to: "/transaction" },
            { title: "Unpaid Transaction", to: "/unpaidTransaction" },
          ],
        },
        {
          icon: "mdi-shoe-sneaker",
          title: "Product",
          to: "/product",
        },
        {
          icon: "mdi-shape",
          title: "Category",
          to: "/category",
        },
        {
          icon: "mdi-clipboard-account",
          title: "Admin Dashboard",
          to: "/adminDashboard",
        },
        {
          icon: "mdi-account-group",
          title: "Users Mobile",
          to: "/usersMobile",
        },
      ],
      options: [
        {
          icon: "mdi-logout-variant",
          href: "/",
          title: "Logout",
          click: this.logout,
        },
      ],
      initial: "",
      title: "Transaction Paid",
    };
  },
  mounted() {
    this.getInitial();
  },
  methods: {
    getInitial() {
      if (localStorage.getItem("username")) {
        var name = localStorage.getItem("username").split(" ");
        this.initial = name[0].substring(0, 1).toUpperCase();

        if (name.length > 1) {
          this.initial += name[name.length - 1].substring(0, 1).toUpperCase();
        }
      }
    },
    logout() {
      localStorage.removeItem("idUser");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
    },
    changeTitle(string) {
      this.title = string;
    },
  },
};
</script>
