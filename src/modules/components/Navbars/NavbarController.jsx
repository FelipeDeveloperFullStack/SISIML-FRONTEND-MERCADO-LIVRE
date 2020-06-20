import React from 'react';
import Navbar from './Navbar';
import socketIOClient from 'socket.io-client'
import { DOMAIN } from '../../constants/constants'
import { connect } from 'react-redux';

class NavbarController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nomeUsuario: localStorage.getItem('@sigiml/nome-usuario'),
            sobrenome: localStorage.getItem('@sigiml/sobrenome-usuario')
        }
    }

    desconectarSocketSession = () => {
        let socket = socketIOClient(DOMAIN)
        socket.emit("disconnected")
    }

    render() {
        return (
            <div>
                <Navbar nomeUsuario={this.state.nomeUsuario} 
                        brandText={this.props.brandText} 
                        desconectarSocketSession={this.desconectarSocketSession}
                        {...this.props}
                        {...this.state}/>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    question: store.perguntas.question
})


export default connect(mapStateToProps, null)(NavbarController)