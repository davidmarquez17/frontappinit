import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  clientes: any[] = [];
  empresas: any[] = [];
  nombreEmpresa:any;
  direccionEmpresa:any;
  idEmpresa:any;
  nombreCliente:any;
  apellidoCliente:any;
  clienteId:any;
  empresaCliente: any;
  constructor(private crudService: CrudService){

  }

  async ngOnInit(): Promise<any> {
    await this.obtenerEmpresas();
    this.obtenerClientes();    
  }

  async obtenerClientes(){
    this.crudService.getClientes().subscribe( async data => {
      var clientes = await this.asignarNombreEmpresa(data);
      this.clientes = clientes;
    })
  }

  agregarCliente(){
    let newCliente = {
      "nombre": this.nombreCliente,
      "apellido": this.apellidoCliente,
      "empresa": this.empresas.find(emp => emp.nombre === this.empresaCliente).idEmpresa
    }
    this.crudService.postCliente(newCliente).subscribe( res => {
      this.obtenerClientes();
    })
  }

  editarCliente(){
    let editCliente = {
      "nombre": this.nombreCliente,
      "apellido": this.apellidoCliente,
      "empresa":this.empresas.find(emp => emp.nombre === this.empresaCliente).idEmpresa,
      "clienteId": this.clienteId
    }
    this.crudService.editCliente(editCliente).subscribe( res => {
      this.obtenerClientes();
    })
  }

  eliminarCliente(id:number){
    this.crudService.deleteCliente(id).subscribe( res => {
      this.obtenerClientes();
    })
  }

  clienteAEditar(nombre:string, apellido:string, id:number, empresa:number){
    this.nombreCliente = nombre;
    this.apellidoCliente = apellido;
    this.clienteId = id;
    this.empresaCliente = empresa;
  }

  async obtenerEmpresas(){
    this.crudService.getEmpresas().subscribe( async data => {      
      this.empresas = data;
    })
  }

  agregarEmpresa(){
    let newEmpresa = {
      "nombre": this.nombreEmpresa,
      "direccion": this.direccionEmpresa
    }
    this.crudService.postEmpresa(newEmpresa).subscribe( res => {
      this.obtenerEmpresas();
    })
  }

  editarEmpresa(){
    let editEmpresa = {
      "nombre": this.nombreEmpresa,
      "direccion": this.direccionEmpresa,
      "idEmpresa": this.idEmpresa
    }
    this.crudService.editEmpresa(editEmpresa).subscribe( res => {
      this.obtenerEmpresas();
    })
  }

  eliminarEmpresa(id:number){
    this.crudService.deleteEmpresa(id).subscribe( res => {
      this.obtenerEmpresas();
    })
  }

  empresaAEditar(nombre:string, direccion:string, id:number){
    this.nombreEmpresa = nombre;
    this.direccionEmpresa = direccion;
    this.idEmpresa = id;    
  }

  async asignarNombreEmpresa(data:any[]){
    let clientes = data;
    for (let i = 0; i < clientes.length; i++) {
      clientes[i].nombreEmpresa = this.empresas.find(emp => emp.idEmpresa === data[i].empresa).nombre;
    }
    return clientes;
  }
}