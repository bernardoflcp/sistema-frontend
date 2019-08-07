import { Cliente } from './../models/cliente.model';
import { Injectable } from "@angular/core";
import { Observable  } from 'rxjs';
import { Headers, RequestOptions, Response, Http } from "@angular/http";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';


@Injectable()
export class AddClienteService {

    resourceClienteUrl = 'api/sistema/rest/cliente';

    constructor(private http: HttpClient) {}



    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      httpOptionsEditar = {
        headers: new HttpHeaders({ responseType: 'text' })
      };

    addCliente (cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.resourceClienteUrl + '/cadastrar', cliente, this.httpOptions).pipe(
          tap((novoCliente: Cliente) => this.log(`added hero cliente/ id=${novoCliente.idCliente}`)),
          catchError(this.handleError<Cliente>('addCliente'))
        );
      }

      editCliente (cliente: Cliente): Observable<Cliente> {
        return this.http.put(this.resourceClienteUrl + '/editar', cliente, { responseType: 'text' }).map(res=>{
            try{
                return JSON.parse(res);
            } catch{
                return null;
            }
        });
      }

      private convert(cliente: Cliente): Cliente {
        const copy: Cliente = Object.assign({}, cliente);
        return copy;
      }

      private convertItemFromServer(json: any): Cliente {
        const entity: Cliente = Object.assign(new Cliente(), json);
        return entity;
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          this.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
      }

      private log(message: string) {
        console.log(message);
    }


      getClientes (): Observable<Cliente[]> {
          return this.http.get<Cliente[]>(this.resourceClienteUrl+'/listar');
      }

      deleteCliente (id: number): Observable<Cliente> {
        return this.http.delete<Cliente>(this.resourceClienteUrl + '/excluir/' + id, this.httpOptions);
      }

      solicitarPersmissao(idCliente: number, idProcedimento: number): Observable<boolean> {;
        return this.http.post<boolean>(this.resourceClienteUrl + '/solicitarProcedimento/'+ idCliente + '/' + idProcedimento, this. httpOptions);
      }

}