<template>
  <div>
    <vs-switch
      v-model="dark"
      icon-pack="bx"
      vs-icon-off="bx-sun"
      vs-icon-on="bx-moon"
      @change="changeTheme"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      dark: false,
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapState(["general"]),
  },
  created() {
    var dark = localStorage.getItem("dark");
    if (JSON.parse(dark)) {
      this.dark = true;
    } else {
      this.dark = false;
    }
  },
  mounted() {
    this.changeTheme();
    this.$vs.theme({
      primary: this.general.primary,
      light_primary: this.general.light_primary,
      success: this.general.success,
      danger: this.general.danger,
      warning: this.general.warning,
    });
  },
  methods: {
    changeTheme() {
      var mode = this.dark ? "dark" : "light";
      var theme = this.getTheme(mode);
      this.setTheme(theme);
      localStorage.setItem("dark", this.dark);
    },
    setTheme(theme) {
      this.$vs.theme({
        theme: theme.theme_1,
        theme2: theme.theme_2,
        theme3: theme.theme_3,
        gray2: theme.gray2,
        gray: theme.gray,
        main_bg: theme.main_bg,
        input: theme.input,
        dark: theme.dark,
      });
    },
  },
};
</script>
