import { Routes } from '@angular/router';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { estadoResolver } from './resolvers/estado-resolver';
import { AlunoListComponent } from './components/aluno/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './components/aluno/aluno-form/aluno-form.component';
import { alunoResolver } from './resolvers/aluno-resolver';

export const routes: Routes = [
    { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados' },
    { path: 'estados/new', component: EstadoFormComponent, title: 'Cadastro de Estados' },
    { path: 'estados/edit/:id', component: EstadoFormComponent, title: 'Edição de Estado', 
        resolve: {estado: estadoResolver}
    },

    { path: 'alunos', component: AlunoListComponent, title: 'Lista de Alunos' },
    { path: 'alunos/new', component: AlunoFormComponent, title: 'Cadastro de Alunos' },
    { path: 'alunos/edit/:id', component: AlunoFormComponent, title: 'Edição de Aluno', 
        resolve: {aluno: alunoResolver}
    },

    { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades' },
    { path: 'cidades/new', component: CidadeFormComponent, title: 'Cadastro de Cidades' }
];
