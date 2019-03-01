import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Client } from '../../../models/client.model';
import * as fromActionsClient from '../../../store/Actions/client.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.store';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [],
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'tipoDocumento', 'nroDocumento', 'direccion', 'telefono', 'fechaIngreso'];
  dataSource: MatTableDataSource<Client>;
  cargando: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromActionsClient.LoadClients());
    this.store.select('clients').subscribe(clients => {
      this.cargando = clients.isLoading;
      this.dataSource = new MatTableDataSource(clients.clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearCliente() {
    this.store.dispatch(new fromActionsClient.CreateClient());
  }

  mostrarCliente(id: number) {
    this.store.dispatch(new fromActionsClient.ShowClient(id));
  }

}
