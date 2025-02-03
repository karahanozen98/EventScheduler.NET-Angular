import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../auth/auth.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClient } from '@angular/common/http';
import { INotification } from '../../models/notification.model';
import { IBaseResponse } from '../../models/base.response.model';

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
    notifications: INotification[] = [];
    constructor(
        private notificationService: NotificationService,
        private authService: AuthService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        const userToken = this.authService.getToken();
        if (userToken) {
            this.fetchNotifications();
            this.addNotificationListener(userToken);
        }
    }

    ngOnDestroy() {
        this.removeNotificationListener();
    }

    private fetchNotifications() {
        this.http
            .get<IBaseResponse<INotification[]>>('api/v1/notification')
            .subscribe((res) => {
                this.notifications = [...res.result];
            });
    }

    private addNotificationListener(userToken: string) {
        this.notificationService
            .startConnection(userToken)
            .on('ReceiveNotification', (message) => {
                // if new notifications are available, fetch notifications to update the list
                if (message == 'New notifications available') {
                    this.fetchNotifications();
                }
            });
    }

    private removeNotificationListener() {
        this.notificationService.stopConnection();
    }

    handleDelete(id: string) {
        this.notifications = this.notifications.filter((n) => n.id !== id);
        this.http.delete(`api/v1/notification/${id}`).subscribe();
    }
}
