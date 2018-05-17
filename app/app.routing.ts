import { LoginComponent } from "./pages/login/login.component";
import { ImageComponent } from "./pages/new-image/image.component";
import { TabComponent } from "./pages/tabs/tab.component";
import { HomeComponent } from "./pages/tabs/home/home.component";
import { SearchComponent } from "./pages/tabs/search/search.component";
import { GalleryComponent } from "./pages/tabs/gallery/gallery.component";
import { EventGalleryComponent } from "./pages/tabs/event.gallery/event.gallery.component";
import { ProfileComponent } from "./pages/tabs/profile/profile.component";
import { NewEventComponent } from "./pages/event/event-new/event-new.component";
import { InvitationComponent } from "./pages/invitation/invitation";
import { AlbumComponent } from "./pages/album/newAlbum/album.component";
import { AlbumViewComponent } from "./pages/album/albumView/album.view";
import { PhotoViewComponent } from "./pages/photo-view/photo-view";
import { EventViewComponent } from "./pages/event/event.view/event.view";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "image", component: ImageComponent },
  { path: "image/:albumId" , component: ImageComponent},
  { path: "invitation" , component: InvitationComponent},
  { path: "newEvent", component: NewEventComponent },
  { path: "newAlbum" , component: AlbumComponent},
  { path: "albumView/:albumId", component: AlbumViewComponent},
  { path: "photoView", component: PhotoViewComponent},
  { path: "eventView", component: EventViewComponent},
  { path: "tab", component: TabComponent, children: [
    { path: "home", component: HomeComponent, outlet: 'homeoutlet'},
    { path: "search", component: SearchComponent, outlet: 'searchoutlet'},
    { path: "gallery", component: GalleryComponent, outlet: 'galleryoutlet'},
    { path: "eventGallery", component: EventGalleryComponent, outlet: 'eventoutlet'},
    { path: "profile", component: ProfileComponent, outlet: 'profileoutlet'}
  ]},
];

export const navigatableComponents = [
  LoginComponent,
  ImageComponent,
  NewEventComponent,
  InvitationComponent,
  TabComponent,
  HomeComponent,
  SearchComponent,
  GalleryComponent,
  EventGalleryComponent,
  ProfileComponent,
  AlbumComponent,
  AlbumViewComponent,
  PhotoViewComponent,
  EventViewComponent
];