import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true, // Make the component standalone
  imports: [], // No imports needed for this logic
  templateUrl: './skills.component.html',
  // You can add your component-specific styles here or keep them global
  // styleUrls: ['./skills.component.css'] 
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  
  private observer: IntersectionObserver | undefined;

  // Inject ElementRef to get a reference to this component's host element
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // We use AfterViewInit to make sure the component's view (HTML) is loaded
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null, // relative to the viewport
      threshold: 0.3 // Trigger when 30% of the component is visible
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // The component is visible, run the animation
          this.animateSkillBars();
          
          // Stop observing after the animation has run once
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    // Start observing the component's host element
    this.observer.observe(this.el.nativeElement);
  }

  private animateSkillBars(): void {
    // Find all skill items within this component
    const skillItems: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.skill-item');

    skillItems.forEach((item, index) => {
      // Get the proficiency value from the 'data-proficiency' attribute
      const proficiency = item.dataset['proficiency'];
      
      // Find the .skill-progress bar inside this item
      const progressBar = item.querySelector('.skill-progress') as HTMLElement | null;

      if (proficiency && progressBar) {
        // Apply the proficiency as the width
        // We use a small delay on each bar for a nice staggered effect
        setTimeout(() => {
          progressBar.style.width = proficiency + '%';
          // This class works with the CSS to fade in the item
          item.classList.add('animated'); 
        }, index * 100); // 100ms delay between each bar
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the observer when the component is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}