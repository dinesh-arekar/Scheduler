import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-platform-icon',
  standalone: true,
  templateUrl: './platform-icon.html',
  styleUrl: './platform-icon.css'
})
export class PlatformIcon {
  @Input() platform = '';
  @Input() size = 24;
}