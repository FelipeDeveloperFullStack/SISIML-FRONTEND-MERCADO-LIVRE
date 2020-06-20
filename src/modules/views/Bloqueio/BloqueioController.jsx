import React from 'react';
import BloqueioView from './BloqueioView'
import axios from 'axios'
import swal from 'sweetalert'
import { DOMAIN } from '../../constants/constants'
import { removerCaracteresEspeciaisEAcentos } from '../../../Helpers/util'


export default class BloqueioController extends React.Component {
    constructor(props) {
        super(props)

        document.title = "Bloqueios"

        this.state = {
            nickname: '',
            nicknameEncontrado: '',
            status: '',
            isShow: false,
            bloquearCompras: false,
            bloquearPerguntas: false,
            usuarioBloqueadosPerguntas: [],
            usuarioBloqueadosCompras: [],
            isShowUsuarioPerguntas: false,
            isShowUsuarioCompras: false
        }
    }

    mensagemDeFalha = 'Opps, parece que o mercado livre ou a sua conexão com a internet estão oscilando no momento ou você digitou algum caracter que não é permitido pelo Mercado Livre. \n\n Tente novamente, se o problema persistir verifique sua conexão com a internet e recarregue a página!'

    componentDidMount = () => {
        this.listarTodosUsuarioBloqueadosBlackListPerguntas()
        this.listarTodosUsuarioBloqueadosBlackListCompras()
    }

    handleOnChange = (state, event) => {
        this.setState({
            [state]: event.target.value
        })
    }

    handleOnChecked = async (state, event) => {
        this.setState({
            [state]: event.target.checked
        })
    }

    buscarUsuarioPorNickname = async () => {
        if (this.state.nickname.trim() === '') {
            swal('Atenção', 'Você não informou o apelido, digite e tente novamente!', 'warning')
        } else {
            await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
                await axios.get(`${DOMAIN}/usuario/${user.data.id}`).then(dataUser => {
                    this.setState({
                        nicknameEncontrado: dataUser.data.nickname,
                        status: dataUser.data.status.site_status,
                        isShow: true
                    })
                }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })
            }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

