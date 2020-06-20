import React from 'react'
import SignUp from './SignUp'
import axios from 'axios'
import swal from 'sweetalert'
import { DOMAIN } from '../../constants/constants'
import { Redirect } from 'react-router-dom'

export default class SignUpController extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    validarUsuario = async (usuario) => {

    }

    persistirUSuario = async (usuario) => {
        await axios.post(`${DOMAIN}/usuario/save_usuario`, usuario).then(resp => {
            if (resp.data.isUsuarioSalvo !== undefined) {
                //Localstorage
                localStorage.setItem('@sigiml/_id-usuario', JSON.stringify(resp.data.usuario._id))
                localStorage.setItem('@sigiml/nome-usuario', JSON.stringify(resp.data.usuario.nome))
                localStorage.setItem('@sigiml/sobrenome-usuario', JSON.stringify(resp.data.usuario.sobrenome))
                localStorage.setItem('@sigiml/email-usuario', JSON.stringify(resp.data.usuario.email))
                this.setState({ redirect: true })
            } else {
                swal('Error', 'Ops, houve um erro ao tentar salvar o usuário: \n', 'error')
            }
        }).catch(error => swal('Error', 'Ops, houve um erro ao tentar salvar o usuário: \n' + error, 'error'))
    }

    salvarUsuario = async (usuario) => {
        await axios.get(`${DOMAIN}/usuario/procurar_usuario_byEmail/${usuario.email}`).then(async response => {
            if(response.data <= 0){
                this.persistirUSuario(usuario)
            }else{
                response.data.map(async user => {
                    if (user.email === usuario.email) {
                        swal('Atenção', 'Já existe um usuário cadastrado com esse e-mail! \n', 'warning')
                    } else {
                        this.persistirUSuario(usuario)
                    }
                })
            }
        }).catch(error => swal('Error', 'Ops, houve um erro ao tentar buscar o usuário pelo e-mail: \n' + error, 'error'))
    }

    render() {
        if (!this.state.redirect) {
            return (
                <>
                    <SignUp salvarUsuario={this.salvarUsuario} />
                </>
            )
        } else {
            return (
                <>
                    <Redirect to='/' />
                </>
            )
        }

    }
}