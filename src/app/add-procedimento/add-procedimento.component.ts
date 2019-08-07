import { Procedimento } from './models/procedimento.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddProcedimentoService } from './services/add-procedimento.service';
import { DataTable, ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'app-add-procedimento',
    templateUrl: './add-procedimento.component.html',
})
export class AddProcedimentoComponent implements OnInit {

    clientes: any[];

    display: boolean = false;
    procedimento: Procedimento = new Procedimento();
    procedimentos: Procedimento[] = [];

    form: FormGroup;
    submitedForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private procedimentoService: AddProcedimentoService,
        private confirmationService: ConfirmationService

    ) { }

    ngOnInit() {
        this.getProcedimentos();
        this.construirFormularioReativo();

        this.clientes = [{ nome: "Bernado", dataNascimento: "08/05/1995", sexo: "Masculino", procedimento: "Ouro" }]
    }

    getProcedimentos() {
        this.procedimentoService.getProcedimentos().subscribe(procedimentos =>
            this.procedimentos = procedimentos
        );
    }

    construirFormularioReativo() {
        this.form = this.formBuilder.group({
            id: new FormControl(''),
            nome: new FormControl('', Validators.required),
        }, { updateOn: 'blur' });
    }


    addProcedimento() {
        this.display = true;
    }

    selectCliente(cliente: any) {
    }


    isValidado(nomeCampo: string) {
        return ((!this.form.controls[nomeCampo].valid && this.form.controls[nomeCampo].touched) || (!this.form.controls[nomeCampo].valid && this.submitedForm))
    }

    salvar() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach(campo => {
                this.form.get(campo).markAsTouched();
            });

            this.submitedForm = true;
            return;
        }

        this.procedimento.excluido = false;
        this.procedimentoService.addProcedimento(this.procedimento)
            .subscribe(procedimento => {
                let procedimentos = [...this.procedimentos];
                procedimentos.push(this.procedimento);


                this.procedimentos = procedimentos;
                this.display = false;
            });

    }

    deletarProcedimento(procedimento: any, dataTable: DataTable) {
        this.confirmarDeletar(procedimento, dataTable);
    }

    confirmarDeletar(procedimento: any, dataTable: DataTable) {
        const icon = 'ui-icon-circle-close';
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este registro?',
            header: 'Exclusão de Registro',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.delete(procedimento, dataTable);
            }
        });
    }

    delete(procedimento: any, dataTable: DataTable) {
        this.procedimentoService.deleteProcedimento(procedimento.id).subscribe(res => {
            let index = dataTable.value.indexOf(procedimento);
            dataTable.value.splice(index, 1);
            this.procedimentos = dataTable.value;
        });

    }
}
