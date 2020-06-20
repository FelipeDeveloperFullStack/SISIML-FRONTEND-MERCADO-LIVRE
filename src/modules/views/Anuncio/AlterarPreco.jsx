import React from "react";
import { Button, Modal, Header, Icon, Select, Input} from 'semantic-ui-react'

export default class AlterarPreco extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            price: String(this.props.propsAnuncio.preco).replace(".", ",") //Change the String to Number and then change it "." from ","
        }
    }

    handleOnChangeInputPrice = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    handleButtonSucess = () => {
        this.props.updateAnuncioPrice(this.props.propsAnuncio.id, Number(this.state.price.replace(",",".")))
        this.props.setLoadingButton(true)
        this.props.setDisabledButton(true)
    }

    render() {
        return (    
                <Modal open={this.props.isShowEditPrice} style={{
                    'position': 'relative',
                    'height': '50%',
                    'width': '50%',
                    'top': '10%',
                    'bottom': '10%',
                    'marginLeft': '50%',
                    'marginRight': '50%'
                }}>

                    <Header icon='edit' content='Alterar preço'
                        style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

                    <Modal.Content>
                        <p>
                            {this.props.propsAnuncio.titulo}
                        </p>

                        <Input>
                            <Select compact options={this.props.options} defaultValue='porcentagem'></Select>
                            <Input type='text' placeholder='Valor' value={this.state.price} onChange={this.handleOnChangeInputPrice} />
                        </Input>

                    </Modal.Content>

                    <Modal.Actions>
                        <Button loading={this.props.loadingButton} disabled={this.props.disabledButton} color='green' onClick={() => this.handleButtonSucess()}>
                            <Icon name='checkmark' /> Confirmar
                    </Button>

                        <Button color='red' onClick={() => { this.props.setIsShowEditPrice(false) }}>
                            <Icon name='remove' /> Fechar
                    </Button>
                    </Modal.Actions>
                </Modal>
        
        )
    }
}