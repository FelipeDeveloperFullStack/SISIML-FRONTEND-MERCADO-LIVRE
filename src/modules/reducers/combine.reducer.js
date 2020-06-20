import {combineReducers} from 'redux';
import anuncioReducer from './anuncio/anuncio.reducer';
import clienteReducer from './cliente/cliente.reducer';
import dashboardReducer from './dashboard/dashboard.reducer'
import sidebarReducer from './Sidebar/sidebar.reducer'
import vendaReducer from './venda/venda.reducer'
import perguntasReducer from './perguntas/perguntas.reducer'

/**
 * Created by: 
 * @name Felipe Miguel dos Santos
 * @version 0.0.1
 */

export const reducers = combineReducers({
    anuncio: anuncioReducer,
    cliente: clienteReducer,
    dashboard: dashboardReducer,
    sidebar: sidebarReducer,
    venda: vendaReducer,
    perguntas: perguntasReducer
});
