import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  @ViewChild('carousel') sidnavRef: ElementRef;

  constructor() { }

  ngOnInit() {
    M.Carousel.init(this.sidnavRef.nativeElement, { fullWidth: true, indicators: true });
  }

}
