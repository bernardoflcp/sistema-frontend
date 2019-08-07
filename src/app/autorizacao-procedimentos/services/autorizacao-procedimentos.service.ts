import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AutorizacaoProcedimentos } from "../models/autorizacao-procedimentos.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddAutorizacaoProcedimentosService {

    resourceUrl = 'api/sistema/rest/solicitacao';
    url = "api/autorizacoes";

    constructor(
    private http: HttpClient) {}


      getAutorizacaoProcedimentos (): Observable<AutorizacaoProcedimentos[]> {
        return this.http.get<AutorizacaoProcedimentos[]>(this.resourceUrl + '/listar');
      }
}