import {
    LISTAR_TODOS_ANUNCIOS,
    IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO,
    SOURCES,
    PAGE_OFFSET,
    IMAGENS_ANUNCIO
} from '../../constants/constants'

/**
 * 
 * created by: @author Felipe Miguel dos Santos
 * 
 * @param {* Estado corrente} state 
 * @param {* Ações} action 
 * @version 0.0.1
 */

 const INIT_STATE = {
    result: [{}],
    idsRemovidos: [{}],
    sources: [{}],
    isLoading: true,
    page: 1,
    urlImage: []
 }


function anuncioReducer(state = INIT_STATE, action){
    switch(action.type){
        case LISTAR_TODOS_ANUNCIOS:
            return {...state, result: action.data, isLoading: action.isLoading}
        case IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO: 
            return {...state, idsRemovidos: action.data}
        case SOURCES:
            return {...state, sources: action.data}
        case PAGE_OFFSET:
            return {...state, page: action.data}
        case IMAGENS_ANUNCIO:
            return {...state, urlImage: action.data}                    
         default:     
             return {...state};   
    }
}

export default anuncioReducer
