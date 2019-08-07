import { NgModule } from "@angular/core";
import { ConfirmationService, CalendarModule } from "primeng/primeng";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddClienteService } from "./service/add-cliente.service";
import { AddPlanoService } from "../add-plano/services/add-plano.service";

@NgModule({
    declarations:[
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CalendarModule
    ],
    providers:[AddClienteService,
        ConfirmationService, 
    AddPlanoService]
})
export class AddClientModule{}