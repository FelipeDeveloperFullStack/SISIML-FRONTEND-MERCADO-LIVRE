import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import NavbarController from "../modules/components/Navbars/NavbarController";
import Sidebar from "../modules/components/Sidebar/Sidebar";
import SidebarRight from "../modules/components/Sidebar/SidebarRight";
import { makeStyles } from '@material-ui/core/styles';
import routes from "routes.js";
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import '../../node_modules/react-chat-widget/lib/styles.css';
import CallApiAnuncio from '../modules/actions/CallApi/CallApiAnuncio'
import CallApiClient from '../modules/actions/CallApi/CallApiClient'
import CallApiVenda from '../modules/actions/CallApi/CallApiVenda'
import CallApiPerguntas from '../modules/actions/CallApi/CallApiPerguntas'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import { DOMAIN, GET_PERGUNTAS, GET_QTDE_PERGUNTAS, GET_VENDAS_A_ENVIAR, GET_TOTAL_VENDAS_A_ENVIAR, UPDATE_ATIVIDADE_DIARIO } from '../../src/modules/constants/constants'
import swal from 'sweetalert'
import sendNotification from '../modules/components/Notification/Notification'
import _ from 'lodash'

export default function Admin(props) {

  let MENSAGEM_ERROR = "Ocorreu um erro ao tentar atualizar o total de vendas a enviar! Entre em contato com o suporte técnico"

  //STORE
  const storeDashboard = useSelector(store => store.dashboard)
  const storePerguntas = useSelector(store => store.perguntas)

  // Component state
  const [itemID, setItemID] = useState('')
  const [showWidget, setShowWidget] = useState(false)
  const dispatch = useDispatch()


  const handleNewUserMessage = (newMessage) => {
    dispatch({ type: GET_QTDE_PERGUNTAS, qtdePerguntas: (storePerguntas.qtdePerguntas - 1) })
    setShowWidget(storePerguntas.qtdePerguntas === 0 ? false : true)
    //Enviar para o Mercado livre
  }

  const setUserId = async () => {
    await axios.get(`${DOMAIN}/usuario/procurar_usuario_byEmail/${localStorage.getItem('@sigiml/email-usuario')}`).then(resp => {
      resp.data.map(user => {
        localStorage.setItem('@sigiml/id', user.id)
      })
    }).catch(error => { swal('Error', 'Houve um erro ao tentar procurar o usuario pelo e-mail \n' + error, 'error') })
  }


  useEffect(() => {
    setUserId()
    let socket = socketIOClient(DOMAIN)
    socketNotification(socket)
    socketNovaVenda(socket)
  }, [])

  const socketNotification = (socket) => {
    let userId = String(localStorage.getItem('@sigiml/id'))
    socket.on('notification-ml', (perguntas) => {
      if (perguntas.status === 'UNANSWERED') {
        //setContBadge(1)
        //setClientID(perguntas.from.id)
        setItemID(' - ' + perguntas.item_id)
        addResponseMessage(perguntas.text)

        axios.get(`${DOMAIN}/perguntas/fila_perguntas/${userId}`).then(questions => {
          dispatch({ type: GET_PERGUNTAS, question: questions.data })
          dispatch({ type: GET_QTDE_PERGUNTAS, qtdePerguntas: questions.data.length })
          atualizarAtividadeDiaria(userId, questions.data.length, undefined)
          sendNotification("success", "Uma nova pergunta recebida!", 5000)
          setShowWidget(true)
        }).catch(error => sendNotification("error", MENSAGEM_ERROR + ' ' + error, 5000))
      }
    })
  }

  const socketNovaVenda = async (socket) => {
    let userId = String(localStorage.getItem('@sigiml/id'))
    socket.on("nova_venda", async (venda) => {
      dispatch({ type: GET_VENDAS_A_ENVIAR, vendasAEnviar: venda })
      //sendNotification("success", `Uma nova venda recebida.\n ${venda[0].itens_pedido.titulo_anuncio}`, 10000)
      swal('Nova venda', `Uma nova venda recebida.\n ${venda[0].itens_pedido.titulo_anuncio}`, 'info')
      enviarMensagemComprador(userId, venda[0].id_venda, venda[0].vendedor.email, venda[0].comprador.id)
      await axios.get(`${DOMAIN}/vendas/getTotalVendasAEnviar/get01/get02/get03/get04/get05/get06/get07/get08/${userId}`).then(async totalVendasAEnviar => {
        dispatch({
          type: GET_TOTAL_VENDAS_A_ENVIAR,
          qtdeVendasAEnviar: totalVendasAEnviar.data.qtdeVendasAEnviar,
          isLoadingQtdeVendasAEnviar: false
        })
        atualizarAtividadeDiaria(userId, undefined, venda)
      }).catch(error => {
        sendNotification('error', MENSAGEM_ERROR + ' ' + error, 5000)
      })
    })
  }

  const enviarMensagemComprador = async (userId, packId, email, buyerId) => {
    await axios.post(`${DOMAIN}/msg_pos_venda/find`, { userId }).then(async response => {
      if (Boolean(response.data[0].isHabilitarEnvioCompraRealizada)) {
        await axios.post(`${DOMAIN}/vendas/sendMessage/post01/post02/post03/post04/post05/post06/post07/post08/post09/post10/post11/post12/post13/post14/post15/`, {
          userId: userId,
          packId: packId,
          email: email,
          buyerId: buyerId,
          text: response.data[0].mensagemCompraRealizada
        }).then(response => {
          console.log('[MENSAGEM DO SISTEMA] - Mensagem de nova compra enviada para o comprador!')
        }).catch(err => sendNotification('error', 'Houve um erro ao tentar enviar uma mensagem para o comprador! Entre em contato com o suporte técnico!', 10000))
      }
    }).catch(err => sendNotification('error', 'Houve um erro ao tentar buscar mensagem automaticas no banco de dados! Entre em contato com o suporte técnico!', 10000))
  }

  const atualizarAtividadeDiaria = async (userId, questionLength, venda) => {
    await axios.post(`${DOMAIN}/atividade/find_by/user`, { userId }).then(async response => {
      //SE CASO O USUÁRIO NÃO TIVER NENHUM REGISTRO DE ATIVIDADE DIÁRIA, SALVA UM NOVO REGISTRO
      if (response.data.length === 0) {
        await axios.post(`${DOMAIN}/atividade/save`, {
          usuario: userId,
          qtdeVendasDiaria: 1,
          qtdePerguntasDiaria: questionLength !== undefined ? questionLength : 0,
          faturamentoDiario: venda !== undefined ? venda[0].valor_venda : response.data[0].faturamentoDiario,
          ticketMedioDiario: venda !== undefined ? venda[0].valor_venda : response.data[0].ticketMedioDiario,
          data: new Date()
        }).then(response => {
          dispatch({
            type: UPDATE_ATIVIDADE_DIARIO,
            qtdeVendasDiaria: response.data.qtdeVendasDiaria,
            qtdePerguntasDiaria: questionLength !== undefined ? questionLength : response.data.qtdePerguntasDiaria,
            faturamentoDiario: response.data.faturamentoDiario,
            ticketMedioDiario: response.data.ticketMedioDiario
          })
        }
        ).catch(error => {
          sendNotification('error', MENSAGEM_ERROR + ' ' + error, 5000)
        })
      } else {
        //CASO JÁ TIVER, ATUALIZA. 
        //formatarData(response.data[0].data) !== new Date().toLocaleDateString()
        let faturamento = _.add(response.data[0].faturamentoDiario, venda !== undefined ? venda[0].valor_venda : 0)
        let qtdeVendas = _.add(response.data[0].qtdeVendasDiaria, 1)
        await axios.post(`${DOMAIN}/atividade/save`, {
          usuario: userId,
          qtdeVendasDiaria: venda !== undefined ? qtdeVendas : response.data[0].qtdeVendasDiaria,
          qtdePerguntasDiaria: questionLength !== undefined ? questionLength : response.data[0].qtdePerguntasDiaria,
          faturamentoDiario: venda !== undefined ? faturamento : response.data[0].faturamentoDiario,
          ticketMedioDiario: venda !== undefined ? _.divide(faturamento, qtdeVendas) : response.data[0].ticketMedioDiario,
          data: response.data[0].data
        }).then(resp => {
          dispatch({
            type: UPDATE_ATIVIDADE_DIARIO,
            qtdeVendasDiaria: venda !== undefined ? qtdeVendas : response.data[0].qtdeVendasDiaria,
            qtdePerguntasDiaria: questionLength !== undefined ? questionLength : response.data[0].qtdePerguntasDiaria,
            faturamentoDiario: venda !== undefined ? faturamento : response.data[0].faturamentoDiario,
            ticketMedioDiario: venda !== undefined ? _.divide(faturamento, qtdeVendas) : response.data[0].ticketMedioDiario
          })
        }
        ).catch(error => {
          sendNotification('error', MENSAGEM_ERROR + ' ' + error, 5000)
        })
      }
    })
  }

  const useStyles = makeStyles(theme => (
    {
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },

      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },

      root: {
        display: 'flex',
      },

      speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      }
    }
  ))

  const classes = useStyles();

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getPathName = path => {
    for (let i = 0; i < routes.length; i++) {
      if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };


  return (
    <>
      <CallApiAnuncio />
      <CallApiClient />
      <CallApiVenda />
      <CallApiPerguntas />

      <div className={classes.root}>
        <NavbarController
          {...props}
          ref={React.createRef()}
          brandText={getPathName(props.location.pathname)}
        />

        <Sidebar {...props} routes={routes} ref={React.createRef()} />

        <main className={classes.content} >

          <div className={classes.toolbar} />

          <div>
            <label style={{ color: '#818281', fontSize: '18px' }}>{getPathName(props.location.pathname) === 'Chat' ? 'Perguntas' : getPathName(props.location.pathname)}</label>
          </div>

          <Switch>{getRoutes(routes)}</Switch>


          {/**<div className="App">
            {showWidget && <Widget
              title="Perguntas"
              subtitle={new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + "\n" + itemID}
              badge={storePerguntas.qtdePerguntas}
              handleNewUserMessage={handleNewUserMessage}
              senderPlaceHolder='Digite uma resposta'
              showCloseButton={true} />}
            </div>*/}
        </main>



      </div>
      <SidebarRight />
    </>
  );

}

