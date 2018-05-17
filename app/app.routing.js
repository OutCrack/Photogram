"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./pages/login/login.component");
var image_component_1 = require("./pages/new-image/image.component");
var tab_component_1 = require("./pages/tabs/tab.component");
var home_component_1 = require("./pages/tabs/home/home.component");
var search_component_1 = require("./pages/tabs/search/search.component");
var gallery_component_1 = require("./pages/tabs/gallery/gallery.component");
var event_gallery_component_1 = require("./pages/tabs/event.gallery/event.gallery.component");
var profile_component_1 = require("./pages/tabs/profile/profile.component");
var event_new_component_1 = require("./pages/event/event-new/event-new.component");
var invitation_1 = require("./pages/invitation/invitation");
var album_component_1 = require("./pages/album/newAlbum/album.component");
var album_view_1 = require("./pages/album/albumView/album.view");
var photo_view_1 = require("./pages/photo-view/photo-view");
var event_view_1 = require("./pages/event/event.view/event.view");
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "image", component: image_component_1.ImageComponent },
    { path: "image/:albumId", component: image_component_1.ImageComponent },
    { path: "invitation", component: invitation_1.InvitationComponent },
    { path: "newEvent", component: event_new_component_1.NewEventComponent },
    { path: "newAlbum", component: album_component_1.AlbumComponent },
    { path: "albumView/:albumId", component: album_view_1.AlbumViewComponent },
    { path: "photoView", component: photo_view_1.PhotoViewComponent },
    { path: "eventView", component: event_view_1.EventViewComponent },
    { path: "tab", component: tab_component_1.TabComponent, children: [
            { path: "home", component: home_component_1.HomeComponent, outlet: 'homeoutlet' },
            { path: "search", component: search_component_1.SearchComponent, outlet: 'searchoutlet' },
            { path: "gallery", component: gallery_component_1.GalleryComponent, outlet: 'galleryoutlet' },
            { path: "eventGallery", component: event_gallery_component_1.EventGalleryComponent, outlet: 'eventoutlet' },
            { path: "profile", component: profile_component_1.ProfileComponent, outlet: 'profileoutlet' }
        ] },
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    image_component_1.ImageComponent,
    event_new_component_1.NewEventComponent,
    invitation_1.InvitationComponent,
    tab_component_1.TabComponent,
    home_component_1.HomeComponent,
    search_component_1.SearchComponent,
    gallery_component_1.GalleryComponent,
    event_gallery_component_1.EventGalleryComponent,
    profile_component_1.ProfileComponent,
    album_component_1.AlbumComponent,
    album_view_1.AlbumViewComponent,
    photo_view_1.PhotoViewComponent,
    event_view_1.EventViewComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUErRDtBQUMvRCxxRUFBbUU7QUFDbkUsNERBQTBEO0FBQzFELG1FQUFpRTtBQUNqRSx5RUFBdUU7QUFDdkUsNEVBQTBFO0FBQzFFLDhGQUEyRjtBQUMzRiw0RUFBMEU7QUFDMUUsbUZBQWdGO0FBQ2hGLDREQUFvRTtBQUNwRSwwRUFBd0U7QUFDeEUsaUVBQXdFO0FBQ3hFLDREQUFtRTtBQUNuRSxrRUFBeUU7QUFFNUQsUUFBQSxNQUFNLEdBQUc7SUFDcEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQ3ZDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUcsU0FBUyxFQUFFLGdDQUFjLEVBQUM7SUFDckQsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFHLFNBQVMsRUFBRSxnQ0FBbUIsRUFBQztJQUN0RCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHVDQUFpQixFQUFFO0lBQ2xELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRyxTQUFTLEVBQUUsZ0NBQWMsRUFBQztJQUMvQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsK0JBQWtCLEVBQUM7SUFDNUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSwrQkFBa0IsRUFBQztJQUNuRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLCtCQUFrQixFQUFDO0lBQ25ELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsNEJBQVksRUFBRSxRQUFRLEVBQUU7WUFDaEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUM7WUFDL0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxrQ0FBZSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUM7WUFDckUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFDO1lBQ3hFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsK0NBQXFCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQztZQUNoRixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLG9DQUFnQixFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUM7U0FDekUsRUFBQztDQUNILENBQUM7QUFFVyxRQUFBLHFCQUFxQixHQUFHO0lBQ25DLGdDQUFjO0lBQ2QsZ0NBQWM7SUFDZCx1Q0FBaUI7SUFDakIsZ0NBQW1CO0lBQ25CLDRCQUFZO0lBQ1osOEJBQWE7SUFDYixrQ0FBZTtJQUNmLG9DQUFnQjtJQUNoQiwrQ0FBcUI7SUFDckIsb0NBQWdCO0lBQ2hCLGdDQUFjO0lBQ2QsK0JBQWtCO0lBQ2xCLCtCQUFrQjtJQUNsQiwrQkFBa0I7Q0FDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJbWFnZUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL25ldy1pbWFnZS9pbWFnZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFRhYkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3RhYnMvdGFiLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3RhYnMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvdGFicy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgR2FsbGVyeUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3RhYnMvZ2FsbGVyeS9nYWxsZXJ5LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRXZlbnRHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvdGFicy9ldmVudC5nYWxsZXJ5L2V2ZW50LmdhbGxlcnkuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvdGFicy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBOZXdFdmVudENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2V2ZW50L2V2ZW50LW5ldy9ldmVudC1uZXcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJbnZpdGF0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaW52aXRhdGlvbi9pbnZpdGF0aW9uXCI7XG5pbXBvcnQgeyBBbGJ1bUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2FsYnVtL25ld0FsYnVtL2FsYnVtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWxidW1WaWV3Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvYWxidW0vYWxidW1WaWV3L2FsYnVtLnZpZXdcIjtcbmltcG9ydCB7IFBob3RvVmlld0NvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3Bob3RvLXZpZXcvcGhvdG8tdmlld1wiO1xuaW1wb3J0IHsgRXZlbnRWaWV3Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvZXZlbnQvZXZlbnQudmlldy9ldmVudC52aWV3XCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXMgPSBbXG4gIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCB9LFxuICB7IHBhdGg6IFwibG9naW5cIiwgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCB9LFxuICB7IHBhdGg6IFwiaW1hZ2VcIiwgY29tcG9uZW50OiBJbWFnZUNvbXBvbmVudCB9LFxuICB7IHBhdGg6IFwiaW1hZ2UvOmFsYnVtSWRcIiAsIGNvbXBvbmVudDogSW1hZ2VDb21wb25lbnR9LFxuICB7IHBhdGg6IFwiaW52aXRhdGlvblwiICwgY29tcG9uZW50OiBJbnZpdGF0aW9uQ29tcG9uZW50fSxcbiAgeyBwYXRoOiBcIm5ld0V2ZW50XCIsIGNvbXBvbmVudDogTmV3RXZlbnRDb21wb25lbnQgfSxcbiAgeyBwYXRoOiBcIm5ld0FsYnVtXCIgLCBjb21wb25lbnQ6IEFsYnVtQ29tcG9uZW50fSxcbiAgeyBwYXRoOiBcImFsYnVtVmlldy86YWxidW1JZFwiLCBjb21wb25lbnQ6IEFsYnVtVmlld0NvbXBvbmVudH0sXG4gIHsgcGF0aDogXCJwaG90b1ZpZXdcIiwgY29tcG9uZW50OiBQaG90b1ZpZXdDb21wb25lbnR9LFxuICB7IHBhdGg6IFwiZXZlbnRWaWV3XCIsIGNvbXBvbmVudDogRXZlbnRWaWV3Q29tcG9uZW50fSxcbiAgeyBwYXRoOiBcInRhYlwiLCBjb21wb25lbnQ6IFRhYkNvbXBvbmVudCwgY2hpbGRyZW46IFtcbiAgICB7IHBhdGg6IFwiaG9tZVwiLCBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQsIG91dGxldDogJ2hvbWVvdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwic2VhcmNoXCIsIGNvbXBvbmVudDogU2VhcmNoQ29tcG9uZW50LCBvdXRsZXQ6ICdzZWFyY2hvdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwiZ2FsbGVyeVwiLCBjb21wb25lbnQ6IEdhbGxlcnlDb21wb25lbnQsIG91dGxldDogJ2dhbGxlcnlvdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwiZXZlbnRHYWxsZXJ5XCIsIGNvbXBvbmVudDogRXZlbnRHYWxsZXJ5Q29tcG9uZW50LCBvdXRsZXQ6ICdldmVudG91dGxldCd9LFxuICAgIHsgcGF0aDogXCJwcm9maWxlXCIsIGNvbXBvbmVudDogUHJvZmlsZUNvbXBvbmVudCwgb3V0bGV0OiAncHJvZmlsZW91dGxldCd9XG4gIF19LFxuXTtcblxuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcbiAgTG9naW5Db21wb25lbnQsXG4gIEltYWdlQ29tcG9uZW50LFxuICBOZXdFdmVudENvbXBvbmVudCxcbiAgSW52aXRhdGlvbkNvbXBvbmVudCxcbiAgVGFiQ29tcG9uZW50LFxuICBIb21lQ29tcG9uZW50LFxuICBTZWFyY2hDb21wb25lbnQsXG4gIEdhbGxlcnlDb21wb25lbnQsXG4gIEV2ZW50R2FsbGVyeUNvbXBvbmVudCxcbiAgUHJvZmlsZUNvbXBvbmVudCxcbiAgQWxidW1Db21wb25lbnQsXG4gIEFsYnVtVmlld0NvbXBvbmVudCxcbiAgUGhvdG9WaWV3Q29tcG9uZW50LFxuICBFdmVudFZpZXdDb21wb25lbnRcbl07Il19