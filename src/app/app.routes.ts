import { AutorizacaoProcedimentosComponent } from './autorizacao-procedimentos/autorizacao-procedimentos.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AddPlanoComponent } from './add-plano/add-plano.component';
import { AddProcedimentoComponent } from './add-procedimento/add-procedimento.component';


export const routes: Routes = [
    {path: '', component: StartPageComponent},
    { path: 'clientes', component: AddClienteComponent },
    { path: 'planos', component: AddPlanoComponent },
    { path: 'procedimentos', component: AddProcedimentoComponent },
    { path: 'autorizacao-procedimentos', component: AutorizacaoProcedimentosComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
