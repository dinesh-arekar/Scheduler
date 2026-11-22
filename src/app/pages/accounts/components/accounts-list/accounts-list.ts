import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlatformIcon } from '../platform-icon/platform-icon';
interface SocialAccount {
  _id: string;
  handle: string;
  platform: string;
  status: string;
}

@Component({
  selector: 'app-accounts-list',
  imports:[PlatformIcon],
  standalone: true,
  templateUrl: './accounts-list.html',
  styleUrl: './accounts-list.css'
})
export class AccountsList {
  @Input() accounts: SocialAccount[] = [];

  @Output() disconnect = new EventEmitter<string>();

  getPlatformName(platform: string): string {
    const platforms: Record<string, string> = {
      twitter: 'Twitter / X',
      linkedin: 'LinkedIn',
      facebook: 'Facebook',
      instagram: 'Instagram'
    };

    return platforms[platform] ?? platform;
  }

  disconnectAccount(accountId: string): void {
    this.disconnect.emit(accountId);
  }
}