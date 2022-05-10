import { Injectable } from '@angular/core';
import { Empleado } from "../models/Empleado";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  listEncuesta: Empleado[] = [
    {
      nombreCompleto: 'Julio Palomino', correo: 'nanu@gmail.com',
      fechaIngreso: new Date(), generosMusical: 'Jazz'
    },
  ];

  constructor() { }

  getEncuestas() {
    return this.listEncuesta.slice();
  }

  eliminarEncuesta(index: number) {
    this.listEncuesta.splice(index, 1);
  }

  agregarEncuesta(encuesta: Empleado) {
    this.listEncuesta.unshift(encuesta);
  }

  getEncuesta(index: number) {
    return this.listEncuesta[index];
  }

  editEncuesta(encuesta: Empleado, idEmpleado: number){
    this.listEncuesta[idEmpleado].nombreCompleto = encuesta.nombreCompleto;
    this.listEncuesta[idEmpleado].correo = encuesta.correo;
    this.listEncuesta[idEmpleado].fechaIngreso = encuesta.fechaIngreso;
    this.listEncuesta[idEmpleado].telefono = encuesta.telefono;
    this.listEncuesta[idEmpleado].sexo = encuesta.sexo;
    this.listEncuesta[idEmpleado].generosMusical = encuesta.generosMusical;
  }
}
