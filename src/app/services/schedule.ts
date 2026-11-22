import { Injectable } from '@angular/core';
import {
  dummyPostsData,
  dummyAccountsData,
  SocialPost,
  SocialAccount
} from '../assets/assets';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {
  private posts: SocialPost[] = [...dummyPostsData];
  private accounts: SocialAccount[] = [...dummyAccountsData];

  getPosts(): SocialPost[] {
    return [...this.posts];
  }

  getScheduledPosts(): SocialPost[] {
    return this.posts.filter(post => post.status === 'scheduled');
  }

  getPublishedPosts(): SocialPost[] {
    return this.posts.filter(post => post.status === 'published');
  }

  getConnectedAccounts(): SocialAccount[] {
    return this.accounts.filter(account => account.status === 'connected');
  }

  addPost(post: Omit<SocialPost, '_id' | 'createdAt' | 'status'>): void {
    this.posts = [
      {
        ...post,
        _id: Date.now().toString(),
        status: 'scheduled',
        createdAt: new Date().toISOString()
      },
      ...this.posts
    ];
  }
}