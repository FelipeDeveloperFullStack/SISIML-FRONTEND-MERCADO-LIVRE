import React from 'react'
import SignIn from './SignIn'
import axios from 'axios'
import swal from 'sweetalert'
import { DOMAIN } from '../../constants/constants'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import socketIOClient from 'socket.io-client'

export default class SignInController extends React.Component {

    constructor(props) {
        super(props)
        let checkedStorage = localStorage.getItem('@sigiml/isMostrarMensagemPrincipal') === null ? false : Boolean(localStorage.getItem('@sigiml/isMostrarMensagemPrincipal'))
        this.state = {
            email: 'felipeanalista3@gmail.com',
            password: 'fmds*963,*963,',
            redirectServer: false,
            redirectDashboard: false,
            checked: checkedStorage,
            isShowMessageMain: checkedStorage,
            isLoadingButton: false
        }
    }

    handleShowMessage = () => {
        this.setState({
            isShowMessageMain: this.checkedStorage
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({ [name]: event.target.checked })
        localStorage.setItem('@sigiml/isMostrarMensagemPrincipal', event.target.checked)
    }

    changeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    calcularDiferenteEmDias = () => {
        const dataExpiracaoPlano = moment(new Date(localStorage.getItem('@sigiml/data_expiracao_plano_free')))
        const dataInicioPlano = moment(new Date())
        const duration = moment.duration(dataExpiracaoPlano.diff(dataInicioPlano))
        return duration.asDays().toFixed(0)
    }

    handleOnClickSairMercadoLivre = () => {
        let myWindow = window.open("https://www.mercadolibre.com/jms/mlb/lgz/logout?go=https://www.mercadolivre.com.br#menu-user", "MsgWindow", "width=10, height=10, top=2500px, left=2500px");
        setTimeout(() => {
          myWindow.close()
        }, 3000)
      }

    signinUsuario = async () => {
        if (this.state.email.trim() === '') {
            swal('Atenção', 'Você não informou o e-mail, tente novamente! \n', 'warning')
            return
        }
        if (this.state.password.trim() === '') {
            swal('Atenção', 'Você não informou a senha, tente novamente! \n', 'warning')
            return
        }
        await axios.get(`${DOMAIN}/usuario/procurar_usuario_byEmail/${this.state.email.trim()}`).then(resp => {
            if (resp.data.length > 0) {
                resp.data.map(user => {
                    if (this.state.email === user.email && this.state.password === user.password) {
                        localStorage.setItem('@sigiml/nome-usuario', user.nome)
                        localStorage.setItem('@sigiml/sobrenome-usuario', user.sobrenome)
                        localStorage.setItem('@sigiml/email-usuario', user.email)
                        localStorage.setItem('@sigiml/_id-usuario', user._id)
                        localStorage.setItem('@sigiml/id', user.id)
                        localStorage.setItem('@sigiml/plano', user.plano)
                        localStorage.setItem('@sigiml/data_expiracao_plano_free', user.data_expiracao_plano_free)
                        localStorage.setItem('@sigiml/data_inicio_plano', user.data_inicio_plano)
                        localStorage.setItem('@sigiml/expiration_day', this.calcularDiferenteEmDias())
                        this.setState({isLoadingButton: true})
                        /**
                         * Verificar se possui token se sim, direcionar para o dashboard do sistema sem passar pelo server
                         */
                        if (user.accessToken !== undefined) {
                            console.log("[MENSAGEM DO SISTEMA] - Usuário logando no sistema!")
                            setTimeout(() => {
                                console.log("[MENSAGEM DO SISTEMA] - Direcionando...")
                            }, 5000)
                            setTimeout(() => {
                                this.setState({ redirectDashboard: true })
                                this.handleOnClickSairMercadoLivre()
                            }, 1000)
                        } else {
                            this.setState({ redirectServer: true })
                        }
                    } else {
                        swal('Atenção', 'Email e/ou senha incorretos! Por favor, tente novamente! \n', 'warning')
                    }
                })
            } else {
                swal('Atenção', 'Não existe nenhum usuário cadastrado com esse e-mail! \n', 'warning')
            }
        }).catch(error => { swal('Error', 'Houve um erro ao tentar procurar o usuario pelo e-mail \n' + error, 'error') })

    }

    render() {
        if (this.state.redirectServer) {
            return ( <Redirect to='/server-ml' /> )
        } else if (this.state.redirectDashboard) {
            return ( <Redirect to='/admin/dashboard' /> )
        } else {
            return (
                <>
                    <SignIn
                        signinUsuario={this.signinUsuario}
                        {...this.state}
                        changePassword={this.changePassword}
                        changeEmail={this.changeEmail}
                        handleChangeCheckBox={this.handleChangeCheckBox}
                        handleShowMessage={this.handleShowMessage} />
                </>
            )
        }

    }
}