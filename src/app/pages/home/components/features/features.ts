import { Component } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideCalendarDays,
  LucideWandSparkles,
  LucideShare2,
  LucideZap,
  LucideChartNoAxesColumn,
  LucideHash
} from '@lucide/angular';


@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
  LucideDynamicIcon,
  LucideCalendarDays,
  LucideWandSparkles,
  LucideShare2,
  LucideZap,
  LucideChartNoAxesColumn,
  LucideHash

  ],

  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {
  features = [
    {
      icon: LucideCalendarDays,
      title: 'Smart Scheduling',
      description: 'Queue posts across all platforms with a single click. Set it once and let us handle the rest.',
      color: 'bg-red-50 text-red-500'
    },
    {
      icon: LucideWandSparkles,
      title: 'AI Content Generator',
      description: 'Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.',
      color: 'bg-red-50 text-red-500'
    },
    {
      icon: LucideChartNoAxesColumn,
      title: 'Activity Dashboard',
      description: 'Get a bird’s eye view of all published posts, scheduled content, and engagement activity in one place.',
      color: 'bg-red-50 text-red-500'
    },
    {
      icon: LucideShare2,
      title: 'Multi-Platform',
      description: 'Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.',
      color: 'bg-red-50 text-red-500'
    },
    {
      icon: LucideZap,
      title: 'Instant Publishing',
      description: 'Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.',
      color: 'bg-red-50 text-red-500'
    },
    {
      icon: LucideHash,
      title: 'Hashtag Suggestions',
      description: 'Get AI-powered hashtag suggestions to reach a wider audience.',
      color: 'bg-red-50 text-red-500'
    }
  ];

  readonly badgeIcon = LucideZap;
}