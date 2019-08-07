import { DesvincularProcedimentoComponent } from './desvincular/desvincular-procedimento.component';
import { DataTable } from 'primeng/primeng';
import { VincularProcedimentoComponent } from './vincular-plano/vincular-procedimento.component';
import { PlanoProcedimento } from './models/plano-procedimento.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Plano } from './models/plano.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddPlanoService } from './services/add-plano.service';
import { SelectItem, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-add-plano',
    templateUrl: './add-plano.component.html',
})
export class AddPlanoComponent implements OnInit {

    planos: any[];

    display: boolean = false;
    displayVincular: boolean = false;
    plano: Plano = new Plano();
    form: FormGroup;
    submitedForm = false;
    planoProcedimento: PlanoProcedimento = new PlanoProcedimento();
    planosSelect: SelectItem[] = [];
    procedimentos: SelectItem[] = [];

    @ViewChild("dialogForm") dialogForm: VincularProcedimentoComponent;
    @ViewChild("dialogFormDesvincular") dialogFormDesvincular: DesvincularProcedimentoComponent;




    constructor(
        private formBuilder: FormBuilder,
        private planoService: AddPlanoService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit() {
        this.construirFormularioReativo();
        this.getPlanos();

    }

    getPlanos() {
        this.planoService.getPlanos().subscribe(planos => {
            this.planos = planos;
            this.planosSelect = this.converterParaDropDown(this.planos, 'nome', 'id');
        }
        );

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
            nome: new FormControl('', Validators.required),
        }, { updateOn: 'blur' });
    }

    addPlano() {
        this.limparModal();
        this.display = true;
    }

    limparModal() {
        this.plano = new Plano();
        this.resetarFormulario();
    }

    resetarFormulario() {
        this.submitedForm = false;
        this.form.reset();
    }

    deletarPlano(plano: any, dataTable: DataTable) {
        this.confirmarDeletar(plano, dataTable);
    }

    confirmarDeletar(plano: any, dataTable: DataTable) {
        const icon = 'ui-icon-circle-close';
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este registro?',
            header: 'Exclusão de Registro',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.delete(plano, dataTable);
            }
        });
    }

    delete(plano: any, dataTable: DataTable): void {
        this.planoService.deletePlano(plano.idPlano).subscribe(res => {
            let index = dataTable.value.indexOf(plano);
            dataTable.value.splice(index, 1);
            this.planos = dataTable.value;
        });
    }

    isValidado(nomeCampo: string) {
        return ((!this.form.controls[nomeCampo].valid && this.form.controls[nomeCampo].touched) || (!this.form.controls[nomeCampo].valid && this.submitedForm))
    }

    abrirVincular(plano) {
        this.dialogForm.abrirVincular(plano.idPlano);

    }

    abrirDesvincular(plano) {
        this.dialogFormDesvincular.abrirDesvincular(plano.idPlano);

    }

    salvar() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach(campo => {
                this.form.get(campo).markAsTouched();
            });

            this.submitedForm = true;
            return;
        }

            this.novoPlano();

    }

    novoPlano() {
        this.plano.excluido = false;
        this.planoService.addPlano(this.plano)
            .subscribe(plano => {
                let planos = [...this.planos];
                planos.push(plano);
                this.planos = planos;
                this.display = false;
            });
    }
}
