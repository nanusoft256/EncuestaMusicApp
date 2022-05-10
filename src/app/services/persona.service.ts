import { Injectable } from '@angular/core';
import { Persona } from "../models/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  listEncuesta: Persona[] = [
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

  agregarEncuesta(encuesta: Persona) {
    this.listEncuesta.unshift(encuesta);
  }

  getEncuesta(index: number) {
    return this.listEncuesta[index];
  }

  editEncuesta(encuesta: Persona, idPersona: number){
    this.listEncuesta[idPersona].nombreCompleto = encuesta.nombreCompleto;
    this.listEncuesta[idPersona].correo = encuesta.correo;
    this.listEncuesta[idPersona].fechaIngreso = encuesta.fechaIngreso;
    this.listEncuesta[idPersona].telefono = encuesta.telefono;
    this.listEncuesta[idPersona].sexo = encuesta.sexo;
    this.listEncuesta[idPersona].generosMusical = encuesta.generosMusical;
  }
}
