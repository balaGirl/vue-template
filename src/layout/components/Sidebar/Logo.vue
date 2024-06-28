<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <div class="sidebar-logo">
        <img
          src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
          class="sidebar-logo"
        />
        <h1 v-if="!collapse" class="sidebar-title">Vue Admin Template</h1>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 300ms;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  .sidebar-logo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
  }

  .sidebar-title {
    margin-left: 12px;
    display: inline-block;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    vertical-align: middle;
  }
}
</style>
