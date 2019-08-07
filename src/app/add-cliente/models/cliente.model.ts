import { Plano } from './../../add-plano/models/plano.model';
export class Cliente {
    constructor(
        public idCliente?: number,
        public nome?: string,
        public dataNascimento?: Date,
        public sexo?: string,
        public plano?: Plano,
        public nomePlano?: string,
        public excluido?: boolean) {
            this.plano = new Plano();

    }
}