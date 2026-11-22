export interface DashboardPost {
  _id: string;
  status: 'scheduled' | 'published';
}

export interface DashboardAccount {
  _id: string;
  status: string;
}

export interface DashboardActivity {
  _id: string;
  description: string;
  createdAt: string;
  relatedPost?: {
    _id: string;
    content: string;
  };
}

export interface DashboardData {
  posts: DashboardPost[];
  accounts: DashboardAccount[];
  activities: DashboardActivity[];
}

export interface DashboardStats {
  scheduled: number;
  published: number;
  connectedAccounts: number;
}