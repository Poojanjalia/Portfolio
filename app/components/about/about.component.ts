import { Component, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: []
})
export class AboutComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.querySelector('section').classList.add('visible');
    }, 100); 
  }
}
