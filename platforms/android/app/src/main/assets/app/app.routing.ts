import { LoginComponent } from "./pages/login/login.component";
import { TabComponent } from "./pages/tabs/tab.component";
import { HomeComponent } from "./pages/tabs/home/home.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "tab", component: TabComponent },
  { path: "home", component: HomeComponent }
];

export const navigatableComponents = [
  LoginComponent,
  TabComponent,
  HomeComponent
];