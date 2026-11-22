import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { Sidebar } from './components/sidebar/sidebar';
import { LucideMenu } from '@lucide/angular';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Sidebar,
    LucideMenu
  ],
  templateUrl: './main-layout.html'
})
export class MainLayout implements OnInit, OnDestroy {

  isMobileMenuOpen = false;

  title = 'SocialAI';

  private routerSubscription?: Subscription;

  private pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/accounts': 'Social Accounts',
    '/schedule': 'Post Scheduler',
    '/ai-composer': 'AI Composer'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set the initial page title
    this.updateTitle(this.router.url);

    // Update the title whenever the route changes
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const navigation = event as NavigationEnd;
        this.updateTitle(navigation.urlAfterRedirects);
        this.closeMobileMenu();
      });
  }

  private updateTitle(url: string): void {
    const pathname = url.split('?')[0].split('#')[0];
    this.title = this.pageTitles[pathname] || 'SocialAI';
  }

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}