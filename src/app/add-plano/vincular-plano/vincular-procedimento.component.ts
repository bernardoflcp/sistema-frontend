import { AddPlanoService } from './../services/add-plano.service';
import { AddProcedimentoService } from './../../add-procedimento/services/add-procedimento.service';
import { PlanoProcedimento } from './../models/plano-procedimento.model';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-vincular-procedimento',
    templateUrl: './vincular-procedimento.component.html',
})
export class VincularProcedimentoComponent implements OnInit {

    displayVincular: boolean = false;
    procedimentos: any[] = [];
    procedimentosSelect: SelectItem[] = [];
    planoProcedimento: PlanoProcedimento = new PlanoProcedimento();
    form: FormGroup;
    submitedForm = false;
    idPlano: number;

    constructor(
        private formBuilder: FormBuilder,
        private procediementoService: AddProcedimentoService,
        private planoService: AddPlanoService

    ) {

    }
    ngOnInit() {
        this.construirFormularioReativo();
        this.obterProcedimentos();
    }

    obterProcedimentos() {
        this.procediementoService.getProcedimentos().subscribe(procedimentos => {
            this.procedimentos = procedimentos;
            this.procedimentosSelect = this.converterParaDropDown(this.procedimentos, 'nome', 'id');
        });
    }

    converterParaDropDown(lista: any[], nomeCampo, valorCampo) {
        const items: SelectItem[] = [];
        lista.forEach(item => {
            items.push({
                label: item[nomeCampo], value: item[valorCampo]
            });
        });
        return items;
    }

    construirFormularioReativo() {
        this.form = this.formBuilder.group({
            idProcedimento: new FormControl('', Validators.required),
        }, { updateOn: 'blur' });
    }

    isValidado(nomeCampo: string) {
        return ((!this.form.controls[nomeCampo].valid && this.form.controls[nomeCampo].touched) ||
         (!this.form.controls[nomeCampo].valid && this.submitedForm));
    }

    vincular() {
        this.planoService.vincular(this.idPlano, this.planoProcedimento.idProcedimento).subscribe(res=>{
            this.displayVincular = false;

        });
    }

    abrirVincular(idPlano) {
        this.limparModal();
        this.idPlano = idPlano;
        this.displayVincular = true;
    }

    limparModal() {
        this.planoProcedimento = new PlanoProcedimento();
        this.resetarFormulario();
    }

    resetarFormulario() {
        this.submitedForm = false;
        this.form.reset();
    }
}