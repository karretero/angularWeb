import { AuthService } from '@/core/auth/services/auth.service';
import { Logger } from '@/sharedservices/logger.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  router =  inject(Router)
  authService = inject(AuthService)
  log = new Logger('LoginComponent')
  ngOnInit(): void {

  }

  register(){
    this.log.info('Register');
    this.authService.login().subscribe((x) => {
      this.log.info(`Register auth ${x}`)
      this.router.navigate(['register'])
    })
  }
}
