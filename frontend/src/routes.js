
import Index from "views/Index.js";
import Tables from "views/examples/Tables.js";


var routes = [
  {
    path: "/index",
    name: "YoMeControlon't",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/verificador",
    name: "Verificación de Recetas",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  
];
export default routes;
