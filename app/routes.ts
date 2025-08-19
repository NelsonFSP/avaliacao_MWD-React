import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/login.tsx"),
    route('users', 'pages/users/list.tsx'),
] satisfies RouteConfig;
