import {LISTAR_TODOS_CLIENTES, PAGE_OFFSET_CLIENTE} from '../../constants/constants'

const INIT_STATE = {
    result: [{}], 
    isLoading: true,
    page: 1
}

export default function clienteReducer(state = INIT_STATE, action){
    switch(action.type){
        case LISTAR_TODOS_CLIENTES: {
            return {...state, result: action.data, isLoading: action.isLoading}
        }
        case PAGE_OFFSET_CLIENTE: {
            return {...state, page: action.data}
        }
        default:
            return state
    }
}