import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {}

  imprimir() {

    const options = {
      filename: 'cliente',
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    }

    const content: Element = document.getElementById('factura');

    html2pdf().from(content).set(options).save();

  }
}
