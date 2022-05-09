import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Empleado } from "src/app/models/Empleado";
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-encuesta',
  templateUrl: './add-edit-encuesta.component.html',
  styleUrls: ['./add-edit-encuesta.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AddEditEncuestaComponent implements OnInit {
  generosMusicales: string[] = ['Rock', 'Pop', 'Jazz', 'Clásica'];
  idEmpleado: any;
  accion = 'Crear';

  myForm: FormGroup;
  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService, 
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      correo: ['',  [Validators.required, Validators.email]],
      generosMusical: ['', [Validators.required]]
    });
    const idParam = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[idParam];

  }

  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarEmpleado() {
    const empleado: Empleado = {
      correo: this.myForm.get('correo').value,
      generosMusical: this.myForm.get('generosMusical').value
    };

    if (this.idEmpleado !== undefined) {
      this.editarEmpleado(empleado);
    } else {
      this.agregarEmpleado(empleado);
    }
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleadoService.agregarEmpleado(empleado);
    this.snackBar.open('Encuesta registrada con éxito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  editarEmpleado(empleado: Empleado) {
    this.empleadoService.editEmpleado(empleado, this.idEmpleado);
    this.snackBar.open('Encuesta actualizada con éxito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  esEditar() {
    const empleado: Empleado = this.empleadoService.getEmpleado(this.idEmpleado);
    console.log(empleado);
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.correo,
      fechaIngreso: empleado.fechaIngreso,
      telefono: empleado.telefono,
      generosMusical: empleado.generosMusical,
      sexo: empleado.sexo,
    });
  }

}
