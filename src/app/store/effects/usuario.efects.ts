import { UsuarioService } from './../../services/usuario.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuarioAcciones from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class UsuarioEfects {

    constructor(
      private actions$: Actions,
      private usuariosService: UsuarioService
    ) { }

    @Effect()
    cargarUsuario = this.actions$.ofType( usuarioAcciones.CARGAR_USUARIO )
                        .pipe(
                            switchMap( action => {
                                const id = action['id'];
                                return this.usuariosService.getUsuarioById( id )
                                           .pipe(
                                               map( user => new usuarioAcciones.CargarUsuarioSuccess( user ) ),
                                               catchError( error => of(new usuarioAcciones.CargarUsuarioFail( error ) ) )
                                           );
                            })
                        );

}
