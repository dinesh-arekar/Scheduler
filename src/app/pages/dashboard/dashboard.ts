import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';

import {
  LucideTrendingUp,
  LucideActivity,
  LucideSend,
  LucideClock,
  LucideCheckCircle,
  LucideShare2,
  
} from '@lucide/angular';
import { DashboardService } from '../../services/dashboard';
import { DashboardActivity, DashboardStats } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LucideTrendingUp,
    LucideActivity,
    LucideSend,
    LucideClock,
    LucideCheckCircle,
    LucideShare2,
    DatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard  implements OnInit{

  // Temporary frontend data
  // Later, we can replace this with API data.
  dashboardService=inject(DashboardService)

  isLoading=signal(false)
  errorMessage=signal('')

  stats = signal<DashboardStats>({
  scheduled: 0,
  published: 0,
  connectedAccounts: 0
});


  activities=signal<DashboardActivity[]>([])

  ngOnInit(): void {
    this.loadDashboardData()
  }

  loadDashboardData(): void {
  this.isLoading.set(true)
  this.errorMessage.set('')

  this.dashboardService.getDashboardData()
    .pipe(
      finalize(() => {
        this.isLoading.set(false)
        
        console.log('Loading state:', this.isLoading);
      })
    )
    .subscribe({
      next: (data) => {

        this.stats.set({
          scheduled: data.posts.filter(
            post => post.status === 'scheduled'
          ).length,
          published: data.posts.filter(
            post => post.status === 'published'
          ).length,
          connectedAccounts: data.accounts.filter(
            account => account.status === 'connected'
          ).length
        });

        this.activities.set(data.activities)
      
      },

      error: (error) => {
        console.error('API error:', error);

        this.errorMessage =
          error.error?.message || 'Unable to load dashboard data.';
      }
    });
}
  // statCards = [
  //   {
  //     label: 'Scheduled Posts',
  //     value: this.stats.scheduled,
  //     icon: 'clock',
  //     trend: '+2 today'
  //   },
  //   {
  //     label: 'Published Posts',
  //     value: this.stats.published,
  //     icon: 'check',
  //     trend: 'All time'
  //   },
  //   {
  //     label: 'Connected Accounts',
  //     value: this.stats.connectedAccounts,
  //     icon: 'share',
  //     trend: 'Active'
  //   }
  // ];

  // activities = [
  //   {
  //     id: '1',
  //     description: 'Your post was successfully published on Instagram.',
  //     createdAt: new Date(Date.now() - 1000 * 60 * 10)
  //   },
  //   {
  //     id: '2',
  //     description: 'A new post was scheduled for tomorrow.',
  //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  //   },
  //   {
  //     id: '3',
  //     description: 'Your social account was connected successfully.',
  //     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
  //   }
  // ];

  

}