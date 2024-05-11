import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatToolbarModule,
    MatButtonModule, 
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  
  isLoggin  = false ; 
  destorySubject = new Subject() ; 

  constructor(private authService:AuthService, private router: Router ) {
    authService.authStatus.pipe(takeUntil(this.destorySubject))
    .subscribe((result: boolean) => {
      this.isLoggin = result ; 
    });
  }


  ngOnDestroy(): void {
   this.destorySubject.next(true);
   this.destorySubject.complete() ; 
  }


  ngOnInit(): void {
    this.isLoggin = this.authService.isauthenticated();
  }

 public onLogOut(): void {
    this.authService.LogOut() ; 
    this.router.navigate(['/']); 
  } 

  
}
