import Dashboard from '../app/dashboard/page';
import React from "react";

export interface RouteType {
  path: string;
  component: React.ComponentType<any>;
  exact?: true;
}

const routes: RouteType[] = [
  { path: '/dashboard', component: Dashboard },
];

export default routes;
