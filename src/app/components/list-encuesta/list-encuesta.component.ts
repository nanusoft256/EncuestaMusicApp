import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { Encuesta } from "src/app/models/encuesta";
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-list-encuesta',
  templateUrl: './list-encuesta.component.html',
  styleUrls: ['./list-encuesta.component.css']
})
export class ListEncuestaComponent implements OnInit {
  displayedColumns: string[] = ['correo', 'generoMusical', 'acciones'];
  dataSource = new MatTableDataSource();
  listEncuesta: Encuesta[];

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          stacked: true
      }],
      yAxes: [{
          stacked: true
      }]
    },
    plugins: {
      datalabels: {
        font: {
          size: 20,
        }
      }
    }
  };
  chartLabels: Label[] = ['Rock', 'Pop', 'Jazz', 'Clásica'];
  chartType: ChartType = 'bar';
  chartLegend = true;
  chartPlugins = [pluginDataLabels];
  chartData: ChartDataSets[] = [
    //{ data: [45, 37, 60, 70], label: 'Tipos de música' }
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private personaService: EncuestaService, public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarEncuestas();
    this.cargarDataGraficos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEncuestas() {
    this.listEncuesta = [];
    this.personaService.getEncuestas()
    .subscribe((data) => {
      try {
        this.listEncuesta = data;
        console.log(this.listEncuesta);
        this.dataSource = new MatTableDataSource(this.listEncuesta);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } catch (e) {
   
      }
   
    });
    console.log(this.listEncuesta);
    
  }

  cargarDataGraficos() {
    this.listEncuesta = [];
    this.personaService.getCantidadPorGeneroMusical().
      subscribe((data: any) => {
        console.log(data);
        let values = [];
        Object.keys(data).forEach(ob => {
          values.push(data[ob]);
        });
        
        this.chartData = [{
          data: values,
          label: 'Tipos de música',
          fill: true
        }]
        
      });
  }

  eliminarEncuesta(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar esta encuesta?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.personaService.eliminarEncuesta(index);
        this.cargarEncuestas();
        this.snackBar.open('Encuesta eliminada con éxito!', '', {
          duration: 3000
        });
      }
    });
  }

}
