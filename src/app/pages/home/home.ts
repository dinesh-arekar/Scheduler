import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideDot } from '@lucide/angular';
import { Features } from './components/features/features';
import { HowItWorks } from './components/how-it-works/how-it-works';
import { Testimonials } from './components/testimonials/testimonials';
import { Cta } from './components/cta/cta';
import { Footer } from './components/footer/footer';
@Component({
  imports: [RouterLink,LucideArrowRight ,LucideDot,Features,HowItWorks,Testimonials,Cta,Footer],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  user: any= null;
  scrollToTop():void{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  stats = [
    { val: '12', label: 'Scheduled' },
    { val: '48', label: 'Published' },
    { val: '4', label: 'Accounts' },
    { val: '3', label: 'AI Rules' }
  ];

  activities = [
    {
      text: 'Post published to LinkedIn & Twitter',
      time: '2m ago'
    },
    {
      text: 'AI replied to 3 comments',
      time: '15m ago'
    },
    {
      text: 'New post scheduled for tomorrow 9am',
      time: '1h ago'
    }
  ];

}
