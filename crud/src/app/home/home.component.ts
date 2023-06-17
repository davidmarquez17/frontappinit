import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any[] = [];

  constructor(private crudService: CrudService){

  }

  ngOnInit(): void {
    //this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.crudService.getData().subscribe( data => {
      this.data = data;
      console.log(this.data);
    })
  }
}