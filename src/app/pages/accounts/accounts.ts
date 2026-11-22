import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { finalize } from 'rxjs';

import { AccountsList } from './components/accounts-list/accounts-list';
import { PlatformPicker } from './components/platform-picker/platform-picker';

import {
  PLATFORMS,
  SocialAccount
} from '../../assets/assets';

import { AccountsService } from '../../services/accounts';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [AccountsList, PlatformPicker],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css'
})
export class Accounts implements OnInit {

  private accountsService = inject(AccountsService);

  // Reactive state
  accounts = signal<SocialAccount[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  connecting = signal<string | null>(null);
  showPlatformPicker = signal(false);

  // Derived state
  connectedCount = computed(() =>
    this.accounts().filter(account => account.status === 'connected').length
  );

  connectedIds = computed(() =>
    this.accounts()
      .filter(account => account.status === 'connected')
      .map(account => account.platform)
  );

  platforms = PLATFORMS;

  ngOnInit(): void {
    this.loadAccounts();
    this.syncAccounts()
  }

  // GET API
  loadAccounts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.accountsService.getAccounts()
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (data) => {
          this.accounts.set(data);
          console.log('Accounts loaded:', data);
        },
        error: (error) => {
          console.error('Accounts API error:', error);
          this.errorMessage.set(
            error.error?.message || 'Unable to load accounts.'
          );
        }
      });
  }

  onPlatformConnect(platformId: string): void {
  this.connecting.set(platformId);
  this.errorMessage.set('');

  this.accountsService.getConnectUrl(platformId).subscribe({
    next: (response) => {
      if (!response.url) {
        this.connecting.set(null);
        this.errorMessage.set('Authorization URL not received.');
        return;
      }

      // Redirect user to the social platform
      window.location.assign(response.url);
    },
    error: (error) => {
      console.error('OAuth URL error:', error);

      this.connecting.set(null);
      this.errorMessage.set(
        error.error?.message || 'Unable to connect account.'
      );
    }
  });
}

syncAccounts(): void {
  this.isLoading.set(true);
  this.errorMessage.set('');

  this.accountsService.syncAccounts()
    .subscribe({
      next: (data) => {
        this.accounts.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Account sync error:', error);

        this.isLoading.set(false);
        this.errorMessage.set(
          error.error?.message || 'Unable to sync accounts.'
        );
      }
    });
}

  disconnectAccount(accountId: string): void {
    const confirmed = window.confirm(
      'Are you sure you want to disconnect this account?'
    );

    if (!confirmed) return;

    this.accountsService.disconnectAccount(accountId).subscribe({
      next: (response) => {
        this.accounts.update(accounts =>
          accounts.filter(account => account._id !== accountId)
        );

        alert(response.message);
      },
      error: (error) => {
        console.error('Disconnect account error:', error);

        alert(
          error.error?.message || 'Unable to disconnect account.'
        );
      }
    });
  }

  openPlatformPicker(): void {
    this.showPlatformPicker.set(true);
  }

  closePlatformPicker(): void {
    this.showPlatformPicker.set(false);
  }
}