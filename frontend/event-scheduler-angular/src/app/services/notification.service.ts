import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private hubConnection!: signalR.HubConnection;

    startConnection(userToken: string): NotificationService {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/eventNotificationHub`, {
                accessTokenFactory: () => userToken,
            })
            .build();

        this.hubConnection
            .start()
            .then(() => console.debug('Connected to SignalR'))
            .catch((err) =>
                console.debug('Error while starting SignalR:', err)
            );

        return this;
    }

    on(methodName: string, callback: (...args: string[]) => void) {
        this.hubConnection.on(methodName, callback);
    }

    stopConnection() {
        if (this.hubConnection) {
            this.hubConnection
                .stop()
                .then(() => console.debug('SignalR connection stopped'))
                .catch((err) =>
                    console.debug('Error while stopping SignalR:', err)
                );
            this.hubConnection = undefined!;
        }
    }
}
