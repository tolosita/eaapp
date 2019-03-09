import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Referencia } from '../../../../models/referencia.model';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../../../services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.store';
import { Client } from '../../../../models/client.model';
import { LoadClients } from '../../../../store/Actions/client.actions';
import { SaveGarantia, ShowGarantia, EditGarantia, CreateGarantia } from 'src/app/store/Actions/garantia.actions';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-garantia',
  templateUrl: './garantia.component.html',
  styleUrls: ['./garantia.component.scss']
})
export class GarantiaComponent implements OnInit {
  hoveredIndex: number;
  cargando: boolean;
  causas: any[];
  clients: Client[];
  id: number;
  referencias: FormArray = this.fb.array([]);
  garantiaForm = this.fb.group({
    fechaRegistro: [this.format(new Date()), Validators.required],
    boutique: [null, Validators.required],
    email: ['', Validators.email],
    telefono: ['', Validators.minLength(7)],
    referencias: this.referencias,
    causas: [null, Validators.required]
  });
  data: Referencia[] = [new Referencia()];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayedColumns: string[] = ['referencia', 'color', 'talla', 'total', 'cliente', 'factura', 'observaciones', 'fechaRecibido', 'action'];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const code = +this.route.snapshot.paramMap.get('id');
    this.sharedService.getCausas().subscribe(causas => this.causas = causas);
    this.store.select('clients').subscribe(clients => this.clients = clients.clients);
    this.store.select('garantias').subscribe(garantias => {
      while (this.referencias.length !== 0) {
        this.referencias.removeAt(0);
        this.updateView();
      }

      if (garantias.garantia && garantias.garantia.id) {
        this.id = garantias.garantia.id;
        this.garantiaForm.controls['fechaRegistro'].setValue(garantias.garantia.fechaRegistro && garantias.garantia.fechaRegistro.substring(0, 10));
        this.garantiaForm.controls['boutique'].setValue(garantias.garantia.boutique);
        this.garantiaForm.controls['email'].setValue(garantias.garantia.email);
        this.garantiaForm.controls['telefono'].setValue(garantias.garantia.telefono);

        this.sharedService.getReferencias(this.id).toPromise().then(ref => {
          ref.forEach((d: Referencia) => this.addRow(d, false));
          this.updateView();
        });

        this.sharedService.getGarantiaCausas(this.id).toPromise().then(causas => {
          this.garantiaForm.controls['causas'].setValue(causas.map(causa => causa.id));
        });
      } else {
        this.data.forEach((d: Referencia) => this.addRow(d, false));
        this.updateView();
      }
      this.cargando = garantias.isLoading;
    });

    this.store.dispatch(new LoadClients());
    if (code) {
      this.store.dispatch(new ShowGarantia(code));
    } else {
      this.store.dispatch(new CreateGarantia());
    }
  }

  onSubmit() {
    if (this.garantiaForm.invalid) { return; }
    let clientValid = false;
    const data = { ... this.garantiaForm.value };
    data.referencias.forEach(referencia =>
      this.clients.filter(client => {
        if (client.nroDocumento === referencia.cliente) {
          referencia.cliente = client;
          clientValid = true;
        }
      })
    );
    if (clientValid) {
      data.fechaRegistro = `${data.fechaRegistro}T12:00:00.00000`;
      data.causas = this.causas.filter(causa => data.causas.includes(causa.id));
      this.store.dispatch(this.id ? new EditGarantia({ ...data, id: this.id }) : new SaveGarantia(data));
    } else {
      this.snackBar.open("Debe ingresar un cliente valido", '', { duration: 3000 });
    }
  }

  addRow(d?: Referencia, noUpdate?: boolean) {
    const referencia = this.fb.group({
      'nombre': [d && d.nombre ? d.nombre : null, Validators.required],
      'color': [d && d.color ? d.color : null, Validators.required],
      'talla': [d && d.talla ? d.talla : null, Validators.required],
      'total': [d && d.total ? d.total : null, Validators.required],
      'cliente': [d && d.cliente ? d.cliente.nroDocumento : null, Validators.required],
      'nroFactura': [d && d.nroFactura ? d.nroFactura : null, Validators.required],
      'observaciones': [d && d.observaciones ? d.observaciones : null, Validators.required],
      'fechaRecibido': [d && d.fechaRecibido ? d.fechaRecibido.substring(0, 10) : null, Validators.required]
    });
    this.referencias.push(referencia);
    if (!noUpdate) { this.updateView(); }
  }

  removeRow(index: number) {
    this.referencias.removeAt(index);
    this.updateView();
  }

  updateView() {
    this.dataSource.next(this.referencias.controls);
  }

  format(date: Date) {
    return `${date.getFullYear()}-${this.rellenar(date.getMonth() + 1)}-${this.rellenar(date.getDate())}`;
  }

  rellenar(num: number) {
    return num < 10 ? `0${num}` : num
  }

}
