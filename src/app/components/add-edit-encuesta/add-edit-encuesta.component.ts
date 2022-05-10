import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from "src/app/models/persona";
import { PersonaService } from 'src/app/services/persona.service';
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
  idPersona: any;
  accion = 'Crear';

  myForm: FormGroup;
  constructor(private fb: FormBuilder,
              private personaService: PersonaService, 
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      correo: ['',  [Validators.required, Validators.email]],
      generosMusical: ['', [Validators.required]]
    });
    const idParam = 'id';
    this.idPersona = this.aRoute.snapshot.params[idParam];

  }

  ngOnInit(): void {
    if (this.idPersona !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarEncuestaPersona() {
    const persona: Persona = {
      correo: this.myForm.get('correo').value,
      generosMusical: this.myForm.get('generosMusical').value
    };

    if (this.idPersona !== undefined) {
      this.editarEncuestaPersona(persona);
    } else {
      this.agregarEncuestaPersona(persona);
    }
  }

  agregarEncuestaPersona(persona: Persona) {
    this.personaService.agregarEncuesta(persona);
    this.snackBar.open('Encuesta registrada con éxito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  editarEncuestaPersona(persona: Persona) {
    this.personaService.editEncuesta(persona, this.idPersona);
    this.snackBar.open('Encuesta actualizada con éxito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  esEditar() {
    const persona: Persona = this.personaService.getEncuesta(this.idPersona);
    console.log(persona);
    this.myForm.patchValue({
      nombreCompleto: persona.nombreCompleto,
      correo: persona.correo,
      fechaIngreso: persona.fechaIngreso,
      telefono: persona.telefono,
      generosMusical: persona.generosMusical,
      sexo: persona.sexo,
    });
  }

}
