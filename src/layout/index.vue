<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <Sidebar :class="sidebar.opened ? 'sidebar-container' : 'slidebar-min'" />
    <!-- 主体 -->
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script>
import AppMain from "./components/AppMain";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
}
.sidebar-container {
  flex: 0 0 $sideBarWidth;
  height: 100%;
}
.slidebar-min{
   flex: 0 0 $sideBarWidthMin;
  height: 100%;
}
.main-container {
  flex: 1 1 auto;
}
</style>
