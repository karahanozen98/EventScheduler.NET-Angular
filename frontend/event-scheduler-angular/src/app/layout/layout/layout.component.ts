import { Component, inject, OnInit } from '@angular/core';
import {
    ActivatedRoute,
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    Routes,
} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from '../../app.routes';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { AuthService } from '../../auth/auth.service';
import { NotificationsComponent } from "../../shared/components/notification-badge/notification-badge.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgOptimizedImage,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    ThemeToggleComponent,
    NotificationsComponent
],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
    private breakpointObserver = inject(BreakpointObserver);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    routes: Routes = routes[routes.length - 1]?.children?.filter(
        (r) => r.path && r.path !== '**'
    );
    menuRoutes = this.routes.filter((r) => !r.data['hideFromMenu']);
    actualRoute: {
        title: string;
        icon: string;
        hideSideBar?: boolean;
        hideFromMenu?: boolean;
    };

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            const { data } = this.routes.find(
                (r) =>
                    r.path === this.route.snapshot.firstChild?.routeConfig?.path
            ) as any;
            this.actualRoute = {
                title: data.title,
                icon: data.icon,
                hideFromMenu: data.hideFromMenu,
                hideSideBar: data.hideSideBar,
            };
        });
    }

    handleSignOut() {
        this.authService.signOut();
    }

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );
}
