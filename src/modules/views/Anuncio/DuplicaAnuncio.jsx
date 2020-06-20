import React from 'react'
import { Button, Modal, Header, Icon} from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField';
import sendNotification from '../../components/Notification/Notification'

export default class DuplicaAnuncio extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            qtdeX: 0
        }
    }

    handleDuplicar = () =>{
        if(this.state.qtdeX <= 0){
            sendNotification('error', 'A quantidade de vezes precisa ser maior do que ZERO, tente novamente!', 5000)
        }else{
            this.props.duplicarAnuncioPorID(this.props.id, this.state.qtdeX, this.props.status)
            this.props.setIsShowDuplicarAnuncio(false)
        }
    }

    render() {
        return (
            <>
                <Modal open={this.props.isShowDuplicarAnuncio} style={{
                    'position': 'relative',
                    'height': '50%',
                    'width': '50%',
                    'top': '10%',
                    'bottom': '10%',
                    'marginLeft': '50%',
                    'marginRight': '50%'
                }}>

                    <Header icon='edit' content='Duplicar anúncio.'
                        style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

                    <Modal.Content>
                        <p>
                        #{this.props.id} - {this.props.titulo}
                        </p>
                        <TextField value={this.state.qtdeX} onChange={(event) => this.setState({qtdeX: event.target.value})} style={{width: '500px'}} label="Informe a quantidade de vezes que esse anúncio será duplicado." variant="filled" />
                        <div style={{paddingTop: '10px'}}>
                            Seu saldo para duplicar anúncios é de <b>148</b>, não deixa que seu saldo acabe, adquira hoje mesmo mais saldo e duplique mais anúncios!
                        </div>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button color='green' onClick={() => this.handleDuplicar()}>
                            <Icon name='checkmark' /> Duplicar
                        </Button>

                        <Button color='red' onClick={() => { this.props.setIsShowDuplicarAnuncio(false) }}>
                            <Icon name='remove' /> Fechar
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

