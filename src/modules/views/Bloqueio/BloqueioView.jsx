import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';

import { Row, Col } from 'react-bootstrap'


export default function BloqueioView(props) {

    const textStyle = {
        fontFamily: 'arial',
        fontSize: '20px',
        color: '#818281',
        padding: '0 0 10px'
    }

    const stylePaper = {
        height: '80px'
    }

    const textInsidePaper = {
        padding: '30px 30px 18px',
        fontSize: '14px',
        color: '#818181'
    }

    return (
        <>

            <div style={{ margin: '0 0 15px' }}>
                <div style={{ borderLeft: '3px solid #179aa0', color: '#179aa0', backgroundColor: '#ebf8fa', padding: '10px 10px 10px', fontSize: '13px', display: 'grid', gridTemplateColumns: '30px auto' }}>
                    <InfoIcon />
                    <div style={{ margin: '2px 0 0' }}>
                        Embora estejam disponíveis uma prestação e fluxos de prevenção de fraude para manter a segurança de compradores e vendedores, em alguns casos, você pode encontrar usuários que, por algum motivo, ofertam nos anúncios. Estes casos podem ser enviados para a lista negra, a fim de evitar que voltem a ofertar.
                    </div>
                </div>

                <div style={{ borderLeft: '3px solid #179aa0', color: '#179aa0', backgroundColor: '#ebf8fa', padding: '10px 10px 10px', fontSize: '13px', display: 'grid', gridTemplateColumns: '30px auto' }}>
                    <InfoIcon />
                    <div style={{ margin: '2px 0 0' }}>
                        Gerenciar a lista negra de perguntas permite bloquear usuários para evitar que eles façam perguntas sobre seus produtos. Posteriormente, você pode removê-los da lista negra para que possam perguntar novamente. A lista negra é baseada em usuário, e o vendedor tem controle total sobre a lista de usuários que fazem parte dela.
                    </div>
                </div>
            </div>

            <div style={{ fontFamily: 'arial', fontSize: '14px', fontWeight: 'bold' }}>
                Bloqueio de usuários
            </div>
            <div>
                <TextField value={props.nickname} onChange={(event) => props.handleOnChange('nickname', event)} variant="outlined" placeholder='Buscar por apelido' size="small" />
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<SearchIcon />}
                    onClick={() => props.buscarUsuarioPorNickname()}
                    style={{ margin: '2px 5px 0' }}>
                    Buscar
                </Button>
            </div>
            <div>
                {props.isShow &&
                    <>
                        <div style={{ color: '#818181', fontFamily: 'arial', margin: '5px 0 0' }}>Encontramos {props.nicknameEncontrado} - Situação: {props.status === 'active' ? 'ATIVO' : 'INATIVO'}</div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={props.bloquearCompras} onChange={(event) => props.handleOnChecked('bloquearCompras', event)} />
                                }
                                style={{ color: '#818181', fontFamily: 'arial' }}
                                label="Bloquear permanentemente para não realizar nenhum tipo de compras."
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={props.bloquearPerguntas} onChange={(event) => props.handleOnChecked('bloquearPerguntas', event)} />
                                }
                                style={{ color: '#818181', fontFamily: 'arial' }}
                                label="Bloquear permanentemente para não realizar nenhum tipo de perguntas."
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={() => props.salvarAlteracao()}
                                disabled={props.disabledButtonSalvar()}
                                startIcon={<SaveIcon />}>
                                Salvar
                            </Button>
                        </div>
                    </>}
            </div>
            <div>
                <Grid container spacing={3} style={{ margin: '30px 0 0' }}>
                    <Grid item xs={6}>
                        <div style={textStyle}>Bloqueados para comprar</div>
                        <Paper style={(props.usuarioBloqueadosCompras.length === 0 || props.usuarioBloqueadosCompras.length === 1) ? stylePaper : null}>
                            <Row>
                                {props.usuarioBloqueadosCompras.length !== 0 ? props.usuarioBloqueadosCompras.map((usuario, key) => {
                                    return (

                                        <div key={key}>
                                            <div style={textInsidePaper}>
                                                <Col md={8}>
                                                    {usuario.nickname}
                                                </Col>
                                                <Col md={3}>
                                                    <Button style={{ margin: '-9px 0 0' }} color="primary" onClick={() => props.deletarUsuario(usuario)}>Desbloquear</Button>
                                                </Col>
                                            </div>
                                        </div>

                                    )
                                })
                                    :
                                    <div style={textInsidePaper}>Você não possui nenhum usuário bloqueado para realizar compras.</div>
                                }
                            </Row>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={textStyle}>Bloqueados para perguntar</div>
                        <Paper style={(props.usuarioBloqueadosPerguntas.length === 0 || props.usuarioBloqueadosPerguntas.length === 1) ? stylePaper : null}>
                            <Row>
                                {props.usuarioBloqueadosPerguntas.length !== 0 ? props.usuarioBloqueadosPerguntas.map((usuario, key) => {
                                    return (

                                        <div key={key}>
                                            <div style={textInsidePaper}>
                                                <Col md={8}>
                                                    {usuario.nickname}
                                                </Col>
                                                <Col md={3}>
                                                    <Button style={{ margin: '-9px 0 0' }} color="primary" onClick={() => props.deletarUsuario(usuario)}>Desbloquear</Button>
                                                </Col>
                                            </div>
                                        </div>

                                    )
                                })
                                    :
                                    <div style={textInsidePaper}>Você não possui nenhum usuário bloqueado para realizar perguntas.</div>
                                }
                            </Row>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}