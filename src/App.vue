<template>
  <div id="app">
    <div v-if="isPageReady" class="container-fluid">
      <Nav />
      <vm-back-top :bottom="75" :right="18" :duration="1500" :timing="'ease'">
        <vs-button
          color="rgba(var(--vs-primary),0.7)"
          id="back_ro_top"
          type="filled"
          size="38px"
          radius
          icon-pack="bx"
          icon="bx-chevron-up"
        ></vs-button>
      </vm-back-top>
      <router-view
        :key="$route.fullPath"
        @showTab="show"
        class="router_view"
        id="padding-scroll-content"
      />
      <!-- <Footer /> -->
      <TabBar :showTab="showTab" />
      <!-- main footer  -->
      <div class="row">
        <div class="col-12 mainFooter flex-x-between base-padding mb-3">
          <p>
            COPYRIGHT ©2020
            <a href="#">Zhop</a>, All rights Reserved.
          </p>
          <p class="flex-align-center sm-hide">
            Hand-crafted & Made with
            <vs-icon icon="bx-heart" class="ml-2" color="danger" icon-pack="bx" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "./components/nav";
import TabBar from "./components/bottomBar";
import { mapState } from "vuex";
import { isMobile, isTablet } from "mobile-device-detect";
export default {
  data() {
    return {
      showTab: true,
      isSmall: isMobile || isTablet,
    };
  },
  computed: {
    ...mapState({
      general: "general",
      isPageReady: "isPageReady",
    }),
  },
  created() {
    this.$vs.loading({
      type: "corners",
    });
    this.$store.dispatch("getAllData");
    this.$store.dispatch("getCart");
    this.getUser();
  },
  mounted() {},
  watch: {
    isPageReady() {
      this.$vs.loading.close();
    },
  },
  components: {
    Nav,
    TabBar,
  },
  methods: {
    getUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.$store.commit("setCurrentUser", user);
        this.$store.dispatch("getUserFav");
        this.$store.dispatch("getUserAddress");
        this.$store.dispatch("getUserOrders");
      }
    },
    show(data) {
      this.showTab = data;
    },
  },
};
</script>
