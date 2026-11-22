import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
export interface Account {
    _id: string;
    platform:
    | 'twitter'
    | 'linkedin'
    | 'facebook'
    | 'instagram'
    handle: string;
    status: 'connected' | 'disconnected';
    avatarUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/accounts`;

    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(this.apiUrl);
    }

    disconnectAccount(accountId: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(
            `${this.apiUrl}/${accountId}`
        );
    }

    // Generate OAuth URL
    getConnectUrl(platform: string): Observable<{ url: string }> {
        return this.http.get<{ url: string }>(
            `${environment.apiBaseUrl}/api/oauth/${platform}/url`
        );
    }

    // Sync accounts from Zernio
    syncAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(
            `${environment.apiBaseUrl}/api/oauth/sync`
        );
    }


}