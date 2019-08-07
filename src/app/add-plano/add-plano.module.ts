import { VincularProcedimentoComponent } from './vincular-plano/vincular-procedimento.component';
import { NgModule } from "@angular/core";
import { DataTableModule, DialogModule } from "primeng/primeng";
import { AddPlanoService } from "./services/add-plano.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[

    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        DialogModule

    ],
    providers:[AddPlanoService]
})
export class AddPlanoModule{}