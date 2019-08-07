import { Cliente } from './models/cliente.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SelectItem, Message, ConfirmationService } from 'primeng/api';
import { Plano } from '../add-plano/models/plano.model';
import { AddClienteService } from './service/add-cliente.service';
import { DataTable } from 'primeng/primeng';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { from } from 'rxjs/observable/from';
import { AddPlanoService } from '../add-plano/services/add-plano.service';

@Component({
    selector: 'app-add-cliente',
    templateUrl: './add-cliente.component.html',
})
export class AddClienteComponent implements OnInit {

    display: boolean = false;
    clientes: Cliente[] = [];
    form: FormGroup;
    planos: Plano[] = [];
    planosSelect: SelectItem[];
    sexo: SelectItem[];
    cliente: Cliente = new Cliente();
    submitedForm = false;
    msgs: Message[] = [];
    dataBr: any;
    @BlockUI() blockUI: NgBlockUI;
    editar: boolean = false;
    novo: boolean = false;
    planoCliente: any;
    dataTable: DataTable;

    constructor(
        private formBuilder: FormBuilder,
        private clienteService: AddClienteService,
        private confirmationService: ConfirmationService,
        private planoService: AddPlanoService
    ) { }

    ngOnInit() {
        this.obterTodosClientes();
        this.obterPlanos();
        this.construirFormularioReativo();
        this.formatarCalendario();
        this.obterPlanos();
        this.sexo = [{ label: "Feminino", value: 1 }, { label: "Masculino", value: 2 }];
    }

    formatarCalendario() {
        this.dataBr = this.funcaoFormatarCalendario();
    }

    funcaoFormatarCalendario() {
        return {
            firstDayOfWeek: 1,
            dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
        };
    }


    obterTodosClientes() {
        this.clienteService.getClientes()
            .subscribe(clientes => this.clientes = clientes);

    }

    construirFormularioReativo() {
        this.form = this.formBuilder.group({
            id: new FormControl(''),
            nome: new FormControl('', Validators.required),
            dataNascimento: new FormControl('', Validators.required),
            sexo: new FormControl('', Validators.required),
            plano: new FormControl('', Validators.required)
        }, { updateOn: 'blur' });
    }

    obterPlanos() {
        this.planoService.getPlanos().subscribe(planos => {
            this.planos = planos;
            this.planosSelect = this.converterParaDropDown(this.planos, 'nome', 'idPlano');
            this.alertaPlanos();
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

    addCliente() {
        this.limparModal();
        this.novo = true;
        this.display = true;
    }

    deletarCliente(cliente: any, dataTable: DataTable) {
        this.confirmarDeletar(cliente, dataTable);
    }

    abrirEditar(cliente: any, data: DataTable) {
        this.dataTable = data;
        this.editar = true;
        this.buscarPlano(cliente.idPlano, cliente);
        cliente.dataNascimento = new Date(cliente.dataNascimento);
        cliente.sexo = this.converterSelecionadoParaNumber(cliente.sexo, this.sexo);
        this.cliente = cliente;
        this.display = true;
    }

    buscarPlano(idPlano , cliente) {
        cliente.plano = new Plano();
        this.planoService.getPlano(idPlano).subscribe(plano=>{
            cliente.plano = plano;
        });
    }

    atribuirSexoSelect(sexoCliente: any) {
        let obj = this.sexo.find(sexo => sexo.label === sexoCliente);
        return obj.value;

    }

    confirmarDeletar(cliente: any, dataTable: DataTable) {
        const icon = 'ui-icon-circle-close';
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este registro?',
            header: 'Exclusão de Registro',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.delete(cliente, dataTable);
            }
        });

    }

    delete(cliente: any, dataTable: DataTable): void {
        this.blockUI.start("Excluindo...");
        this.clienteService.deleteCliente(cliente.idCliente).subscribe(res => {
            let index = dataTable.value.indexOf(cliente);
            dataTable.value.splice(index, 1);
            this.clientes = dataTable.value;
            this.blockUI.stop();
        });
    }

    formatarMensagemExclusaoLonga(msgPadrao: any, msgComplemento: any, icone: any) {
        return '<div class="ui-g-2"><i class="ng-tns-c6-5 ' + icone +
         ' fa ng-star-inserted"></i></div><div class="ui-g-10 confirmTexto">' +
          msgPadrao + msgComplemento + '</div>';
    }

    isValidado(nomeCampo: string) {
        return ((!this.form.controls[nomeCampo].valid && this.form.controls[nomeCampo].touched)
        || (!this.form.controls[nomeCampo].valid && this.submitedForm));
    }

    salvar() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach(campo => {
                this.form.get(campo).markAsTouched();
            });

            this.submitedForm = true;
            return;
        }
        this.cliente.excluido = false;
        this.cliente.plano = this.converterSelecionadoParaObjeto(this.cliente.plano.idPlano, this.planos);
        this.cliente.sexo = this.converterSelecionadoParaString(this.cliente.sexo, this.sexo);

        if (this.novo) {
            this.novoCliente(this.cliente);
        }
        if (this.editar) {
            this.editarCliente(this.cliente);
        }


    }

    private novoCliente(cliente) {
        cliente.idPlano = cliente.plano.idPlano;
        this.clienteService.addCliente(cliente)
            .subscribe(cliente => {
                cliente.nomePlano = cliente.plano.nome;
                this.display = false;
                let clientes = [...this.clientes];
                clientes.push(cliente);
                this.clientes = clientes;
            });
    }

    private editarCliente(cliente) {
        this.clienteService.editCliente(cliente)
            .subscribe(res => {
                this.cliente.nomePlano = cliente.plano.nome;
                this.display = false;
                let index = this.dataTable.value.indexOf(cliente);
                this.dataTable.value.splice(index, 1);
                this.clientes = this.dataTable.value;
                let clientes = [...this.clientes];
                clientes.push(this.cliente);
                this.clientes = clientes;
            });
    }

    converterSelecionadoParaObjeto(select, lista) {
        let objeto = lista.find(element => element.idPlano == select);
        return objeto;
    }

    converterSelecionadoParaString(select, lista) {
        let objeto = lista.find(element => element.value == select);
        if (objeto.label == "Feminino") {
            return 'F';
        } else {
            return 'M'
        }
    }

    converterSelecionadoParaNumber(value, lista) {
        let string = '';
        if (value == "F") {
            string = "Feminino"
        } else {
            string = "Masculino"
        }
        let objeto = lista.find(element => element.label == string);
        return objeto.value;
    }

    verificarListaPlanos() {
        if (this.planos.length === 0) {
            return true;
        }
    }

    alertaPlanos() {
        if (this.verificarListaPlanos()) {
            this.msgs = [];
            this.msgs.push({ severity: 'warn', summary: 'Atenção', detail:
            'Para realizar o cadastro de um cliente é necessáio cadastrar um plano primeiramente.' });
        }
    }

    setSexo(sigla) {
        if (sigla == 'F') {
            return "Feminino";
        } else {
            return "Masculino";
        }

    }

    limparModal() {
        this.cliente = new Cliente();
        this.resetarFormulario();
    }

    resetarFormulario() {
        this.submitedForm = false;
        this.editar = false;
        this.form.reset();
    }
}
