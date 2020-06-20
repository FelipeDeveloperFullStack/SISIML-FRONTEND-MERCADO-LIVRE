import {createStore} from 'redux';
import {reducers} from './modules/reducers/combine.reducer'
//import {anuncioReducer} from './modules/reducers/anuncio/anuncio-reducer';

/**
 * Criado por:
 * @author Felipe Miguel dos Santos
 * 
 */

export const store = createStore(reducers);

store.subscribe(() => {
    console.log("> Store foi modificada: ", store.getState())
});