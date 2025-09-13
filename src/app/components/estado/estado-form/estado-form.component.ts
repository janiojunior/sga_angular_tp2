
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';


@Component({
  selector: 'app-estado-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbar,
    RouterLink
],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})
export class EstadoFormComponent {

  readonly form; 

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
              private estadoService: EstadoService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    const estado: Estado = this.activatedRoute.snapshot.data['estado'];            

    this.form = this.fb.group({
      id: [(estado && estado.id) ? estado.id : null],
      nome: [(estado && estado.nome) ? estado.nome : '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      sigla: [(estado && estado.sigla) ? estado.sigla : '',[Validators.required, Validators.pattern(/^[A-Z]{2}$/)]]
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

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const estado = this.form.value;

    let resultado = (estado.id) ? this.estadoService.alterar(estado) : this.estadoService.incluir(estado);

    resultado.subscribe({
      next: (obj) => {
        this.router.navigateByUrl('/estados');
        this.exibirMensagem('Estado salvo com sucesso!');
      },
      error: (erro) => {
         this.exibirMensagem('Problema ao salvar o estado, entre em contato com o suporte!');
      }
    })

  }

  excluir() {
    if (this.form.valid) {
      const estado = this.form.value;
      if (estado.id!=null){
        this.estadoService.excluir(estado).subscribe({
          next: () => {
            this.router.navigateByUrl('/estados');
            this.exibirMensagem('Estado excluído com sucesso!');
          },
          error: (erro) => {
            this.exibirMensagem('Problema ao excluir o estado, entre em contato com o suporte!');
          }
        })
      }
    }
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