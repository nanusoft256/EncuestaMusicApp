import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Encuesta } from "src/app/models/encuesta";
import { EncuestaService } from 'src/app/services/encuesta.service';
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
  generoMusicales: string[] = ['Rock', 'Pop', 'Jazz', 'Clásica'];
  idEncuesta: any;
  accion = 'Crear';

  myForm: FormGroup;
  constructor(private fb: FormBuilder,
              private personaService: EncuestaService, 
              private route: Router,
              private snackBar: MatSnackBar,
              private aRoute: ActivatedRoute) { 
    this.myForm = this.fb.group({
      correo: ['',  [Validators.required, Validators.email]],
      generoMusical: ['', [Validators.required]]
    });
    const idParam = 'id';
    this.idEncuesta = this.aRoute.snapshot.params[idParam];

  }

  ngOnInit(): void {
    if (this.idEncuesta !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarEncuestaPersona() {
    const encuesta: Encuesta = {
      correo: this.myForm.get('correo').value,
      generoMusical: this.myForm.get('generoMusical').value
    };

    //const encuesta: Encuesta = Object.assign({}, encuestaForm);

    if (this.idEncuesta !== undefined) {
      this.editarEncuestaPersona(encuesta);
    } else {
      this.agregarEncuestaPersona(encuesta);
    }
  }

  agregarEncuestaPersona(encuesta: Encuesta) {
    //this.personaService.agregarEncuesta(encuesta);
    this.personaService.createEncuesta(encuesta);
    this.snackBar.open('Encuesta registrada con éxito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  editarEncuestaPersona(encuesta: Encuesta) {
    this.personaService.editEncuesta(encuesta, 1);
    this.snackBar.open('Encuesta actualizada con éxito!', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  esEditar() {
    const encuesta: Encuesta = this.personaService.getEncuesta(this.idEncuesta);
    console.log(encuesta);
    this.myForm.patchValue({
      correo: encuesta.correo,
      generoMusical: encuesta.generoMusical
    });
  }

}
