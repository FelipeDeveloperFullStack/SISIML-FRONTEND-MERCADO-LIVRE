import React from 'react'
import { Button, Modal, Header, Icon} from 'semantic-ui-react'

export default class MudarStatus extends React.Component {

    handleButtonConfirm = () => {
        this.props.updateStatus(this.props.id, this.props.status === 'paused' ? 'active' : 'paused')
        this.props.setLoadingButton(true)
        this.props.setDisabledButton(true)
    }

    render() {
        return (    
                <Modal open={this.props.isShowConfirmPauseProduct} style={{
                    'position': 'relative',
                    'height': '50%',
                    'width': '50%',
                    'top': '10%',
                    'bottom': '10%',
                    'marginLeft': '50%',
                    'marginRight': '50%'
                }}>

                    <Header icon='edit' content={this.props.titulo}
                        style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

                    <Modal.Content>
                        <p>
                            Deseja realmente {this.props.status === 'paused' ? 'ativar' : 'pausar'} esse anúncio? 
                        </p>
                        <p>
                            {this.props.quantidadeVendido === 0 ?
                            <b> Esse anúncio não possui nenhum venda</b> :
                            <>
                            {this.props.quantidadeVendido > 1 ? 
                            <> O mesmo possui <b>{this.props.quantidadeVendido}{' '}
                            unidade vendidas</b> e <b>{this.props.visualizacao} visualizações</b></> :
                            <>
                            {this.props.quantidadeVendido === 1 ? 
                            <> O mesmo possui <b>{this.props.quantidadeVendido}{' '} 
                            unidade vendida</b> e <b>{this.props.visualizacao} visualizações</b></> :
                            <></>}
                            </>}
                            </>}
                        </p>
                    </Modal.Content>

                    <Modal.Actions>
                    <Button loading={this.props.loadingButton} disabled={this.props.disabledButton} color='green' onClick={() => this.handleButtonConfirm()}>
                            <Icon name='checkmark' /> Confirmar
                    </Button>

                    <Button color='red' onClick={() => { this.props.setIsShowConfirmPauseProduct(false) }}>
                            <Icon name='remove' /> Fechar
                    </Button>
                    </Modal.Actions>
                </Modal>
        
        )
    }
}