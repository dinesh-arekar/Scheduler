import { Component } from '@angular/core';
import {LucideArrowRight,LucideCheck,LucideDynamicIcon} from '@lucide/angular'
@Component({
  imports: [LucideDynamicIcon,LucideArrowRight,LucideCheck],
  selector: 'app-how-it-works',
  styleUrl: './how-it-works.css',
  templateUrl: './how-it-works.html',
})
export class HowItWorks {

  readonly badgeIcon = LucideCheck;
  readonly arrowIcon = LucideArrowRight;
  steps = [
    { step: "01", title: "Connect Your Accounts", description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram." },
    { step: "02", title: "Create or Generate Content", description: "Write your own post or let our AI craft a caption and image based on your prompt." },
    { step: "03", title: "Schedule & Publish", description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically." },
];

}
