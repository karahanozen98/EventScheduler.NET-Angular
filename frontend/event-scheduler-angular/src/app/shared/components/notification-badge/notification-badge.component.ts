import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../auth/auth.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-notification-badge',
    templateUrl: './notification-badge.component.html',
    styleUrl: './notification-badge.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MatMenu,
        MatMenuTrigger,
        MatIcon,
        MatIconButton,
        MatBadgeModule,
    ],
})
export class NotificationsComponent implements OnInit, OnDestroy {
    notifications: { message: string; hasRead: boolean }[] = [];
    constructor(
        private notificationService: NotificationService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const userToken = this.authService.getToken();
        if (userToken) {
            this.notificationService
                .startConnection(userToken)
                .on('ReceiveNotification', (message) => {
                    this.notifications.push({ message, hasRead: false });
                });
        }
    }

    ngOnDestroy() {
        this.notificationService.stopConnection();
    }
}
