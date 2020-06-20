import React from 'react'
import MensagensAutomaticasView from './MensagensAutomaticasView'
import { DOMAIN } from '../../constants/constants'
import axios from 'axios'
import sendNotification from '../../components/Notification/Notification'

class PerguntasController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Mensagens automaticas"
        this.state = {
            userId: Number(localStorage.getItem("@sigiml/id")),
            isHabilitarEnvioCompraRealizada: false,
            mensagemCompraRealizada: '',
            isHabilitarEnvioProdutoEmTransito: false,
            mensagemProdutoEmTransito: '',
            isHabilitarEnvioProntoParaRetirarCorreios: false,
            mensagemProntoParaRetirarCorreios: '',
            isHabilitarEnvioProdutoEntregue: false,
            mensagemProdutoEntregue: ''
        }
    }

    setMessage = event => {
        const {target: {name, value}} = event
        this.setState({ [name]: value })
    }

    setChecked = event => {
        const {target: {name, checked}} = event
        this.setState({ [name]: checked})
    }

    componentDidMount = async () => {
        let {userId} = this.state
        await axios.post(`${DOMAIN}/msg_pos_venda/find`, { userId }).then(response => {
            if(response.data.length > 0){
                this.setState({
                    isHabilitarEnvioCompraRealizada: response.data[0].isHabilitarEnvioCompraRealizada,
                    mensagemCompraRealizada: response.data[0].mensagemCompraRealizada,
                    isHabilitarEnvioProdutoEmTransito: response.data[0].isHabilitarEnvioProdutoEmTransito,
                    mensagemProdutoEmTransito: response.data[0].mensagemProdutoEmTransito,
                    isHabilitarEnvioProntoParaRetirarCorreios: response.data[0].isHabilitarEnvioProntoParaRetirarCorreios,
                    mensagemProntoParaRetirarCorreios: response.data[0].mensagemProntoParaRetirarCorreios,
                    isHabilitarEnvioProdutoEntregue: response.data[0].isHabilitarEnvioProdutoEntregue,
                    mensagemProdutoEntregue: response.data[0].mensagemProdutoEntregue
                })
            }
        }).catch(err => sendNotification("error", `Ops, aconteceu um problema ao tentar buscar os dados das mensagens automáticas. Entre em contato com o suporte técnico! ${err}`, 10000))
    }

    save = async () => {
        let msg = this.state
        await axios.post(`${DOMAIN}/msg_pos_venda/`, {msg}).then(response => {
            sendNotification('success', `Pronto, salvamos suas auterações!`, 6000)
        }).catch(err => sendNotification("error", `Ops, aconteceu um problema ao tentar salvar as mensagens automáticas. Entre em contato com o suporte técnico! ${err}`, 10000)) 
    }

    render() {
        return (
            <MensagensAutomaticasView mensagem={this.state} 
                                      setMessage={this.setMessage} 
                                      setChecked={this.setChecked} 
                                      save={this.save}/>
        )
    }
}

export default PerguntasController