<template>
  <div id="scrollBtn">
    <a
      href="#section2"
      v-smooth-scroll="{
        duration: 1000,
        updateHistory: false,
      }"
      ><span></span
    ></a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#scrollBtn a {
  padding-top: 60px;
}
div#scrollBtn {
  position: absolute;
  width: 100%;
  margin-top: -80px;
  z-index: 100;
  height: 5px;
  left: 0px;
  right: 0px;
}
#scrollBtn a span {
  position: absolute;
  top: 0;
  left: 50%;
  width: 30px;
  height: 50px;
  margin-left: -15px;
  border: 2px solid #fff;
  border-radius: 50px;
  box-sizing: border-box;
}
#scrollBtn a span::before {
  position: absolute;
  top: 10px;
  left: 50%;
  content: "";
  width: 6px;
  height: 6px;
  margin-left: -3px;
  background-color: #fff;
  border-radius: 100%;
  -webkit-animation: sdb10 2s infinite;
  animation: sdb10 2s infinite;
  box-sizing: border-box;
}
@-webkit-keyframes sdb10 {
  0% {
    -webkit-transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    -webkit-transform: translate(0, 20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes sdb10 {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    transform: translate(0, 20px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
