import { AddClienteComponent } from './add-cliente.component';
import { Routes } from '@angular/router';

export const AddClienteRoute: Routes = [
    {
        path: '',
        component: AddClienteComponent,
        canActivate: []
    }
];