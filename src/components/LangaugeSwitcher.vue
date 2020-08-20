<template>
  <vs-dropdown class="pointer" vs-custom-content vs-trigger-click>
    <a href.prevent>
      <img
        :src="selected.image"
        style="width:25px;height:15px;object-fit:cover;margin-top: 3px;"
        alt
      />
    </a>

    <vs-dropdown-menu>
      <vs-dropdown-item v-for="item in langs" @click="changeLang(item)" :key="item.value">
        <div class="flex-align-center">
          <img :src="item.image" class="mr-3" style="width:25px;height:15px;object-fit:cover" alt />
          <p>{{item.label}}</p>
        </div>
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
const langs = [
  {
    value: "mm",
    label: "မြန်မာ",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/320px-Flag_of_Myanmar.svg.png",
  },
  {
    value: "en",
    label: "English",
    image:
      "https://cdn10.bigcommerce.com/s-hhbbk/products/2194/images/43897/UnionJack__45568.1580477840.1280.1280.png",
  },
];
export default {
  data() {
    return {
      lang: "en",
      langs: langs,
      selected: langs[1],
    };
  },
  created() {
    var check = localStorage.getItem("lang");
    if (check) {
      this.$i18n.locale = check;
      this.lang = check;
      this.selected = langs.filter((data) => {
        return data.value === check;
      })[0];
    }
  },
  methods: {
    changeLang(data) {
      this.selected = data;
      this.lang = data.value;
      var lang = data.value;
      if (lang) {
        this.$i18n.locale = lang;
        localStorage.setItem("lang", lang);
      }
    },
  },
};
</script>
