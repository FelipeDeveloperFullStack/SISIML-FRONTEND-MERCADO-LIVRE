import React from 'react'
import {
    GET_VENDAS_PENDENTES,
    GET_VENDAS_CONCLUIDAS,
    GET_VENDAS_EM_TRANSITO,
    GET_VENDAS_A_ENVIAR,
    GET_TOTAL_VENDAS,
    GET_TOTAL_VENDAS_EM_TRANSITO,
    GET_TOTAL_VENDAS_A_ENVIAR,
    GET_TOTAL_VENDAS_PENDENTES,
    DOMAIN
} from '../../constants/constants'
import axios from 'axios'
import swal from 'sweetalert'
import { connect } from 'react-redux'

class CallApiVenda extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        this.callAPI()
    }

    callAPI = async () => {
        let userId = String(localStorage.getItem('@sigiml/id'))

        await axios.get(`${DOMAIN}/vendas/getVendasPendentes/get01/get02/get03/${userId}`).then(vendasPendentes => {
            this.props.vendasPendentes(vendasPendentes)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getVendasConcluidas/get01/get02/${userId}`).then(vendasConcluidas => {
            if (vendasConcluidas !== null) {
                this.props.vendasConcluidas(vendasConcluidas)
            }
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getVendasEmTransito/get01/get02/get03/get04/get05/${userId}`).then(vendasEmTransito => {
            this.props.vendasEmTransito(vendasEmTransito)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        /*await axios.get(`${DOMAIN}/vendas/getVendasAEnviar/get01/get02/get03/get04/get05/${userId}`).then(vendasAEnviar => {
           this.props.vendasAEnviar(vendasAEnviar)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })*/

        await axios.get(`${DOMAIN}/vendas/getTotalVendas/get01/get02/get03/get04/get05/get06/${userId}`).then(totalVendas => {
            this.props.totalVendas(totalVendas)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasEmTransito/get01/get02/get03/get04/get05/get06/get07/${userId}`).then(totalVendasEmTransito => {
            this.props.totalVendasEmTransito(totalVendasEmTransito)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasAEnviar/get01/get02/get03/get04/get05/get06/get07/get08/${userId}`).then(totalVendasAEnviar => {
            this.props.totalVendasAEnviar(totalVendasAEnviar)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasPendentes/get01/get02/get03/get04/get05/get06/get07/get08/get09/${userId}`).then(totalVendasPendentes => {
            this.props.totalVendasPendentes(totalVendasPendentes)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })
    }

    render() {
        return (
            <></>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        vendasPendentes: (vendasPendentes) => {
            dispatch({
                type: GET_VENDAS_PENDENTES,
                vendasPendentes: vendasPendentes
            })
        },
        vendasConcluidas: (vendasConcluidas) => {
            dispatch({
                type: GET_VENDAS_CONCLUIDAS,
                vendasConcluidas: vendasConcluidas
            })
        },
        vendasEmTransito: (vendasEmTransito) => {
            dispatch({
                type: GET_VENDAS_EM_TRANSITO,
                vendasEmTransito: vendasEmTransito
            })
        },
        vendasAEnviar: (vendasAEnviar) => {
            dispatch({
                type: GET_VENDAS_A_ENVIAR,
                vendasAEnviar: vendasAEnviar
            })
        },
        totalVendas: (totalVendas) => {
            dispatch({
                type: GET_TOTAL_VENDAS,
                qtdeVendasConcluidas: totalVendas.data.qtdeVendasConcluidas,
                qtdeVendasCanceladas: totalVendas.data.qtdeVendasCanceladas
            })
        },
        totalVendasEmTransito: (totalVendasEmTransito) => {
            dispatch({
                type: GET_TOTAL_VENDAS_EM_TRANSITO,
                qtdeVendasEmTransito: totalVendasEmTransito.data.qtdeVendasEmTransito,
                isLoadingQtdeVendasEmTransito: false
            })
        },
        totalVendasAEnviar: (totalVendasAEnviar) => {
            dispatch({
                type: GET_TOTAL_VENDAS_A_ENVIAR,
                qtdeVendasAEnviar: totalVendasAEnviar.data.qtdeVendasAEnviar,
                isLoadingQtdeVendasAEnviar: false
            })
        },
        totalVendasPendentes: (totalVendasPendentes) => {
            dispatch({
                type: GET_TOTAL_VENDAS_PENDENTES,
                qtdeVendasPendentes: totalVendasPendentes.data.qtdeVendasPendentes,
                isLoading: false
            })
        }
    })
}

export default connect(null, mapDispatchToProps)(CallApiVenda)

