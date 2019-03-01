import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AppState } from '../../../../store/app.store';
import { Store } from '@ngrx/store';
import { TipoDocumento } from 'src/app/models/tipoDocumento';
import { Client } from '../../../../models/client.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  tipoDocumento: TipoDocumento[];
  hide = true;
  error: string;
  cliente: Client;
  id: number;
  userForm = this.fb.group({
    tipoDocumento: [null, Validators.required],
    nroDocumento: [null, Validators.required],
    nombre: [null, Validators.required],
    apellidos: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    telefono: [null, Validators.required],
    celular: [null, Validators.required],
    direccion: [null, Validators.required],
    pais: [null, Validators.required],
    ciudad: [null, Validators.required]
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    public dialogRef: MatDialogRef<ClienteComponent>,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

}
