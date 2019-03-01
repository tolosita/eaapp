import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { User } from '../../../models/user.model';
import * as fromActionsUser from '../../../store/Actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { ConfirmComponent } from '../../shared/dialog/confirm/confirm.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'email', 'role', 'action'];
  dataSource: MatTableDataSource<User>;
  cargando: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new fromActionsUser.LoadUsers());
    this.store.select('users').subscribe(users => {
      this.cargando = users.isLoading;
      this.dataSource = new MatTableDataSource(users.users);
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

  crearUsuario() {
    this.store.dispatch(new fromActionsUser.CreateUser());
  }

  mostrarUsuario(id: number) {
    this.store.dispatch(new fromActionsUser.ShowUser(id));
  }

  deleteUsuario(id: number) {
    this.dialog.open(ConfirmComponent, {
      data: () => {
        this.store.dispatch(new fromActionsUser.DeleteUser(id));
      }
    });
  }

}
