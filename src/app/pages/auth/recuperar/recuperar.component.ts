import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';
import { ThrowError } from '../../../store/Actions/alert.actions';
import { MatSnackBar } from '@angular/material';
import { Constants } from '../../../app.constants';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styles: []
})
export class RecuperarComponent {
  cargando: boolean;
  error: string;
  recuperarForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  onSubmit() {
    if (this.recuperarForm.invalid) { return; }
    this.cargando = true;
    this.error = null;
    this.authService.recuperarClave(this.recuperarForm.value.email)
      .then(_ => {
        this.snackBar.open(Constants.SEND_MAIL_SUCCES, Constants.BTN_OK, { duration: 3000 });
      })
      .catch(reject => {
        this.error = reject.error ? reject.error.message : null;
        this.store.dispatch(new ThrowError(reject));
      })
      .finally(() => {
        this.cargando = false;
      });
  }

  getErrorMessage(input: FormControl) {
    return input.hasError('required') ? 'Debes introducir un valor' :
      input.hasError('email') ? 'No es un correo electrónico válido' :
        '';
  }

  get email() { return this.recuperarForm.get('email'); }

}
