import { Injectable } from '@angular/core';
import { Empleado } from "../models/Empleado";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  listEmpleado: Empleado[] = [
    {
      nombreCompleto: 'Julio Palomino', correo: 'nanu@gmail.com',
      fechaIngreso: new Date(), generosMusical: 'Jazz'
    },
  ];

  constructor() { }

  getEmpleados() {
    return this.listEmpleado.slice();
  }

  eliminarEmpleado(index: number) {
    this.listEmpleado.splice(index, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.listEmpleado.unshift(empleado);
  }

  getEmpleado(index: number) {
    return this.listEmpleado[index];
  }

  editEmpleado(empleado: Empleado, idEmpleado: number){
    this.listEmpleado[idEmpleado].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleado[idEmpleado].correo = empleado.correo;
    this.listEmpleado[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleado[idEmpleado].telefono = empleado.telefono;
    this.listEmpleado[idEmpleado].sexo = empleado.sexo;
    this.listEmpleado[idEmpleado].generosMusical = empleado.generosMusical;
  }
}
