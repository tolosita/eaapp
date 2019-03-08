import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Referencia } from '../../../../models/referencia.model';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../../../../services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.store';
import { Client } from '../../../../models/client.model';
import { LoadClients } from '../../../../store/Actions/client.actions';
import { SaveGarantia } from 'src/app/store/Actions/garantia.actions';

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
  referencias: FormArray = this.fb.array([]);
  garantiaForm = this.fb.group({
    fechaRegistro: [new Date().toJSON().substr(0, 10), Validators.required],
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
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.data.forEach((d: Referencia) => this.addRow(d, false));
    this.updateView();
    this.sharedService.getCausas().subscribe(causas => this.causas = causas);
    this.store.dispatch(new LoadClients());
    this.store.select('clients').subscribe(clients => this.clients = clients.clients);
    this.store.select('garantias').subscribe(garantias => {
      this.cargando = garantias.isLoading;
    });
  }

  onSubmit() {
    if (this.garantiaForm.invalid) { return; }
    const data = { ... this.garantiaForm.value };
    data.causas = this.causas.filter(causa => data.causas.includes(causa.id));
    data.referencias.map(referencia =>
      this.clients.filter(client => referencia.cliente = client.nroDocumento === referencia.cliente ? client : null)
    );
    this.store.dispatch(new SaveGarantia(data));
  }

  addRow(d?: Referencia, noUpdate?: boolean) {
    const referencia = this.fb.group({
      'referencia': [d && d.referencia ? d.referencia : null, Validators.required],
      'color': [d && d.color ? d.color : null, Validators.required],
      'talla': [d && d.talla ? d.talla : null, Validators.required],
      'total': [d && d.total ? d.total : null, Validators.required],
      'cliente': [d && d.cliente ? d.cliente : null, Validators.required],
      'factura': [d && d.factura ? d.factura : null, Validators.required],
      'observaciones': [d && d.observaciones ? d.observaciones : null, Validators.required],
      'fechaRecibido': [d && d.fechaRecibido ? d.fechaRecibido : null, Validators.required]
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

}
