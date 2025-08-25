import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("components/MainLayout.tsx", [
    index("pages/DashboardPage.tsx"),
    route("simulator", "pages/SimulatorPage.tsx"),
    route("security", "pages/SecurityPage.tsx"),
    route("cleanliness", "pages/CleanlinessPage.tsx"),
    route("profile/:userId", "routes/profile.$userId.tsx"),
  ]),
] satisfies RouteConfig;
