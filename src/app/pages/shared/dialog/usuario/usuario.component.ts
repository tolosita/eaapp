import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { RolesService } from '../../../../services/roles.service';
import { AppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { SaveUser } from '../../../../store/Actions/user.actions';
import { filter } from 'rxjs/operators';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  cargos: Role[];
  user: User;
  minDate = new Date();
  hide = true;
  error: string;
  userForm = this.fb.group({
    nombre: [null, Validators.required],
    apellidos: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    clave: [null, [Validators.required, Validators.minLength(6)]],
    role: [null, Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    public dialogRef: MatDialogRef<UsuarioComponent>,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private store: Store<AppState>
  ) {
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
  }

  ngOnInit() {
    this.rolesService.getRoles().subscribe(roles => this.cargos = roles);
    this.store.select('users').subscribe(users => {
      this.error = users.error;
      if (users.error) {
        this.email.setErrors({ 'exist': true });
      }
    });

    if (this.data) {
      // this.fb.array
    }
  }

  onSubmit() {
    if (this.userForm.invalid) { return; }
    this.store.dispatch(new SaveUser(this.userForm.value));
  }

  getErrorMessage(input: FormControl) {
    return input.hasError('required') ? 'Debes introducir un valor' :
      input.hasError('email') ? 'No es un correo electrónico válido' :
        input.hasError('minlength') ? 'Ingrese minimo 6 digitos' :
          input.hasError('exist') ? this.error :
            '';
  }

  get nombre() { return this.userForm.get('nombre'); }
  get apellidos() { return this.userForm.get('apellidos'); }
  get fechaNacimiento() { return this.userForm.get('fechaNacimiento'); }
  get direccion() { return this.userForm.get('direccion'); }
  get email() { return this.userForm.get('email'); }
  get clave() { return this.userForm.get('clave'); }
  get role() { return this.userForm.get('role'); }

}
