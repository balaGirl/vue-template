<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <AppLink :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <i :class="`el-icon-${onlyOneChild.meta.icon}`"></i>
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </AppLink>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <i :class="`el-icon-${item.meta.icon}`"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="route in item.children"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(route.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: { AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      onlyOneChild: {},
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    // 解析路径
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
