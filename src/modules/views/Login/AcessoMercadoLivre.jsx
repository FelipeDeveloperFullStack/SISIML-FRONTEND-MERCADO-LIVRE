import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SmsIcon from '@material-ui/icons/Sms';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import {DOMAIN} from '../../constants/constants'

export default class AcessoMercadoLivre extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    render() {
        return (
            <Segment>

                <Dimmer active={this.state.loading}>
                    <Loader>Carregando, por favor aguarde...</Loader>
                </Dimmer>

                <Paper elevation={3} style={{ marginLeft: '300px', marginRight: '300px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%', height: '150px' }}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ textAlign: 'center', color: '#818181', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                            <div>Bem-vindo {localStorage.getItem('@sigiml/nome-usuario')}</div>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ textAlign: 'center', color: '#818181', fontFamily: 'sans-serif', marginTop: '10px' }}>
                            <div>Ótimo, agora só falta conectar a sua conta do Mercado Livre para começar a aproveitar todas as nossas ferramentas.</div>
                            <div>Após esse procedimento, você será direcionado para a tela de login, basta apenas logar com sua conta cadastrada</div>
                        </Grid>

                        <Grid>
                            <a href={`${DOMAIN}/novo_usuario_mercado_livre`} style={{ color: 'black' }}>
                                <Button
                                    variant="contained"
                                    style={{ 'color': 'black', 'backgroundColor': '#ffe600', marginTop: '25px' }}
                                    onClick={() => this.setState({ loading: true })}
                                    startIcon={<SmsIcon />}>
                                    Conectar minha conta do Mercado Livre
                            </Button>
                            </a>
                        </Grid>
                    </div>
                </Paper >
            </Segment>
        )
    }
}
