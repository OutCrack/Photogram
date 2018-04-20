"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./pages/login/login.component");
var image_component_1 = require("./pages/image/image.component");
var tab_component_1 = require("./pages/tabs/tab.component");
var home_component_1 = require("./pages/tabs/home/home.component");
var search_component_1 = require("./pages/tabs/search/search.component");
var gallery_component_1 = require("./pages/tabs/gallery/gallery.component");
var notification_comonent_1 = require("./pages/tabs/notification/notification.comonent");
var profile_component_1 = require("./pages/tabs/profile/profile.component");
exports.routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "image", component: image_component_1.ImageComponent },
    //{ path: "event", component: EventComponent },
    { path: "tab", component: tab_component_1.TabComponent, children: [
            { path: "home", component: home_component_1.HomeComponent, outlet: 'homeoutlet' },
            { path: "search", component: search_component_1.SearchComponent, outlet: 'searchoutlet' },
            { path: "gallery", component: gallery_component_1.GalleryComponent, outlet: 'galleryoutlet' },
            { path: "notification", component: notification_comonent_1.NotificationComponent, outlet: 'notificationoutlet' },
            { path: "profile", component: profile_component_1.ProfileComponent, outlet: 'profileoutlet' }
        ] }
];
exports.navigatableComponents = [
    login_component_1.LoginComponent,
    image_component_1.ImageComponent,
    //EventComponent,
    tab_component_1.TabComponent,
    home_component_1.HomeComponent,
    search_component_1.SearchComponent,
    gallery_component_1.GalleryComponent,
    notification_comonent_1.NotificationComponent,
    profile_component_1.ProfileComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlFQUErRDtBQUMvRCxpRUFBK0Q7QUFDL0QsNERBQTBEO0FBQzFELG1FQUFpRTtBQUNqRSx5RUFBdUU7QUFDdkUsNEVBQTBFO0FBQzFFLHlGQUF3RjtBQUN4Riw0RUFBMEU7QUFHN0QsUUFBQSxNQUFNLEdBQUc7SUFDcEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQ3ZDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7SUFDNUMsK0NBQStDO0lBQy9DLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsNEJBQVksRUFBRSxRQUFRLEVBQUU7WUFDaEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSw4QkFBYSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUM7WUFDL0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxrQ0FBZSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUM7WUFDckUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFDO1lBQ3hFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsNkNBQXFCLEVBQUUsTUFBTSxFQUFFLG9CQUFvQixFQUFDO1lBQ3ZGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBQztTQUN6RSxFQUFDO0NBRUgsQ0FBQztBQUVXLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsZ0NBQWM7SUFDZCxnQ0FBYztJQUNkLGlCQUFpQjtJQUNqQiw0QkFBWTtJQUNaLDhCQUFhO0lBQ2Isa0NBQWU7SUFDZixvQ0FBZ0I7SUFDaEIsNkNBQXFCO0lBQ3JCLG9DQUFnQjtDQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IEltYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaW1hZ2UvaW1hZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy90YWJzL3RhYi5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy90YWJzL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNlYXJjaENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3RhYnMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEdhbGxlcnlDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy90YWJzL2dhbGxlcnkvZ2FsbGVyeS5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3RhYnMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5jb21vbmVudFwiO1xuaW1wb3J0IHsgUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3RhYnMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRXZlbnRDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ldmVudC9ldmVudC5jb21wb25lbnRcIjtcblxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcbiAgeyBwYXRoOiBcIlwiLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogXCJsb2dpblwiLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogXCJpbWFnZVwiLCBjb21wb25lbnQ6IEltYWdlQ29tcG9uZW50IH0sXG4gIC8veyBwYXRoOiBcImV2ZW50XCIsIGNvbXBvbmVudDogRXZlbnRDb21wb25lbnQgfSxcbiAgeyBwYXRoOiBcInRhYlwiLCBjb21wb25lbnQ6IFRhYkNvbXBvbmVudCwgY2hpbGRyZW46IFtcbiAgICB7IHBhdGg6IFwiaG9tZVwiLCBjb21wb25lbnQ6IEhvbWVDb21wb25lbnQsIG91dGxldDogJ2hvbWVvdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwic2VhcmNoXCIsIGNvbXBvbmVudDogU2VhcmNoQ29tcG9uZW50LCBvdXRsZXQ6ICdzZWFyY2hvdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwiZ2FsbGVyeVwiLCBjb21wb25lbnQ6IEdhbGxlcnlDb21wb25lbnQsIG91dGxldDogJ2dhbGxlcnlvdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwibm90aWZpY2F0aW9uXCIsIGNvbXBvbmVudDogTm90aWZpY2F0aW9uQ29tcG9uZW50LCBvdXRsZXQ6ICdub3RpZmljYXRpb25vdXRsZXQnfSxcbiAgICB7IHBhdGg6IFwicHJvZmlsZVwiLCBjb21wb25lbnQ6IFByb2ZpbGVDb21wb25lbnQsIG91dGxldDogJ3Byb2ZpbGVvdXRsZXQnfVxuICBdfVxuICBcbl07XG5cbmV4cG9ydCBjb25zdCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgPSBbXG4gIExvZ2luQ29tcG9uZW50LFxuICBJbWFnZUNvbXBvbmVudCxcbiAgLy9FdmVudENvbXBvbmVudCxcbiAgVGFiQ29tcG9uZW50LFxuICBIb21lQ29tcG9uZW50LFxuICBTZWFyY2hDb21wb25lbnQsXG4gIEdhbGxlcnlDb21wb25lbnQsXG4gIE5vdGlmaWNhdGlvbkNvbXBvbmVudCxcbiAgUHJvZmlsZUNvbXBvbmVudFxuXTsiXX0=