            await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListPerguntasPorNickNameMongoDB/${this.state.nickname}`).then(userbd => {
                if (userbd.data.length === 0) {
                    this.setState({
                        bloquearPerguntas: false
                    })
                } else {
                    this.setState({
                        bloquearPerguntas: userbd.data[0].bloquearPerguntas
                    })
                }
            }).catch(error => { console.log(error) })

            await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListComprasPorNickNameMongoDB/${this.state.nickname}`).then(userbd => {
                if (userbd.data.length === 0) {
                    this.setState({
                        bloquearCompras: false
                    })
                } else {
                    this.setState({
                        bloquearCompras: userbd.data[0].bloquearCompras
                    })
                }
            }).catch(error => { console.log(error) })
        }
    }

    salvarAlteracao = async () => {

        //SALVAR USER NA BLACK LIST DE PERGUNTAS
        if (this.state.bloquearPerguntas === true) {
            await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListPerguntasPorNickNameMongoDB/${this.state.nickname.trim()}`).then(async userbd => {
                /*userbd.data.map(async blacklist => {
                    this.obterNicknameESalvarUsuarioBlackListPerguntas(blacklist)
                })*/
                if (userbd.data.length > 0) {
                    userbd.data.map(async blacklist => {
                        this.obterNicknameESalvarUsuarioBlackListPerguntas(blacklist)
                    })
                } else {
                    await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname.trim()}`).then(async user => {
                        await axios.post(`${DOMAIN}/bloqueio`, { "user_id": user.data.id }).then(response => {
                            swal('Sucesso', 'Usuário ' + this.state.nicknameEncontrado + ' bloqueado conforme solicitado!', 'success')
                        })
                    }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

                    await axios.post(`${DOMAIN}/bloqueio/salvarUsuarioBlackListPerguntas`, {
                        usuario_sistema: localStorage.getItem('@sigiml/_id-usuario'),
                        nickname: this.state.nicknameEncontrado,
                        bloquearPerguntas: this.state.bloquearPerguntas
                    }).then(response => {
                        console.log("USUARIO SALVO NO BANCO DE DADOS - (BLOQUEADO PARA PERGUNTAS)")
                    }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

                    this.listarTodosUsuarioBloqueadosBlackListPerguntas()
                }
            }).catch(error => { console.log(error) })
        }

        //SALVAR USER NA BLACK LIST DE COMPRAS
        if (this.state.bloquearCompras === true) {
            await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListComprasPorNickNameMongoDB/${this.state.nickname.trim()}`).then(async userbd => {
                /*userbd.data.map(async blacklist => {
                    this.obterNicknameESalvarUsuarioBlackListPerguntas(blacklist)
                })*/
                if (userbd.data.length > 0) {
                    userbd.data.map(async blacklist => {
                        this.obterNicknameESalvarUsuarioBlackListCompras(blacklist)
                    })
                } else {
                    await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname.trim()}`).then(async user => {
                        await axios.post(`${DOMAIN}/bloqueio/salvar_user_black_compras`, { "user_id": user.data.id }).then(response => {
                            swal('Sucesso', 'Usuário ' + this.state.nicknameEncontrado + ' bloqueado conforme solicitado!', 'success')
                        })
                    }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

                    await axios.post(`${DOMAIN}/bloqueio/salvarUsuarioBlackListCompras`, {
                        usuario_sistema: localStorage.getItem('@sigiml/_id-usuario'),
                        nickname: this.state.nicknameEncontrado,
                        bloquearCompras: this.state.bloquearCompras
                    }).then(response => {
                        console.log("USUARIO SALVO NO BANCO DE DADOS - (BLOQUEADO PARA COMPRAS)")
                    }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

                    this.listarTodosUsuarioBloqueadosBlackListCompras()
                }
            }).catch(error => { console.log(error) })
        }

        this.setState({ nickname: '', isShow: false, bloquearCompras: false, bloquearPerguntas: false }) //Limpar o campo de texto e esconder os checkboxs
    }

    obterNicknameESalvarUsuarioBlackListPerguntas = async (blacklist) => {

        if (!blacklist.bloquearPerguntas) {
            //SALVAR NO MERCADO LIVRE
            await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
                await axios.post(`${DOMAIN}/bloqueio`, { "user_id": user.data.id }).then(response => {
                    swal('Sucesso', 'Usuário ' + this.state.nicknameEncontrado + ' bloqueado conforme solicitado!', 'success')
                })
            }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

            //SALVAR NO MONGO DB    
            await axios.post(`${DOMAIN}/bloqueio/salvarUsuarioBlackListPerguntas`, {
                usuario_sistema: localStorage.getItem('@sigiml/_id-usuario'),
                nickname: this.state.nicknameEncontrado,
                bloquearPerguntas: this.state.bloquearPerguntas
            }).then(response => {
                console.log("USUARIO SALVO NO BANCO DE DADOS - (BLOQUEADO PARA PERGUNTAS)")
            }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })
        }

        this.listarTodosUsuarioBloqueadosBlackListPerguntas()

        //swal('Não foi possível realizar essa ação!', 'Esse usuário '+this.state.nickname+' já está adicionado na black list! \n\n Informe outro usuário!', 'warning')
    }

    obterNicknameESalvarUsuarioBlackListCompras = async (blacklist) => {

        if (!blacklist.bloquearCompras) {
            //SALVAR NO MERCADO LIVRE
            await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
                await axios.post(`${DOMAIN}/bloqueio/salvar_user_black_compras`, { "user_id": user.data.id }).then(response => {
                    swal('Sucesso', 'Usuário ' + this.state.nicknameEncontrado + ' bloqueado conforme solicitado!', 'success')
                })
            }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

            //SALVAR NO MONGO DB
            await axios.post(`${DOMAIN}/bloqueio/salvarUsuarioBlackListCompras`, {
                usuario_sistema: localStorage.getItem('@sigiml/_id-usuario'),
                nickname: this.state.nicknameEncontrado,
                bloquearPerguntas: this.state.bloquearPerguntas
            }).then(response => {
                console.log("USUARIO SALVO NO BANCO DE DADOS - (BLOQUEADO PARA COMPRAS)")
            }).catch(error => { swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error') })

            this.listarTodosUsuarioBloqueadosBlackListCompras()
        }
        //swal('Não foi possível realizar essa ação!', 'Esse usuário '+this.state.nickname+' já está adicionado na black list! \n\n Informe outro usuário!', 'warning')
    }

    listarTodosUsuarioBloqueadosBlackListPerguntas = async () => {
        await axios.get(`${DOMAIN}/bloqueio/listarUsuarioBlackListPerguntas`).then(response => {
            this.setState({
                usuarioBloqueadosPerguntas: response.data,
                isShowUsuarioPerguntas: response.data.length === 0 ? false : true
            })
        }).catch(() => { console.log('Nenhum usuário encontrado na black list') })
    }

    listarTodosUsuarioBloqueadosBlackListCompras = async () => {
        await axios.get(`${DOMAIN}/bloqueio/listarUsuarioBlackListCompras`).then(response => {
            this.setState({
                usuarioBloqueadosCompras: response.data,
                isShowUsuarioCompras: response.data.length === 0 ? false : true
            })
        }).catch(() => { console.log('Nenhum usuário encontrado na black list') })
    }

    deletarUsuario = async (usuario) => {

        let userId = localStorage.getItem("@sigiml/id")

        await axios.get(`${DOMAIN}/bloqueio/nickname/${usuario.nickname}`).then(async user => {

            //DELETAR USUARIO NA BLACK LIST PERGUNTAS
            if (usuario.bloquearPerguntas) {
                await axios.delete(`${DOMAIN}/bloqueio/perguntas/${user.data.id}/${userId}`).then(async response => {
                    await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListPerguntasPorNickNameMongoDB/${usuario.nickname}`).then(async resp => {
                        await axios.delete(`${DOMAIN}/bloqueio/mongo/perguntas/${resp.data[0]._id}`).then(res => {
                            swal('Sucesso', 'Usuário ' + usuario.nickname + ' desbloqueado conforme solicitado!', 'success')
                        }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })
                    }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })

                }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })
            }

            //DELETAR USUARIO NA BLACK LIST COMPRAS
            if (usuario.bloquearCompras) {
                await axios.delete(`${DOMAIN}/bloqueio/compras/${user.data.id}/${userId}`).then(async response => {
                    await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListComprasPorNickNameMongoDB/${usuario.nickname}`).then(async respCompras => {
                         await axios.delete(`${DOMAIN}/bloqueio/mongo/compras/${respCompras.data[0]._id}`).then(res => {
                            swal('Sucesso', 'Usuário ' + usuario.nickname + ' desbloqueado conforme solicitado!', 'success')
                        }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })
                       console.log("respCompras.data[0]._id: "+JSON.stringify(respCompras.data[0]._id))
                    }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })
                }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })
            }
        }).catch(error => { swal('Atenteceu algo de errado!', 'Houve um problema ao tentar desbloquear o usuário! \n Recarregue a página e tente novamente!', 'error') })

        this.listarTodosUsuarioBloqueadosBlackListPerguntas()
        this.listarTodosUsuarioBloqueadosBlackListCompras()

    }

    disabledButtonSalvar = () => {
        if (this.state.bloquearPerguntas) {
            return false
        }

        if (this.state.bloquearCompras) {
            return false
        }

        return true
    }

    render() {
        return (
            <>
                <BloqueioView {...this.state}
                    buscarUsuarioPorNickname={this.buscarUsuarioPorNickname}
                    handleOnChange={this.handleOnChange}
                    handleOnChecked={this.handleOnChecked}
                    salvarAlteracao={this.salvarAlteracao}
                    disabledButtonSalvar={this.disabledButtonSalvar}
                    deletarUsuario={this.deletarUsuario} />
            </>
        )
    }
}