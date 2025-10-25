import { Component, OnInit, signal } from '@angular/core';
import { Plano } from '../../../models/plano.model';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, DecimalPipe, CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanoService } from '../../../services/plano-service';

type CardPlano = {
  idPlano?: number;
  titulo?: string|null;
  preco?: number|null;
  maxAlunos?: number|null;
  maxProfessores?: number|null;
  descontoAnual?: number|null;
  imagemUrl?: string;
};

@Component({
  selector: 'app-plano-card-list',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, MatButton, DecimalPipe, CurrencyPipe],
  templateUrl: './plano-card-list.component.html',
  styleUrls: ['./plano-card-list.component.css']
})
export class PlanoCardListComponent implements OnInit {

  planos: Plano[] = [];
  cards = signal<CardPlano[]>([]);

  constructor(
    private planoService: PlanoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    // ajuste os parâmetros de paginação conforme seu backend
    this.planoService.getPlanos(0, 10).subscribe({
      next: (data) => {
        this.planos = data;
        this.carregarCards();
      },
      error: () => this.showSnackbarTopPosition('Falha ao carregar planos.')
    });
  }

  carregarCards(): void {
    const list: CardPlano[] = this.planos.map(p => ({
      idPlano: p.id!,
      titulo: p.nome,
      preco: p.precoMensal,
      maxAlunos: p.maxAlunos,
      maxProfessores: p.maxProfessores,
      descontoAnual: p.descontoAnual,
      imagemUrl: 'assets/img/planos/default.png'
    }));
    this.cards.set(list);
  }

  adicionarAoCarrinho(card: CardPlano): void {
    this.showSnackbarTopPosition(`O Plano (${card.titulo}) foi adicionado ao carrinho.`);

  }

  showSnackbarTopPosition(content: string): void {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
