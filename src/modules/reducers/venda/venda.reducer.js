import {
    GET_VENDAS_PENDENTES,
    GET_VENDAS_CONCLUIDAS,
    GET_VENDAS_EM_TRANSITO,
    GET_VENDAS_A_ENVIAR,
    GET_TOTAL_VENDAS,
    GET_TOTAL_VENDAS_EM_TRANSITO,
    GET_TOTAL_VENDAS_A_ENVIAR,
    GET_TOTAL_VENDAS_PENDENTES,
    UPDATE_VENDAS
} from '../../constants/constants'


const INITIAL_STATE = {
    vendas: [],
    isLoading: true,
    qtdeVendasConcluidas: 0,
    qtdeVendasCanceladas: 0,
    qtdeVendasEmTransito: 0,
    qtdeVendasPendentes: 0,
    qtdeVendasAEnviar: 0,

    isLoadingVendasPendentes: true,
    isLoadingVendasConcluidas: true,
    isLoadingVendasEmTransito: true,

    isLoadingQtdeVendasAEnviar: true,
    isLoadingQtdeVendasEmTransito: true,
    isLoadingVendasAEnviar: true
}

export default function vendaReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_VENDAS_PENDENTES: {
            if(action.vendasPendentes.data !== null) {
                let vendas = state.vendas
                action.vendasPendentes.data.map(venda => {
                    vendas.push(venda)
                })
                return {
                    ...state,
                    isLoadingVendasPendentes: false,
                    vendas: vendas
                }
            }
        }
        case GET_VENDAS_CONCLUIDAS: {
            if(action.vendasConcluidas.data !== null) {
                let vendas = state.vendas
                action.vendasConcluidas.data.map(venda => {
                    vendas.push(venda)
                })
                return {
                    ...state,
                    isLoadingVendasConcluidas: false,
                    vendas: vendas
                }
            }
        }
        case UPDATE_VENDAS: {
            let vendas = state.vendas
            vendas = action.data
            return {
                ...state,
                vendas: vendas
            }
        }
       case GET_VENDAS_EM_TRANSITO: {
            if(action.vendasEmTransito.data !== null){
                let vendas = state.vendas
                let temp = action.vendasEmTransito.data.filter(venda => venda.dados_entrega.status === 'shipped')
                if(temp.length > 0){
                    temp.map(t => {vendas.push(t)})
                }
                return {
                    ...state,
                    isLoadingVendasEmTransito: false,
                    vendas: vendas
                }
            }
        }
        case GET_VENDAS_A_ENVIAR: {
            if (action.vendasAEnviar !== null) {
                let vendas = state.vendas
                action.vendasAEnviar.map(venda => {
                    vendas.push(venda)
                })
                return {
                    ...state,
                    vendas: vendas
                }
            }
        }
        case GET_TOTAL_VENDAS: {
            return {
                ...state,
                qtdeVendasConcluidas: action.qtdeVendasConcluidas,
                qtdeVendasCanceladas: action.qtdeVendasCanceladas,
                isLoading: false
            }
        }
        case GET_TOTAL_VENDAS_EM_TRANSITO: {
            return {
                ...state,
                qtdeVendasEmTransito: action.qtdeVendasEmTransito,
                isLoadingQtdeVendasEmTransito: false
            }
        }
        case GET_TOTAL_VENDAS_A_ENVIAR: {
            return {
                ...state,
                qtdeVendasAEnviar: action.qtdeVendasAEnviar,
                isLoadingQtdeVendasAEnviar: false
            }

        }
        case GET_TOTAL_VENDAS_PENDENTES: {
            return {
                ...state,
                qtdeVendasPendentes: action.qtdeVendasPendentes,
                isLoading: false
            }
        }
        default: {
            return { ...state }
        }
    }
}