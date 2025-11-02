import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class HomeComponent implements OnInit, OnDestroy {

  typedText: string = ''; 
  
  private words: string[] = [
    'Full Stack Developer', 
    'Angular Expert', 
    'React Enthusiast', 
    'Problem Solver'
  ];
  
  private wordIndex: number = 0; 
  private charIndex: number = 0; 
  private isDeleting: boolean = false; 
  private typingTimeout: any;
  private typingSpeed: number = 150;  
  private deletingSpeed: number = 75; 
  private pauseAtEndSpeed: number = 2000; 

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.type(); 
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  private type(): void {
    const currentWord = this.words[this.wordIndex];
    let speed = this.typingSpeed;
    if (this.isDeleting) {
      speed = this.deletingSpeed;
      this.typedText = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
      }
    } else {
      speed = this.typingSpeed;
      this.typedText = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === currentWord.length) {
        this.isDeleting = true;
        speed = this.pauseAtEndSpeed; 
      }
    }
    this.cdr.detectChanges();
    this.typingTimeout = setTimeout(() => {
      this.type();
    }, speed);
  }
}