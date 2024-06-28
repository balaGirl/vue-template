import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import Layout from "@/layout";
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = to.meta.title || "vue Admin Template";

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasGetRoleList = store.getters.roleList.length;
      if (hasGetRoleList) {
        next();
      } else {
        try {
          // 获取权限列表
          const roles = await store.dispatch("user/getInfo");
          // 将获得的权限列表，组装成router需要的类型
          const routes = filterASyncRoutes(roles);
          routes.forEach((item) => {
            router.options.routes.push(item);
            router.addRoute(item);
          });
          router.addRoute({ path: "*", redirect: "/404", hidden: true });
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error({
            message: error || "Has Error",
          });
          console.log("error: ", error);
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

// 路由过滤   遍历路由 转换为组件对象和路径
function filterASyncRoutes(data) {
  const routes = data.filter((item) => {
    if (item["component"] === "Layout") {
      item["component"] = Layout;
    } else {
      item["component"] = loadView(item.component);
    }
    // 路由递归，转换组件对象和路径
    if (item.children && item.children.length > 0) {
      item.children = filterASyncRoutes(item.children);
    }
    return true;
  });
  return routes;
}

function loadView(view) {
  return () => import(`@/views${view}`);
  // babel.config.js中配置'plugins': ['dynamic-import-node']，要用此方法
  // return (resolve) => require([`@/views${view}`], resolve);
}
router.afterEach(() => {
  NProgress.done();
});
