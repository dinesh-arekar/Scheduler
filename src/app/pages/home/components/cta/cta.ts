import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight } from '@lucide/angular';

@Component({
  imports: [RouterLink,LucideArrowRight],
  selector: 'app-cta',
  styleUrl: './cta.css',
  templateUrl: './cta.html',
})
export class Cta {}
