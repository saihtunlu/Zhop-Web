<template>
  <div
    class="w-100 flex-around-center lg-hide"
    :style="`display:${showTab? '':'none'} !important;`"
    id="bottomTabBar"
  >
    <vs-icon
      :icon="tab.icon"
      icon-pack="bx"
      v-for="tab in tabs"
      class="bottomTab"
      :class="tab.index === activeIndex? 'activeTab':''"
      @click="changeTab(tab)"
      :key="tab.icon"
    />
    <cart />
  </div>
</template>

<script>
import cart from "./FloatCart";
const tabs = [
  {
    route: "Home",
    icon: "bx-home",
    index: 1,
  },
  {
    route: "Shop",
    icon: "bx-store",
    index: 2,
  },
  {
    route: "MyAccount",
    icon: "bx-user",
    index: 3,
  },
];
export default {
  props: {
    showTab: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tabs: tabs,
    };
  },
  computed: {
    activeIndex() {
      return this.$store.state.activeIndex;
    },
  },
  components: {
    cart,
  },
  methods: {
    changeTab(tab) {
      this.$store.commit("setActiveIndex", tab.index);
      this.$router.push({ name: tab.route });
    },
  },
};
</script>

<style >
div#bottomTabBar i {
  font-size: 22px !important;
}
div#bottomTabBar i {
  padding: 15px;
  border-radius: 15px;
}
.bottomTab.activeTab {
  background: rgb(var(--vs-primary));
  color: #fff;
}
div#bottomTabBar {
  position: fixed;
  z-index: 1000;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 60px;
  background: rgb(var(--vs-theme));
  box-shadow: 0px 0px 25px 0px rgb(0, 0, 0, 0.04);
}
</style>