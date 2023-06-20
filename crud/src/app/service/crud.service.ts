import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private urlApiClientes = 'https://localhost:7083/Clientes';

  private urlApiEmpresas = 'https://localhost:7083/Empresas';

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<any>{
    return this.http.get<any>(this.urlApiClientes);
  }

  public postCliente(cliente:any): Observable<any>{
    return this.http.post<any>(this.urlApiClientes + '/Create', cliente);
  }

  public editCliente(cliente:any): Observable<any>{
    return this.http.put<any>(this.urlApiClientes + '/Edit/' + cliente.clienteId, cliente);
  }

  public deleteCliente(id:number): Observable<any>{
    return this.http.delete<any>(this.urlApiClientes + '/Delete/' + id);
  }

  public getEmpresas(): Observable<any>{
    return this.http.get<any>(this.urlApiEmpresas);
  }

  public postEmpresa(empresa:any): Observable<any>{
    return this.http.post<any>(this.urlApiEmpresas + '/Create', empresa);
  }

  public editEmpresa(empresa:any): Observable<any>{
    return this.http.put<any>(this.urlApiEmpresas + '/Edit/' + empresa.idEmpresa, empresa);
  }

  public deleteEmpresa(id:number): Observable<any>{
    return this.http.delete<any>(this.urlApiEmpresas + '/Delete/' + id);
  }
}
