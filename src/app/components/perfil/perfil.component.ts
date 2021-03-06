import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';
import { Provedor } from '../../models/provedor';
import { Medico } from '../../models/medico';
import { ProvedorService } from '../../services/provedor.service';
import { MedicoService } from '../../services/medico.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UserService, Global, ProvedorService, MedicoService]
})
export class PerfilComponent implements OnInit {
  public identity;
  public provedor: Provedor;
  public medico: Medico;
  public ver;
  public campo;
  public status: string;
  public res;
  public mymodel;


  constructor(public _userService: UserService, public global: Global, public _provedorService: ProvedorService,
              public _medicoService: MedicoService) {

  }

  ngOnInit() {

    this.getIdentity();
  }

  getIdentity() {

    var user = this._userService.getIdentity();

    if (user.medico_id) {
      this.medico = new Medico('', '', '', '', '', '', '', '', '', '', '', '', '');

      this.medico = user;
      this.medico.id = user.medico_id;
      this.mymodel = 'informacion';
      console.log(this.medico);

      // let info = {nombres : this.datosMedico.value.nombres,
      // apellidos:this.datosMedico.value.apellidos , titulo : this.datosMedico.value.especialidad,
      //   telefono:telefono , wp:wp , id:this.global.id_usuario, estudios:contenedor }
    }

    if (user.id_provedor) {
      this.provedor = new Provedor ('' , '', '', '', '', '', '', '', '', '', '', '');
      this.provedor = user;
      this.provedor.id = user.id_provedor ;
    }
  }

  mouseEnter(campo) {
    this.ver = campo;
  }

  mouseLeave() {
    this.ver = '';
  }

  editar(campo) {
    this.campo = document.getElementById(campo);
    this.campo.readOnly = false;
  }

  cambio(campo) {
    this.campo = document.getElementById(campo);
    this.campo.readOnly = true;
  }

  editarProvedor() {

    console.log(this.provedor);
    let token = this._userService.getToken();
    this._provedorService.editProv(this.provedor, token).subscribe( (response) => {
      this.res = response;
      if (this.res.update === true) {
        this.status = 'update';
        localStorage.removeItem('identity');
        localStorage.setItem('identity', JSON.stringify(this.provedor));
        this.getIdentity();
      } else {
        this.status = 'no_update';
      }
    }, (err) => {
      console.log(err);
    });
  }

  pestana(pestana) {
    var li = document.getElementById(pestana);
    document.getElementById(pestana).addEventListener('click', function() {

      if (li.id === 'informacion')  {

        let l = document.getElementById('estudios');
        l.className = 'list-group-item';
        li.className = 'list-group-item active';
      } else {
        let l = document.getElementById('informacion');
        l.className = 'list-group-item';
        li.className = 'list-group-item active';
      }
    });
    this.mymodel = pestana;


    console.log(li);
  }
}


