export const images = {
  img_1: '/img-1.jpg',
  img_2: '/img-2.jpg',
  img_3: '/img-3.jpg',
  img_4: '/img-4.jpg'
};

export interface Platform {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SocialAccount {
  _id: string;
  handle: string;
  platform: string;
  status: string;
}

export interface SocialPost {
  _id: string;
  user?: string;
  content: string;
  platforms: string[];
  scheduledFor: string;
  status: 'scheduled' | 'published';
  createdAt: string;
  updatedAt?: string;
  mediaUrl?: string;
  mediaType?: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: 'twitter',
    description: 'Post tweets, threads, and media'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    description: 'Publish to your profile and company pages'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    description: 'Manage your pages and profile'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    description: 'Share photos, reels and stories'
  }
];

export const dummyAccountsData: SocialAccount[] = [
  {
    _id: '6a04390528a41877988d1a05',
    handle: 'greatstack',
    platform: 'instagram',
    status: 'connected'
  },
  {
    _id: '6a0c463828a4187798c152e6',
    handle: 'Greatstack',
    platform: 'linkedin',
    status: 'connected'
  }
];

export const dummyPostsData: SocialPost[] = [
  {
    _id: '69fd98f4a59dd584d3587a1e',
    user: '69fd96aea59dd584d3587a1d',
    content: 'Hi Everyone',
    platforms: ['linkedin'],
    scheduledFor: '2026-05-08T08:05:00.000Z',
    status: 'published',
    createdAt: '2026-05-08T08:04:04.397Z',
    updatedAt: '2026-05-08T08:05:02.523Z'
  },
  {
    _id: '6a02c5213be90e11e963460a',
    user: '69fd96aea59dd584d3587a1d',
    content: `Artificial Intelligence is no longer a futuristic concept; it's a transformative force reshaping our world today. From powering sophisticated analytics and automating complex tasks to driving groundbreaking discoveries in science and medicine, AI's rapid evolution is undeniable.

As AI continues to integrate into our daily lives and professional landscapes, the focus shifts to responsible development, ethical implementation, and fostering human-AI collaboration.

What are your thoughts on the current state and future trajectory of AI?

#AI #ArtificialIntelligence #Innovation #TechTrends #DigitalTransformation`,
    platforms: ['linkedin'],
    scheduledFor: '2026-05-12T06:14:00.000Z',
    status: 'published',
    createdAt: '2026-05-12T06:13:53.707Z',
    updatedAt: '2026-05-12T06:14:02.726Z'
  },
  {
    _id: '6a02c7e93be90e11e963460d',
    user: '69fd96aea59dd584d3587a1d',
    content: `Unlock your potential in the rapidly evolving world of Artificial Intelligence. Our comprehensive AI course is designed for professionals and aspiring technologists eager to master core concepts, practical applications, and ethical considerations.

Learn machine learning fundamentals, deep learning techniques, and natural language processing.

#AICourse #ArtificialIntelligence #MachineLearning #DeepLearning`,
    platforms: ['linkedin'],
    scheduledFor: '2026-05-12T06:26:00.000Z',
    status: 'published',
    createdAt: '2026-05-12T06:25:45.813Z',
    updatedAt: '2026-05-12T06:26:02.572Z'
  },
  {
    _id: '6a032a7bc109744f21086020',
    user: '69fd96aea59dd584d3587a1d',
    content: `As we approach 2026, understanding India's inflation trajectory remains important for economic stability and growth. Global supply chains, energy costs, domestic demand, and RBI policies all influence the economic landscape.

#IndiaEconomy #InflationOutlook #RBI #BusinessStrategy`,
    platforms: ['linkedin'],
    scheduledFor: '2026-05-12T13:27:00.000Z',
    status: 'published',
    createdAt: '2026-05-12T13:26:19.656Z',
    updatedAt: '2026-05-12T13:27:04.111Z'
  },
  {
    _id: '6a044112d7bb966a9a9a6de1',
    user: '69fd96aea59dd584d3587a1d',
    content: `Exciting Opportunity: Data Analyst!

We're looking for an analytical professional passionate about transforming complex data into strategic insights.

#DataAnalyst #Hiring #JobOpportunity #DataScience`,
    platforms: ['linkedin'],
    mediaUrl: images.img_1,
    mediaType: 'image',
    scheduledFor: '2026-05-13T09:15:00.000Z',
    status: 'published',
    createdAt: '2026-05-13T09:14:58.406Z',
    updatedAt: '2026-05-13T09:15:04.958Z'
  },
  {
    _id: '6a0448d9d7bb966a9a9a6de4',
    user: '69fd96aea59dd584d3587a1d',
    content: `Exciting Opportunity: Data Analyst!

Discover new opportunities in analytics and data science.

#DataAnalyst #Hiring #Career #DataScience`,
    platforms: ['instagram'],
    mediaUrl: images.img_2,
    mediaType: 'image',
    scheduledFor: '2026-05-13T09:49:00.000Z',
    status: 'published',
    createdAt: '2026-05-13T09:48:09.498Z',
    updatedAt: '2026-05-13T09:49:15.507Z'
  },
  {
    _id: '6a0c1d4232d96fd9b1e904e2',
    user: '69fd96aea59dd584d3587a1d',
    content: `Exciting Opportunity: Data Analyst!

Build your skills and explore new opportunities in data analytics.

#DataAnalyst #Hiring #Analytics #Technology`,
    platforms: ['instagram'],
    mediaUrl: images.img_3,
    mediaType: 'image',
    scheduledFor: '2026-05-19T08:21:00.000Z',
    status: 'published',
    createdAt: '2026-05-19T08:20:18.746Z',
    updatedAt: '2026-05-19T08:21:06.152Z'
  },
  {
    _id: '6a0c46fda6bca2a802e1d48f',
    user: '69fd96aea59dd584d3587a1d',
    content: `🚀 Announcing the Future of Web Development!

We are excited to introduce our AI Web Development Course, designed to help developers build intelligent and future-ready applications.

#AIWebDev #WebDevelopment #AICourse #FutureOfTech`,
    platforms: ['instagram'],
    mediaUrl: images.img_4,
    mediaType: 'image',
    scheduledFor: '2026-05-19T11:19:00.000Z',
    status: 'published',
    createdAt: '2026-05-19T11:18:21.284Z',
    updatedAt: '2026-05-19T11:19:06.082Z'
  },
  {
    _id: '6a0c52f4a6bca2a802e1d491',
    user: '69fd96aea59dd584d3587a1d',
    content: `Exciting Opportunity: Data Analyst!

Discover new opportunities in analytics, reporting, and business intelligence.

#DataAnalyst #Hiring #BusinessIntelligence`,
    platforms: ['facebook'],
    mediaUrl: images.img_1,
    mediaType: 'image',
    scheduledFor: '2026-05-19T14:09:00.000Z',
    status: 'scheduled',
    createdAt: '2026-05-19T12:09:24.729Z',
    updatedAt: '2026-05-19T12:09:24.729Z'
  }
];