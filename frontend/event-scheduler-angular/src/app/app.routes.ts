import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'events' },
    {
        path: 'login',
        title: 'Login',
        data: {
            icon: 'login',
            title: 'Login',
        },
        loadComponent: () =>
            import('./auth/login/login.component').then(
                (m) => m.LoginComponent
            ),
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                data: {
                    icon: 'desktop_windows',
                    title: 'Dashboard',
                },
                loadChildren: () =>
                    import('./protected/dashboard/dashboard.routes'),
            },
            {
                path: 'drag-drop',
                title: 'Drag and Drop',
                data: {
                    icon: 'drag_indicator',
                    title: 'Drag and Drop',
                },
                loadChildren: () =>
                    import('./protected/drag-drop/drag-drop.routes'),
            },
            {
                path: 'events',
                title: 'Events',
                data: {
                    icon: 'list',
                    title: 'Events',
                },
                loadChildren: () => import('./protected/table/table.routes'),
            },
            {
                path: 'new-event',
                title: 'New Event',
                data: {
                    icon: 'event',
                    title: 'Schedule New Event',
                },
                loadChildren: () =>
                    import('./protected/new-event/new-event.routes'),
            },
            {
                path: 'tree',
                title: 'Tree',
                data: {
                    icon: 'account_tree',
                    title: 'Tree',
                },
                loadChildren: () => import('./protected/tree/tree.routes'),
            },
            { path: '**', redirectTo: 'events', pathMatch: 'full' },
        ],
    },
];
