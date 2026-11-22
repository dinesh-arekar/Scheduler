import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink, RouterLinkActive ,Router} from '@angular/router';

import {
  LucideLayoutDashboard,
  LucideUsers,
  LucideCalendarDays,
  LucideWandSparkles,
  LucideLogOut
} from '@lucide/angular';
import { AuthService } from '../../../../services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideLayoutDashboard,
    LucideUsers,
    LucideCalendarDays,
    LucideWandSparkles,
    LucideLogOut
  ],
  templateUrl: './sidebar.html'
})
export class Sidebar {

  @Input() isOpen = false;

  @Output() closeMenu = new EventEmitter<void>();

  private router=inject(Router)
  
  authService=inject(AuthService)

  get user(){
    return this.authService.user()
  }
isDashboardActive(): boolean {
  return this.router.url.split('?')[0] === '/dashboard';
}

  navItems = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      name: 'Accounts',
      icon: 'users',
      path: '/accounts'
    },
    {
      name: 'Scheduler',
      icon: 'calendar',
      path: '/schedule'
    },
    {
      name: 'AI Composer',
      icon: 'wand',
      path: '/ai-composer'
    }
  ];

  logout(): void {
    // TODO: Connect this to your Angular AuthService.
    this.authService.logout()
    this.router.navigate(['/login'])
    this.closeMenu.emit();
  }
}