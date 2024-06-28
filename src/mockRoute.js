const data = [
  {
    path: "/example",
    component: "Layout",
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "s-help" },
    children: [
      {
        path: "table",
        name: "Table",
        component: "/table/index",
        meta: { title: "Table" },
      },
      {
        path: "tree",
        name: "Tree",
        component: "/tree/index",
        meta: { title: "Tree" },
      },
    ],
  },
  {
    path: "/nested",
    component: "Layout",
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "s-opportunity",
    },
    children: [
      {
        path: "menu1",
        component: "/nested/menu1/index",
        name: "Menu1",
        meta: { title: "Menu1", icon: "s-custom" },
        children: [
          {
            path: "menu1-1",
            // component: () => import('@/views/nested/menu1/menu1-1'),
            component: "/nested/menu1/menu1-1",
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: "/nested/menu1/menu1-2",
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: "/nested/menu1/menu1-2/menu1-2-1",
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
            ],
          },
        ],
      },
      {
        path: "menu2",
        component: "/nested/menu2/index",
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },
];
export default data;
