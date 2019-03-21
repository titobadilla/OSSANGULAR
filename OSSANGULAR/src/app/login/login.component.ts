import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorage } from './helper/token-storage';
import { FormControl, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EventEmitterLogoutService } from './event-emitter-logout.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  model: any = {};
  loading = false;
  returnUrl: string;
  error = '';
  reactForm: FormGroup;


  constructor(private router: Router,private app:AppComponent,private authService: AuthService, private token: TokenStorage,private emitterService:EventEmitterLogoutService) {
    this.reactForm = new FormGroup({
      'username': new FormControl('', [FormValidators.required]),
      'password': new FormControl('', [FormValidators.required])
    });
  }
 

  ngOnInit(): void {
    this.initEventSubmit();    
  }

  initEventSubmit(){
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.login();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }

  get username() { return this.reactForm.get('username'); }
  get password() { return this.reactForm.get('password'); }
  

   
  

  login(): void {
    this.loading = true;
    this.authService.authentication( this.reactForm.get('username').value, this.reactForm.get('password').value).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.loading = false;
         this.app.login=true;
         this.app.detectChanges();
        this.router.navigate(['/']);        
      },error=>{
        alert('Ha ocurrido un error con su datos de autenticación: '+error.status);        
        this.loading = false;   
        this.reactForm.reset();     
      }
      
    );
  }
}