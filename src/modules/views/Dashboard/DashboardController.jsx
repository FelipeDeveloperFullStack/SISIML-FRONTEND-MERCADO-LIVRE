import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'
import { useSelector, useDispatch } from 'react-redux'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import swal from 'sweetalert'

import {
    OBTER_SALDO_TOTAL,
    OBTER_TOTAL_VENDAS_NO_MES,
    OBTER_VENDAS_PENDENTE,
    OBTER_STATUS_ANUNCIOS,
    GET_PERGUNTAS,
    UPDATE_ATIVIDADE_DIARIO,
    GET_TOTAL_MENSAGENS_NAO_LIDAS
}
    from '../../constants/constants'
import { DOMAIN } from '../../constants/constants'

export default function DashboardController() {

    const dispatch = useDispatch()
    const state = useSelector(store => store.dashboard)
    const statePerguntas = useSelector(store => store.perguntas)
    const [comunicado, setComunicado] = useState({})

    document.title = "Dashboard"
    /*
        setInterval(()=>{
            get()
        }, 60000)
    */

    //https://apexcharts.com/docs/react-charts/


    let options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    }
    let series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]

    useEffect(() => {
        get()

    }, [])

    const dataFaturamento = {
        labels: ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020', '08/2020', '09/2020', '10/2020', '11/2020', '12/2020'],
        datasets: [
            {
                label: 'Faturamento',
                data: [500.50, 657.98, 789.98, 547.98, 365.65, 568.98, 698.98, 780.98, 890.65, 654.32, 345.78, 456.87, 568.98, 780.90],
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            }
        ]
    };

    const dataVendas = {
        labels: ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020', '08/2020', '09/2020', '10/2020', '11/2020', '12/2020'],
        datasets: [
            {
                label: 'Vendas',
                data: [50, 35, 165, 98, 75, 80, 90, 135, 265, 200, 180, 130, 98, 75],
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green'
            }
        ]
    };

    const dataUnidadesVendidas = {
        labels: ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020', '08/2020', '09/2020', '10/2020', '11/2020', '12/2020'],
        datasets: [
            {
                label: 'Unidades vendidas',
                data: [10, 20, 15, 9, 8, 1, 5, 9, 10, 15, 20, 13],
                fill: false,
                backgroundColor: 'black',
                borderColor: 'black'
            }
        ]
    };

    const get = async () => {
        let userId = String(localStorage.getItem('@sigiml/id'))

        await axios.get(`${DOMAIN}/perguntas/fila_perguntas/${userId}`).then(pergunta => {
            dispatch({
                type: GET_PERGUNTAS,
                question: pergunta.data
            })
        }).catch(error => {
            swal("Error", "Ops, não conseguimos obter as informações de perguntas:(  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/comunicado/${userId}`).then(comunicado => {
            setComunicado(comunicado.data[0])
        }).catch(error => {
            swal("Error", "Ops, não conseguimos obter as informaçoes do comunicado! :(  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/saldo/${userId}`).then(res => {
            dispatch({
                type: OBTER_SALDO_TOTAL,
                saldoTotal: res.data.saldo_total.toLocaleString('pt-BR'),
                saldoDisponivel: res.data.disponivel.toLocaleString('pt-BR'),
                saldoALiberar: res.data.liberar.toLocaleString('pt-BR'),
                saldoBloqueado: res.data.bloqueado.toLocaleString('pt-BR'),
                isLoading: false,
                isLoadingStatusPublicacoes: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar os saldos  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getTotalDeVendas/${userId}`).then(resp => {
            dispatch({
                type: OBTER_TOTAL_VENDAS_NO_MES,
                totalVendas: resp.data.total_vendas,
                nomeMes: resp.data.nome_mes,
                isLoading: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar o total de vendas  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getVendasPendentes/get01/get02/get03/${userId}`).then(resp => {
            dispatch({
                type: OBTER_VENDAS_PENDENTE,
                vendasPendente: resp.data,
                totalVendasPendentes: resp.data.totalVendasPendentes,
                isLoading: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar as vendas pendentes   \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/anuncio/total_status/get01/${userId}`).then(status => {
            dispatch({
                type: OBTER_STATUS_ANUNCIOS,
                totalAtivos: status.data.total_ativos,
                totalPausados: status.data.total_pausados,
                isLoading: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar os status dos anuncios   \n \n " + error, "error");
        })

        await axios.post(`${DOMAIN}/atividade/find_by/user`, { userId }).then(response => {
            if(response.data[0] !== undefined){
                dispatch({
                    type: UPDATE_ATIVIDADE_DIARIO,
                    qtdeVendasDiaria: response.data[0].qtdeVendasDiaria,
                    qtdePerguntasDiaria: response.data[0].qtdePerguntasDiaria,
                    faturamentoDiario: response.data[0].faturamentoDiario,
                    ticketMedioDiario: response.data[0].ticketMedioDiario
                  })
            }
        })

        await axios.post(`${DOMAIN}/vendas/getTotalMessagensNaoLidas/post01/post02/post03/post04/post05/post06/post07/post08/post09/post10/post11/post12/post13`, {userId}).then(response => {
            dispatch({type: GET_TOTAL_MENSAGENS_NAO_LIDAS, qtdeMessagensNaoLidas: response.data.total})
        })
    }

    return (
        <>
            <Dimmer.Dimmable as={Segment} dimmer={state.isLoading.toString()}>
                <Dimmer active={state.isLoading} inverted>
                    <Loader>Carregando dados do Mercado Livre, por favor aguarde...</Loader>
                </Dimmer>
                <DashboardView {...state}
                    options={options}
                    series={series}
                    statePerguntas={statePerguntas}
                    dataVendas={dataVendas}
                    dataFaturamento={dataFaturamento}
                    comunicado={comunicado}
                    dataUnidadesVendidas={dataUnidadesVendidas} />
            </Dimmer.Dimmable>
        </>
    )
}