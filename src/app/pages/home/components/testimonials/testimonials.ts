
import { Component } from '@angular/core';
import { LucideStar } from '@lucide/angular';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [LucideStar],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials {

  testimonials = [
    {
      name: 'Sarah K.',
      role: 'Marketing Manager',
      avatar: 'S',
      avatarBg: 'from-red-400 to-pink-400',
      text: 'Scheduler has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us.'
    },
    {
      name: 'Marcus L.',
      role: 'Indie Creator',
      avatar: 'M',
      avatarBg: 'from-violet-400 to-purple-500',
      text: 'I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it.'
    },
    {
      name: 'Priya D.',
      role: 'Startup Founder',
      avatar: 'P',
      avatarBg: 'from-sky-400 to-blue-500',
      text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when."
    }
  ];
}