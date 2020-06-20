import React from 'react'
import ChatView from './ChatView'
import {connect} from 'react-redux'
import {GET_PERGUNTAS, DOMAIN , GET_QTDE_PERGUNTAS} from '../../constants/constants'
import axios from 'axios'
import sendNotification from '../../components/Notification/Notification'

class ChatController extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () =>{
        this.props.listarPerguntas(this.props.perguntas)
    }

    responder = async (question_id, text) => {
        let userId = localStorage.getItem("@sigiml/id")
        await axios.post(`${DOMAIN}/notifications/responder/${userId}`, {question_id: question_id, text: text}).then(async response => {
           await this.atualizarStorePerguntas()
           this.props.atualizarQtdePerguntas(this.props.qtdePerguntas - 1)
        }).catch(error => console.log(error))
    }

    atualizarStorePerguntas = async () => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        await axios.get(`${DOMAIN}/perguntas/fila_perguntas/${userId}`).then(async pergunta => {
             this.props.listarPerguntas(pergunta.data)
             sendNotification("success", "Pronto, enviamos sua resposta!", 3000)
        }).catch(error => {console.log(error)})
    }

    render() {
        return (
            <ChatView {...this.state} perguntas={this.props.perguntas} responder={this.responder}/>
        )
    }
}

const mapStateToProps = store => ({
    perguntas: store.perguntas.question,
    qtdePerguntas: store.perguntas.qtdePerguntas
})

const mapDispatchToProps = dispatch => {
    return ({
        listarPerguntas: (perguntas) => {
            dispatch({type: GET_PERGUNTAS, question: perguntas})
        },
        atualizarQtdePerguntas: (qtde) => {
            dispatch({type: GET_QTDE_PERGUNTAS, qtdePerguntas: qtde})
        } 
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatController)

