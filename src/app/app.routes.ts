import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';
import { estadoResolver } from './resolvers/estado-resolver';

export const routes: Routes = [
    { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados' },
    { path: 'estados/new', component: EstadoFormComponent, title: 'Cadastro de Estados' },
    { path: 'estados/edit/:id', component: EstadoFormComponent, title: 'Edição de Estado', 
        resolve: {estado: estadoResolver}
    },

    { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades' },
    { path: 'cidades/new', component: CidadeFormComponent, title: 'Cadastro de Cidades' }
];
