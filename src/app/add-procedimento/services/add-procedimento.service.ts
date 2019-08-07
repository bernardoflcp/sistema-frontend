import { Procedimento } from './../models/procedimento.model';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AddProcedimentoService {

    resourceProcedimentoUrl = 'api/sistema/rest/procedimento';

    constructor(private http: HttpClient,

        private messageService: MessageService) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    addProcedimento(procedimento: Procedimento): Observable<Procedimento> {
        return this.http.post<Procedimento>(this.resourceProcedimentoUrl + '/cadastrar', procedimento, this.httpOptions).pipe(
            tap((novoProcedimento: Procedimento) => this.log(`added hero w/ id=${novoProcedimento.id}`)),
            catchError(this.handleError<Procedimento>('addProcedimento'))
        );
    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }

    getProcedimentos(): Observable<Procedimento[]> {
        return this.http.get<Procedimento[]>(this.resourceProcedimentoUrl + '/listar');

    }

    deleteProcedimento(id: number): Observable<Procedimento> {
        return this.http.delete<Procedimento>(this.resourceProcedimentoUrl + '/excluir/' + id, this.httpOptions);
    }

    getProcedimentosPorPlano(idPlano: number): Observable<Procedimento[]> {
        return this.http.get<Procedimento[]>(this.resourceProcedimentoUrl + '/listarPorPlano/'+idPlano);

    }
}