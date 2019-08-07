import {Component, OnInit} from '@angular/core';
import {AppComponent} from "./app.component";
import {SelectItem} from "primeng/api";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    display: boolean = false;
    active: boolean;
    languages: any[];
    selectedLanguage: any;
    systemName: string = "SCPF  - Sistema de Contagem de Pontos de Função"

    constructor(public app: AppComponent) {

    }

    ngOnInit() {

    }

    showDialog() {
        this.display = true;
    }

    changeLanguage(event) {

    }

    converterToDropDown(lista: any[], fieldName, fieldValue) {
        const items: SelectItem[] = [];
        lista.forEach(item => {
            items.push({
                label: item[fieldName], value: item[fieldValue]
            });
        });
        return items;
    }

}
