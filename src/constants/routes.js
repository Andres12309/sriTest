const publicRoutes = {
  LOGIN: '/',
};

const privateRoutes = {
  HOME: '/home',
  LOGOUT: '/logout',
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;
