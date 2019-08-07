import { Procedimento } from '../../add-procedimento/models/procedimento.model';
import { Cliente } from '../../add-cliente/models/cliente.model';
export class AutorizacaoProcedimentos {
    constructor(public id?: number,
        public cliente?: Cliente,
        public procedimento?: Procedimento,
        public autorizado?: boolean) {
            this.cliente = new Cliente();
            this.procedimento = new Procedimento();

    }
}