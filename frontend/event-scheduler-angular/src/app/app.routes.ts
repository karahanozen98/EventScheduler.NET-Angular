import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'events' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                title: 'Login',
                data: {
                    hideSideBar: true,
                    hideFromMenu: true,
                },
                loadChildren: () => import('./auth/login/login.routes'),
            },
            {
                path: 'events',
                title: 'Events',
                canActivate: [AuthGuard],
                data: {
                    icon: 'tasks',
                    title: 'Events',
                },
                loadChildren: () => import('./protected/events/events.routes'),
            },
            {
                path: 'new-event',
                title: 'New Event',
                canActivate: [AuthGuard],
                data: {
                    icon: 'playlist_add',
                    title: 'Schedule New Event',
                },
                loadChildren: () =>
                    import('./protected/new-event/new-event.routes'),
            },
            { path: '**', redirectTo: 'events', pathMatch: 'full' },
        ],
    },
];
