import { Plano } from './../models/plano.model';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AddPlanoService {

    resourcePlanoUrl = 'api/sistema/rest/plano';
    url = "api/planos";

    constructor(private http: HttpClient,

        private messageService: MessageService) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    addPlano(plano: Plano): Observable<Plano> {
        return this.http.post<Plano>(this.resourcePlanoUrl + '/cadastrar', plano, this.httpOptions).pipe(
            tap((novoPlano: Plano) => this.log(`added hero w/ id=${novoPlano.idPlano}`)),
            catchError(this.handleError<Plano>('addpLANO'))
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

    getPlanos(): Observable<Plano[]> {
        return this.http.get<Plano[]>(this.resourcePlanoUrl + '/listar');

    }

    deletePlano(id: number): Observable<Plano> {
        return this.http.delete<Plano>(this.resourcePlanoUrl + '/excluir/' + id, this.httpOptions);
    }

    getPlano(idPlano: number): Observable<Plano> {
        return this.http.get<Plano>(this.resourcePlanoUrl + '/buscarPlano/' + idPlano);
    }

    vincular(idPlano: number, idProcedimento): Observable<any> {
        return this.http.post(this.resourcePlanoUrl + '/vincular/' + idPlano + '/' + idProcedimento, this.httpOptions).pipe(
            tap((novoPlano: any) => this.log('...')),
            catchError(this.handleError<Plano>('addpLANO'))
        );
    }

    desvincular(idPlano: number, idProcedimento): Observable<any> {
        return this.http.post(this.resourcePlanoUrl + '/desvincular/' + idPlano + '/' + idProcedimento, this.httpOptions).pipe(
            tap((novoPlano: any) => this.log('...')),
            catchError(this.handleError<Plano>('addpLANO'))
        );
    }

}