import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import {
    DashboardPost,
    DashboardAccount,
    DashboardActivity
} from '../models/dashboard.model'
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl;

  getDashboardData():Observable<{
    posts:DashboardPost[],
    accounts:DashboardAccount[],
    activities:DashboardActivity[]
  }> {
    return forkJoin({
      posts: this.http.get<DashboardPost[]>(`${this.apiUrl}/api/posts`),
      accounts: this.http.get<DashboardAccount[]>(`${this.apiUrl}/api/accounts`),
      activities: this.http.get<DashboardActivity[]>(`${this.apiUrl}/api/activity`)
    });
  }
}