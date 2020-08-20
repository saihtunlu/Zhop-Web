<template>
  <div class="row my-account pb-lg-3 mb-sm-4">
    <div class="col-lg-3 sm-hide mt-3 md-hide">
      <div class="my-account-sidebar p-3">
        <div
          class="sidebar-item py-2 px-3 big-radius flex-align-center pointer"
          @click="
            () => {
              $router.push({
                name: 'MyAccount',
                query: { index: tab.name },
              });
            }
          "
          v-for="tab in tabs"
          :key="tab.name"
          :class="{ 'active-sidebar-item': tab.name === selectedTab }"
        >
          <div v-shared-element:[1000] class="bg-overlay" v-if="tab.name === selectedTab"></div>
          <div style="z-index:10" class="flex-align-center">
            <vs-icon :icon="tab.icon" icon-pack="bx" class="mr-3" />
            <p>{{ tab.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-9 mt-3">
      <div class="p-2 p-sm-0">
        <Dashboard class="fadein" @setTab="setTab" v-if="selectedTab === 'Dashboard'" />
        <myOrders class="fadein" @setTab="setTab" v-if="selectedTab === 'My Orders'" />
        <wishlist class="fadein" @setTab="setTab" v-if="selectedTab === 'Wishlist'" />
        <Address class="fadein" @setTab="setTab" v-if="selectedTab === 'Address'" />
        <setting class="fadein" @setTab="setTab" v-if="selectedTab === 'Setting'" />
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "../constants/tabs";
import Dashboard from "../components/dashboard";
import myOrders from "../components/myOrder";
import wishlist from "../components/wishlist";
import Address from "../components/address";
import setting from "../components/setting";

import { mapState } from "vuex";
export default {
  created() {
    window.scrollTo(0, 0);
    this.$store.commit("setActiveIndex", this.$route.meta.index);
    this.selectedTab = this.$route.query.index
      ? this.$route.query.index
      : "Dashboard";
  },
  data() {
    return {
      selectedTab: "Dashboard",
      tabs: tabs,
    };
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  components: {
    Dashboard,
    Address,
    wishlist,
    myOrders,
    setting,
  },
  methods: {
    setTab(data) {
      this.$emit("showTab", data);
    },
  },
};
</script>

<style>
.bg-overlay {
  background: rgb(var(--vs-primary));
  width: 260px;
  margin-left: -1rem;
  height: 40px;
  position: absolute;
  z-index: 0;
  border-radius: 30px;
  box-shadow: 0px 4px 25px -8px rgb(var(--vs-primary), 0.2);
}
.my-account-sidebar {
  width: 290px;
  background: rgb(var(--vs-theme));
  margin: 10px;
  border-radius: 30px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
}
.sidebar-item.active-sidebar-item {
  /* background: rgb(var(--vs-primary)); */
  color: #fff;
  z-index: 100;
}
</style>
