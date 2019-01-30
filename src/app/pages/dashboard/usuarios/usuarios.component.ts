import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../../../models/user.model';
import { LoadUser, CreateUser } from '../../../store/Actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'fechaNacimiento', 'direccion', 'email', 'role'];
  dataSource: MatTableDataSource<User>;
  cargando: boolean;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadUser());
    this.subscription = this.store.select('users').subscribe(users => {
      this.cargando = users.isLoading;
      this.dataSource = new MatTableDataSource(users.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  crearUsuario() {
    this.store.dispatch(new CreateUser());
  }

}
