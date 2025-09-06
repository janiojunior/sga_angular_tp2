
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado.model';


@Component({
  selector: 'app-estado-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})
export class EstadoFormComponent {

  readonly form; 

  // Estado de loading só para exemplo visual
  readonly saving = signal(false);

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
              private estadoService: EstadoService) {

    this.form = this.fb.group({
      id: [null],
      nome: this.fb.control<string>('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
        nonNullable: false
      }),
      sigla: this.fb.control<string>('', {
        validators: [Validators.required, Validators.pattern(/^[A-Z]{2}$/)],
        nonNullable: false
      })
    });

  }

  onSiglaInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const upper = (target.value ?? '').toUpperCase().slice(0, 2);
    if (upper !== target.value) {
      target.value = upper;
    }
    this.form.controls.sigla.setValue(upper, { emitEvent: false });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    // Salvando o estado
    const estado = this.form.value;
    this.estadoService.incluir(estado).subscribe({
      next: (obj) => {
        this.exibirMensagem('Estado salvo com sucesso!');
        console.log(obj);
        this.saving.set(false);
        this.form.reset();
      },
      error: (erro) => {
         this.exibirMensagem('Problema ao salvar o estado, entre em contato com o suporte!');
         console.log(erro);
         this.saving.set(false);
      }

    })

  }

  exibirMensagem(mensagem: string): void {
    this.snack.open(mensagem, 'OK', { 
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top' 
    });
  }

  onReset() {
    this.form.markAsUntouched();
     this.form.reset();  
  }

}