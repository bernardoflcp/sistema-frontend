import { AddAutorizacaoProcedimentosService } from './services/autorizacao-procedimentos.service';
import { AddClienteService } from './../add-cliente/service/add-cliente.service';
import { AddProcedimentoService } from './../add-procedimento/services/add-procedimento.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AutorizacaoProcedimentos } from './models/autorizacao-procedimentos.model';
import { SelectItem, Message } from 'primeng/api';

@Component({
    selector: 'app-autorizacao-procedimentos',
    templateUrl: './autorizacao-procedimentos.component.html',
})
export class AutorizacaoProcedimentosComponent implements OnInit {


    display: boolean = false;
    autorizacao: AutorizacaoProcedimentos = new AutorizacaoProcedimentos();
    form: FormGroup;
    submitedForm = false;
    autorizacoes: any;
    procedimentos: any[] = [];
    procedimentosSelect: SelectItem[] = [];
    clientes: any[] = [];
    clientesSelect: SelectItem[] = [];
    msgs: Message[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private procediementoService: AddProcedimentoService,
        private clienteService: AddClienteService,
        private solicitarService: AddAutorizacaoProcedimentosService
    ) { }

    ngOnInit() {
        this.obterAutorizacoes();
        this.construirFormularioReativo();
        this.obterProcedimentos();
        this.obterClientes();
    }

    obterAutorizacoes() {
        this.solicitarService.getAutorizacaoProcedimentos()
        .subscribe(autorizacoes => this.autorizacoes = autorizacoes);
    }

    obterProcedimentos() {
        this.procediementoService.getProcedimentos().subscribe(procedimentos => {
            this.procedimentos = procedimentos;
            this.procedimentosSelect = this.converterParaDropDown(this.procedimentos, 'nome', 'id');
        });
    }

    obterClientes() {
        this.clienteService.getClientes().subscribe(clientes => {
            this.clientes = clientes;
            this.clientesSelect = this.converterParaDropDown(this.clientes, 'nome', 'idCliente');
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
            id: new FormControl(''),
            cliente: new FormControl('', Validators.required),
            procedimento: new FormControl('', Validators.required)
        }, { updateOn: 'blur' });
    }


    addAutorizacao() {
        this.limparModal();
        this.display = true;
    }

    limparModal() {
        this.autorizacao = new AutorizacaoProcedimentos();
        this.resetarFormulario();
    }

    resetarFormulario() {
        this.submitedForm = false;
        this.form.reset();
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

            this.solicitar();
    }


    solicitar() {
        this.clienteService.solicitarPersmissao(this.autorizacao.cliente.idCliente, this.autorizacao.procedimento.id)
            .subscribe(autorizacao => {
                if(autorizacao == false){
                    this.atencao();
                }
                if(autorizacao == true) {
                    this.sucesso();
                }
                this.obterAutorizacoes();
                this.display = false;
            });
    }

    atencao() {
        this.msgs = [];
        this.msgs.push({severity:'warn', summary:'Atenção:', detail:'Plano do cliente não cobre o procedimento informado!'});
    }

    sucesso() {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'', detail:'Plano do cliente cobre o procedimento informado!'});
    }

    setAutorizado(value){
        if (value == true){
            return "Autorizado";
        }
        if(value==false) {
            return "Não Autorizado";
        }

    }
}
