import { LoginComponent } from "./pages/login/login.component";
import { ImageComponent } from "./pages/image/image.component";
import { TabComponent } from "./pages/tabs/tab.component";
import { HomeComponent } from "./pages/tabs/home/home.component";
import { SearchComponent } from "./pages/tabs/search/search.component";
import { GalleryComponent } from "./pages/tabs/gallery/gallery.component";
import { NotificationComponent } from "./pages/tabs/notification/notification.comonent";
import { ProfileComponent } from "./pages/tabs/profile/profile.component";
import { EventComponent } from "./pages/event/event.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "image", component: ImageComponent },
  //{ path: "event", component: EventComponent },
  { path: "tab", component: TabComponent, children: [
    { path: "home", component: HomeComponent, outlet: 'homeoutlet'},
    { path: "search", component: SearchComponent, outlet: 'searchoutlet'},
    { path: "gallery", component: GalleryComponent, outlet: 'galleryoutlet'},
    { path: "notification", component: NotificationComponent, outlet: 'notificationoutlet'},
    { path: "profile", component: ProfileComponent, outlet: 'profileoutlet'}
  ]}
  
];

export const navigatableComponents = [
  LoginComponent,
  ImageComponent,
  //EventComponent,
  TabComponent,
  HomeComponent,
  SearchComponent,
  GalleryComponent,
  NotificationComponent,
  ProfileComponent
];