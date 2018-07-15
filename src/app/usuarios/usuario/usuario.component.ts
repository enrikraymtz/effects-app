import { CargarUsuario } from './../../store/actions/usuario.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  user: Usuario;
  loading: boolean;
  error: any;

  constructor( private router: ActivatedRoute,
               private store: Store<AppState> ) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        const id = params['id'];
        console.log( id );
        this.store.dispatch( new CargarUsuario(id) );
      }
    );
    this.store.select('usuario')
        .subscribe( user => {
          this.user = user.user;
          this.loading = user.loading;
          this.error = user.error;
        });
  }

}
