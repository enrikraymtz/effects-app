import { UsuarioService } from './../../services/usuario.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuariosAcciones from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class UsuariosEfects {

    constructor(
      private actions$: Actions,
      private usuariosService: UsuarioService
    ) { }

    @Effect()
    cargarUsuarios = this.actions$.ofType( usuariosAcciones.CARGAR_USUARIOS )
                        .pipe(
                            switchMap( () => {
                                return this.usuariosService.getUsuarios()
                                           .pipe(
                                               map( users => new usuariosAcciones.CargarUsuariosSuccess( users ) ),
                                               catchError( error => of(new usuariosAcciones.CargarUsuariosFail( error ) ) )
                                           );
                            })
                        );

}
