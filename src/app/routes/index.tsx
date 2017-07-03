import { RouteConfig } from 'react-router-config';
import { Login, MinorLayout, Demo } from 'containers';

const routes: RouteConfig[] = [
  {
    component: MinorLayout,
    path: '/passport',
    routes: [
      {
        component: Login,
        path: '/passport/login'
      }
    ]
  },
  {
    component: Demo,
    path: '/demo'
  }
] as RouteConfig[];

export default routes;
