import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {

  footerLinks :Record<string,string[]>={
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};


objectKeys(obj:Record<string,string[]>):string[]{
    return Object.keys(obj)
}

  currentYear=new Date().getFullYear()
  scrollToTop():void{
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }
}
