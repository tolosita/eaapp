import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styles: []
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() cargando: boolean;

  constructor(
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
