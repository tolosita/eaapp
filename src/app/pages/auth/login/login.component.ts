import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { LoginUser } from '../../../store/Actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  cargando: boolean;
  error: string;
  hide = true;
  subscription: Subscription;
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    clave: [null, Validators.required],
    recordar: [false]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(auth => {
      this.cargando = auth.isLoading;
      this.error = auth.error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.invalid) { return; }
    delete this.loginForm.value.recordar;
    this.store.dispatch(new LoginUser(this.loginForm.value));
  }

  getErrorMessage(input: FormControl) {
    return input.hasError('required') ? 'Debes introducir un valor' :
      input.hasError('email') ? 'No es un correo electrónico válido' :
        '';
  }

  get email() { return this.loginForm.get('email'); }
  get clave() { return this.loginForm.get('clave'); }
}
