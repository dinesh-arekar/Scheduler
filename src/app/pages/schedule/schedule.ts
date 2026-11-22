import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformIcon } from '../accounts/components/platform-icon/platform-icon';
import { ScheduleDataService } from '../../services/schedule';
import { PLATFORMS, SocialPost, SocialAccount } from '../../assets/assets';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule,PlatformIcon],
  templateUrl: './schedule.html'
})
export class Schedule implements OnInit, OnDestroy {

  // Platform list
  platforms = PLATFORMS;

  // Posts and accounts
  posts: SocialPost[] = [];
  userAccounts: SocialAccount[] = [];

  // Form fields
  content = '';
  scheduledDate = '';
  scheduledTime = '';
  selectedPlatforms: string[] = [];
  mediaFile: File | null = null;
  mediaPreviewUrl: string | null = null;

  // Loading state
  loading = false;

  // Today's date for the date input
  minDate = this.getTodayDate();

  constructor(
    private scheduleDataService: ScheduleDataService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadUserAccounts();
  }

  ngOnDestroy(): void {
    this.clearMediaPreview();
  }

  // Get today's date in YYYY-MM-DD format
  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Load all posts from the service
  loadPosts(): void {
    this.posts = this.scheduleDataService.getPosts();
  }

  // Load connected social accounts
  loadUserAccounts(): void {
    this.userAccounts =
      this.scheduleDataService.getConnectedAccounts();
  }

  // Separate scheduled posts
  get scheduled(): SocialPost[] {
    return this.posts.filter(
      post => post.status === 'scheduled'
    );
  }

  // Separate published posts
  get published(): SocialPost[] {
    return this.posts.filter(
      post => post.status === 'published'
    );
  }

  // Select or deselect a platform
  togglePlatform(id: string): void {
    if (this.selectedPlatforms.includes(id)) {
      this.selectedPlatforms =
        this.selectedPlatforms.filter(platform => platform !== id);
    } else {
      this.selectedPlatforms = [
        ...this.selectedPlatforms,
        id
      ];
    }
  }

  // Check whether a platform is selected
  isPlatformSelected(id: string): boolean {
    return this.selectedPlatforms.includes(id);
  }

  // Check whether a platform has a connected account
  isPlatformConnected(platformId: string): boolean {
    return this.userAccounts.some(
      account =>
        account.platform === platformId &&
        account.status === 'connected'
    );
  }

  // Handle media selection
  onMediaSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith('image/') &&
      !file.type.startsWith('video/')
    ) {
      window.alert('Please select an image or video.');
      input.value = '';
      return;
    }

    this.clearMediaPreview();

    this.mediaFile = file;
    this.mediaPreviewUrl = URL.createObjectURL(file);
  }

  // Remove selected media
  removeMedia(): void {
    this.clearMediaPreview();
    this.mediaFile = null;
  }

  private clearMediaPreview(): void {
    if (this.mediaPreviewUrl) {
      URL.revokeObjectURL(this.mediaPreviewUrl);
      this.mediaPreviewUrl = null;
    }
  }

  // Schedule a new post
  handleSchedule(event: Event): void {
    event.preventDefault();

    if (this.selectedPlatforms.length === 0) {
      window.alert('Select at least one platform.');
      return;
    }

    // Check whether selected platforms are connected
    const missingPlatforms = this.selectedPlatforms.filter(
      platform => !this.isPlatformConnected(platform)
    );

    if (missingPlatforms.length > 0) {
      const names = missingPlatforms
        .map(platform =>
          this.platforms.find(item => item.id === platform)?.name
          ?? platform
        )
        .join(', ');

      window.alert(
        `Please connect your ${names} account before scheduling.`
      );
      return;
    }

    if (!this.content.trim()) {
      window.alert('Please enter post content.');
      return;
    }

    if (this.content.length > 280) {
      window.alert('Post content cannot exceed 280 characters.');
      return;
    }

    if (!this.scheduledDate || !this.scheduledTime) {
      window.alert('Please select a date and time.');
      return;
    }

    if (
      this.selectedPlatforms.includes('instagram') &&
      !this.mediaFile
    ) {
      window.alert('Instagram requires an image or video.');
      return;
    }

    const scheduledDateObj = new Date(
      `${this.scheduledDate}T${this.scheduledTime}`
    );

    if (scheduledDateObj.getTime() <= Date.now()) {
      window.alert('Please select a future date and time.');
      return;
    }

    this.loading = true;

    try {
      const newPost: Omit<
        SocialPost,
        '_id' | 'createdAt' | 'status'
      > = {
        content: this.content.trim(),
        platforms: [...this.selectedPlatforms],
        scheduledFor: scheduledDateObj.toISOString(),

        ...(this.mediaPreviewUrl && this.mediaFile
          ? {
              mediaUrl: this.mediaPreviewUrl,
              mediaType: this.mediaFile.type.startsWith('image/')
                ? 'image'
                : 'video'
            }
          : {})
      };

      this.scheduleDataService.addPost(newPost);

      // Refresh the displayed posts
      this.loadPosts();

      // Reset form
      this.content = '';
      this.scheduledDate = '';
      this.scheduledTime = '';
      this.selectedPlatforms = [];
      this.mediaFile = null;
      this.mediaPreviewUrl = null;

      window.alert('Post scheduled successfully!');
    } catch (error) {
      console.error('Failed to schedule post:', error);
      window.alert('Failed to schedule post.');
    } finally {
      this.loading = false;
    }
  }
}