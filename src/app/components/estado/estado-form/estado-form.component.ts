
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


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

  constructor(private fb: FormBuilder, private snack: MatSnackBar) {

    this.form = this.fb.group({
      nome: this.fb.control<string>('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
        nonNullable: true
      }),
      sigla: this.fb.control<string>('', {
        validators: [Validators.required, Validators.pattern(/^[A-Z]{2}$/)],
        nonNullable: true
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

    // Simula salvamento
    setTimeout(() => {
      this.saving.set(false);
      this.snack.open('Estado salvo com sucesso!', 'OK', { duration: 2500 });
      // Aqui você poderia emitir o valor para o pai ou chamar um serviço:
      // this.estadoService.create(this.form.getRawValue()).subscribe(...)
      this.form.reset();
    }, 800);
  }

  onReset() {
    this.form.reset();
  }

}