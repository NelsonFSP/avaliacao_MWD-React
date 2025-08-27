import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("pages/login.tsx"),
    route('users', 'pages/users/list.tsx'),
    route('users/create', 'pages/users/create.tsx'),
    route('users/:id', 'pages/users/update.tsx'),
] satisfies RouteConfig
