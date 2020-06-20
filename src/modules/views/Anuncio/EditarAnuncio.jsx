import React from 'react'
import { Row, Col, Modal } from "react-bootstrap";
import FormInput from '../../components/FormInput/FormInput'
import { Popup, Segment, Input, Message, MessageHeader, MessageContent } from 'semantic-ui-react'

import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import sendNotification from '../../components/Notification/Notification'

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Switch from '@material-ui/core/Switch';
import imgAnuncioClassico from '../../../assets/img/anuncio_classico.PNG'
import imgAnuncioPremium from '../../../assets/img/anuncio_premium.PNG'
import imgOfereceMercadoEnvios from '../../../assets/img/oferece_mercado_envios.png'
import imgFormaDeEntrega from '../../../assets/img/forma_de_entrega.PNG'
import imgInfoComFreteGratis from '../../../assets/img/infoComFreteGratis.png'
import imgFormaEntregaAviso from '../../../assets/img/forma_entrega_aviso.PNG'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Popover from '@material-ui/core/Popover';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import YouTube from 'react-youtube';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NovaVariacao from './NovaVariacao'



import Circle from 'react-circle';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    displayInline: {
        display: 'grid'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },

}));

const HeaderExpansionPanel = ({ title, subtitle, message }) => {
    return (
        <>
            <div style={{ fontSize: '18px', color: '#333333' }}>{title}</div>
            <div style={{ fontSize: '16px', color: '#666666' }}>{subtitle}</div>
            <div style={{ fontSize: '14px', color: '#31d086' }}>{message}</div>
        </>
    )
}

const Speaker = () => {
    return (
        <Popover title="Title">
            <p>This is a defalut Popover </p>
            <p>Content</p>
        </Popover>
    )
}

export default function EditarAnuncio(props) {

    const classes = useStyles();

    const [state, setState] = React.useState({
        showInfoMercadoLivreEditarTitulo: false,
        title: props.titulo
    });

    const optsYouTube = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
    }

    const [freeShipping, setFreeShipping] = React.useState(props.freeShipping === false ? 'false' : 'true')
    const [localPickUp, setLocalPickUp] = React.useState(props.json.shipping.local_pick_up === true ? 'true' : 'false')
    const [isClassico, setIsClassico] = React.useState(props.tipoAnuncio_id === 'gold_special' ? true : false)
    const [isPremium, setIsPremium] = React.useState(props.tipoAnuncio_id === 'gold_pro' ? true : false)
    const [showInfoFormaDeEntrega, setShowInfoFormaDeEntrega] = React.useState(false)
    const [description, setDescription] = React.useState(props.description)
    const [condicao, setCondicao] = React.useState(props.json.condition)
    const [openNovaVariacao, setOpenNovaVariacao] = React.useState(false)

    const onChangeSetAtributos = (event, id) => {
        props.atributo.map(dado => {
            if (dado.id === id) {
                dado.value_name = event.target.value
            }
        })
        props.setAtributo(props.atributo)
    }

    const handleSetAtributo = id => {
        return props.atributo.reduce((valorAc, valorCr) => {
            if (valorCr.id === id) {
                return valorCr.value_name
            }
        })
    }

    const handleSetValue = id => {
        return props.atributo.map(dado => {
            if (dado.id === id) {
                return dado.values.map(value => {
                    if (dado.value_name === value.name) {
                        return dado.value_name
                    }
                })
            }
        })
    }

    const confirmarAtributos = () => {
        props.setLoadingButtonAtributos(true)
        props.updateAtributos(props.atributo, props.id)
    }

    const inicializarGarantia = () => {
        let dados = props.json.sale_terms.map(json => {
            if (json.value_id !== null) {
                if (json.value_id === '2230280') {
                    return 'gv'
                } else if (json.value_id === '2230279') {
                    return 'gf'
                } else {
                    return 'sg'
                }
            }
        })
        return String(dados).replace(',', '').replace(',', '')
    }

    const inicializarTempoGarantia = () => {
        let dados = props.json.sale_terms.map(json => {
            if (json.id === 'WARRANTY_TIME') {
                return json.value_struct.unit
            }
        })
        return String(dados).replace(',', '').replace(',', '')
    }

    const inicializarValueNameGarantia = () => {
        let dados = props.json.sale_terms.map(json => {
            if (json.id === 'WARRANTY_TIME') {
                return json.value_struct.number
            }
        })
        return String(dados).replace(',', '').replace(',', '')
    }

    const inicializarDisponibilidadeEstoque = () => {
        let dados = props.json.sale_terms.map(json => {
            if (json.id === 'MANUFACTURING_TIME') {
                return json.value_struct.number
            }
        })
        return String(dados).replace(',', '').replace(',', '')
    }

    const [garantia, setGarantia] = React.useState(props.garantia === undefined ? inicializarGarantia() : props.garantia)
    const [tempoGarantia, setTempoGarantia] = React.useState(inicializarTempoGarantia())
    const [valueNameGarantia, setValueNameGarantia] = React.useState(inicializarValueNameGarantia())
    const [qtdeDisponibilidadeEstoque, setQtdeDisponibilidadeEstoque] = React.useState(inicializarDisponibilidadeEstoque())
    const [linkVideo, setLinkVideo] = React.useState(props.video_id)

    const handleFreeShipping = event => {
        setFreeShipping(event.target.value)
    }

    const handleGarantia = event => {
        setGarantia(event.target.value)
    }

    const handleLocalPickUp = event => {
        setLocalPickUp(event.target.value)
    }

    const handleTempoGarantia = event => {
        setTempoGarantia(event.target.value)
    }

    const handleValueNameGarantia = event => {
        setValueNameGarantia(event.target.value)
    }

    const verificarFormaEntrega = (custoFrete) => {
        if (freeShipping === 'false') {
            setShowInfoFormaDeEntrega(true)
        } else {
            props.setLoadingButtonFormaEntrega(true)
            props.updateShipping(props.id, freeShipping === 'true' ? true : false, Number(custoFrete))
        }
    }

    const confirmarFormaEntrega = () => {
        props.updateShipping(props.id, freeShipping === 'true' ? true : false)
        props.setLoadingButtonFormaEntrega(true)
        setShowInfoFormaDeEntrega(false)
    }

    const verificarGarantia = () => {
        if (garantia === 'gv') {
            return 'Garantia do vendedor'
        } else if (garantia === 'gf') {
            return 'Garantia do fabrica'
        } else {
            return 'Sem garantia'
        }
    }

    const confirmarGarantia = () => {
        //Depois precisar validar somente números no valueNameGarantia
        if (valueNameGarantia === "" && garantia !== 'sg') {
            sendNotification('error', 'Ops.. Não foi possível confirmar os dados da garantia, por favor digite um número inteiro.', 5000)
        } else {
            props.updateGarantia(props.id, verificarGarantia(), valueNameGarantia, tempoGarantia, garantia)
            props.setLoadingButtonGarantia(true)
        }
    }

    const confirmarRetirarPessoalmente = () => {
        props.setLoadingButtonRetirarPessoalmente(true)
        props.updateRetirarPessoalmente(props.id, localPickUp === 'true' ? true : false)
    }



    const confirmarDisponibilidadeEstoque = () => {
        if (qtdeDisponibilidadeEstoque === "") {
            props.updateDisponibilidadeEstoque(props.id, 0)
            props.setLoadingButtonDisponibilidadeEstoque(true)
        } else {
            props.updateDisponibilidadeEstoque(props.id, qtdeDisponibilidadeEstoque)
            props.setLoadingButtonDisponibilidadeEstoque(true)
        }
    }

    const confirmarCondicao = () => {
        props.updateCondicao(props.id, condicao)
        props.setLoadingButtonCondicao(true)
    }

    const setListingType = () => {
        if (isClassico) {
            return 'gold_special'
        } else {
            return 'gold_pro'
        }
    }

    const mostrarTarifaVendaPremium = () => {
        if (props.json.shipping.free_shipping) {
            return ((props.preco * 16) / 100).toFixed(2)
        } else {
            return (((props.preco * 16) / 100) + 5).toFixed(2)
        }
    }

    const mostrarTarifaVendaClassico = () => {
        if (props.json.shipping.free_shipping) {
            return ((props.preco * 11) / 100).toFixed(2)
        } else {
            return (((props.preco * 11) / 100) + 5).toFixed(2)
        }
    }

    const handleConfirmarListingType = () => {
        if (isClassico && isPremium) {
            sendNotification('error', 'Você selecionou dois tipos de anúncios: CLÁSSICO e PRÉMIUM, por favor escolha apenas um dos dois e clique em Confirmar', 5000)
            return
        }
        if (!isClassico && !isPremium) {
            sendNotification('error', 'Você não selecionou nenhum tipo de anúncio, por favor escolha CLÁSSICO OU PRÉMIUM e clique em Confirmar', 5000)
            return
        }

        props.setLoadingButtonTipoAnuncio(true)
        props.updateListingType(props.id, setListingType())
    }

    const handleConfirmarTitulo = () => {
        props.setLoadingButtonTitulo(true)
        props.updateTitle(props.id, state.title)
    }

    const handleConfirmarDescription = () => {
        props.setLoadingButtonDescription(true)
        props.updateDescription(props.id, description)
    }

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleDisponibilidadeEstoque = event => {
        //Depois precisar validar somente números
        setQtdeDisponibilidadeEstoque(event.target.value)
    }



    const verificarQualidade = () => {
        let health = props.json.health * 100
        if (health < 75) {
            return 'Qualidade básica'
        }
        if (health >= 75 && health < 100) {
            return 'Qualidade Satisfatória'
        }
        if (health === 100) {
            return 'Qualidade Profissional'
        }
    }

    const confirmarVideoYoutube = () => {
        props.setLoadingButtonVideoYoutube(true)
        props.updateVideoYoutube(props.id, linkVideo)
    }

    const handleAtivarAnuncio = () => {
        props.updateStatus(props.id, props.status === 'paused' ? 'active' : 'paused')
        props.setLoadingButton(true)
        props.setDisabledButton(true)
        sendNotification('success', 'Estamos ativando seu anúncio! Por favor aguarde...', 5000)
    }
    

    return (
        <>
            <Dialog fullScreen open={props.showModal} onClose={() => props.setShowModal(false)}>

                <AppBar className={classes.appBar} style={{ 'backgroundColor': '#4682B4' }}>
                    <Toolbar>
                        <Chip icon={<EditIcon />} label='Modificar Anúncio' />
                        <Typography variant="h6" className={classes.title}>
                            {props.titulo}
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={() => props.setShowModal(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div id='contaner' style={{ display: 'flex' }}>
                    <div style={{ margin: '15px 10px 0', backgroundColor: '#f1f1f1' }}>
                        <Row>
                            <Col md={12}>
                                {props.status !== "active" &&
                                    <Message warning>
                                        <MessageHeader>Inativo</MessageHeader>
                                        <MessageContent>O anúncio está pausado.</MessageContent>
                                        <ButtonUI onClick={() => handleAtivarAnuncio()} size="small" variant="contained">Reativar</ButtonUI>
                                    </Message>
                                }
                                <Paper elevation={3}>
                                    <ExpansionPanel expanded>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '14px', color: '#8c8c8c' }}>
                                                <Chip label={<> Total de visitas: {props.visualizacao}</>} />
                                                <Chip label={<> Total de vendas: {props.quantidadeVendido}</>} />
                                            </span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <Col md={12}>
                                                    <FormInput onChange={(event) => { setState({ title: event.target.value }) }} width='500px' label="Título" value={props.titulo} style={{ "color": "blue" }} disabled={props.quantidadeVendido > 0 ? true : false} />
                                                    {props.quantidadeVendido > 0 &&
                                                        <Message info style={{ width: '500px' }}>
                                                            <Message.Header>De acordo com as políticas do Mercado Livre, só será possível alterar os títulos dos anúncios que NÃO tiverem vendas.</Message.Header>
                                                        </Message>
                                                    }
                                                    {props.quantidadeVendido === 0 &&
                                                        <Message info style={{ width: '500px' }}>
                                                            <p style={{ fontSize: '11px' }}>Quer saber como criar um bom título para seus anúncios? <ButtonUI onClick={() => setState({ showInfoMercadoLivreEditarTitulo: true })} style={{ fontSize: '11px' }} size="small">Clique aqui</ButtonUI></p>
                                                        </Message>
                                                    }

                                                    {props.json.variations.length === 0 && <> <Divider />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px' }}>
                                                            <div style={{ color: '#333333', fontSize: '16px' }}>Características</div>
                                                            <ButtonUI onClick={() => setOpenNovaVariacao(true)} color="primary" startIcon={<CloseIcon />}>Adicionar variações</ButtonUI>
                                                        </div>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ color: '#999999', fontSize: '13px', paddingRight: '5px' }}>Fotos</div>
                                                            <Popup
                                                                wide='very'
                                                                content={
                                                                    <>
                                                                        <div style={{ padding: '15px 0 5px', color: '#666666' }}>Mostre o produto em detalhes, com fundo branco e bem iluminado. Não inclua bordas, logotipos ou marcas d'água..</div>
                                                                    </>
                                                                }
                                                                key={props.id}
                                                                header='Como tirar boas fotos?'
                                                                trigger={<img src={imgInfoComFreteGratis}></img>}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Segment raised color='grey' style={{ width: '750px' }}>
                                                                <div style={{ display: 'flex' }}>
                                                                    <div style={{ padding: '10px 5px 0', paddingRight: '20px' }}>
                                                                        <Paper style={{ height: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} elevation={2}>
                                                                            <ButtonUI color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                                                                Adicionar
                                                                            </ButtonUI>
                                                                            <ButtonUI style={{ left: '-4px' }} color="primary" aria-label="upload picture" component="span" startIcon={<DeleteForeverIcon />}>
                                                                                Remover
                                                                            </ButtonUI>
                                                                        </Paper>
                                                                    </div>
                                                                    <div style={{ overflowX: props.json.pictures.length >= 6 ? 'scroll' : '' }} id='imagens'>
                                                                        <div style={{ display: 'flex' }}>
                                                                            {props.json.pictures.map((imagem, key) => {
                                                                                return (
                                                                                    <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                        <Paper elevation={3} style={{ margin: '0 10px 0', marginTop: '10px' }}>
                                                                                            <img src={imagem.url} alt='imageVariation' height='100' width='80' />
                                                                                        </Paper>
                                                                                        <div style={{ padding: '0 10px 0', display: 'flex' }}>
                                                                                            <div>
                                                                                                <Tooltip title="Clique aqui para alterar a imagem!">
                                                                                                    <IconButton style={{ left: '-15px' }}><AddPhotoAlternateIcon /></IconButton>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                            <div>
                                                                                                <Tooltip title="Clique aqui para remover a imagem!">
                                                                                                    <Checkbox
                                                                                                        defaultChecked={false}
                                                                                                        color="primary"
                                                                                                        style={{ left: '-30px', top: '3px' }}
                                                                                                    />
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Segment>
                                                        </div>
                                                        <div style={{ paddingTop: '20px' }}>
                                                            <TextField style={{ paddingRight: '15px' }} label="Quantidade *" value={props.estoque_total} />
                                                            {props.json.attributes.map(att => {
                                                                if (att.id === 'GTIN') {
                                                                    return (
                                                                        <TextField style={{ width: '200px' }} label={att.name} value={att.value_name} helperText="Pode ser um EAN, UPC ou outro GTIN" />
                                                                    )
                                                                }
                                                            })}
                                                            <Popup
                                                                wide='very'
                                                                content={
                                                                    <>
                                                                        <div style={{ padding: '15px 0 5px', color: '#666666' }}>
                                                                            É um número que tem entre 8 e 14 dígitos e está perto do código de barras, na caixa do produto ou na etiqueta.
                                                                    </div>
                                                                    </>
                                                                }
                                                                key={props.id}
                                                                header='Como eu identifico?'
                                                                trigger={<img style={{ paddingTop: '20px' }} src={imgInfoComFreteGratis}></img>}
                                                            />
                                                        </div></>}
                                                </Col>
                                            </Row>
                                        </ExpansionPanelDetails>
                                        <div>
                                            <CardActions>
                                                <ButtonUI startIcon={<CheckCircleIcon />} onClick={() => handleConfirmarTitulo()} disabled={props.quantidadeVendido > 0 ? true : false} variant="contained">{props.loadingButtonTitulo === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                            </CardActions>
                                        </div>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>


                        <p></p>

                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Ficha técnica</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column' }}>
                                            {props.validationAttribute &&
                                                < Message warning style={{ width: '500px' }}>
                                                    <Message.Header>Para recuperar sua exposição, por favor, corrija sua ficha técnica</Message.Header>
                                                    <p style={{ fontSize: '11px' }}>Por favor, adicione mais dados, porque faltam informações</p>
                                                </Message>
                                            }
                                            {props.atributo.map(att => {
                                                if (att.values === undefined) {
                                                    return (
                                                        <div key={att.id}>
                                                            {att.id !== 'GTIN' && <TextField key={att.id} value={handleSetAtributo(att.id)} onChange={(event => onChangeSetAtributos(event, att.id))} label={att.name} style={{ width: '100%', padding: '5px 0 5px' }} variant="filled" />}
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={att.id}>
                                                            {att.id !== 'ITEM_CONDITION' && <FormControl variant="filled" style={{ width: '100%', padding: '5px 0 5px' }}>
                                                                <InputLabel>{att.name}</InputLabel>
                                                                <Select value={handleSetAtributo(att.id)} onChange={(event => onChangeSetAtributos(event, att.id))}>
                                                                    {att.values.map(value => {
                                                                        return (
                                                                            <MenuItem value={value.name} key={value.id}>{value.name}</MenuItem>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormControl>}
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </ExpansionPanelDetails>
                                        <div>
                                            <CardActions>
                                                <ButtonUI startIcon={<CheckCircleIcon />} onClick={() => confirmarAtributos()} variant="contained">{props.loadingButtonAtributos === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                            </CardActions>
                                        </div>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel onChange={() => props.obterValorDoCustoFreteGratisPorAnuncio(props.id)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <HeaderExpansionPanel
                                                className={classes.displayInline}
                                                title='Forma de entrega' />
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {props.json.shipping.mode === 'not_specified' || props.json.shipping.mode === 'custom'
                                                ? <div>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <div style={{ color: '#000000', fontSize: '18px' }}>
                                                            <img src={imgOfereceMercadoEnvios}></img>Mercado Envios não habilitado para essa categoria.
                                                        </div>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={true} />}
                                                            label="Faço envio por conta própria!"
                                                        />
                                                        <FormControl component="fieldset">
                                                            <RadioGroup value={localPickUp} onChange={(event) => handleLocalPickUp(event)}>
                                                                <FormControlLabel value='true' control={<Radio />} label={
                                                                    <span style={{ color: '#000000', fontSize: '18px' }}>Com frete grátis para todo o país</span>
                                                                } />
                                                                <FormControlLabel value='false' control={<Radio />} label={
                                                                    <div style={{ color: '#000000', fontSize: '18px' }}>Por conta do comprador</div>
                                                                } />
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <div>
                                                            <TextField style={{ width: '400px', paddingRight: '15px' }} label="Exemplo: SEDEX, SP, RJ, SC, MS..." />
                                                            <TextField label="R$" />
                                                            <IconButton><CloseIcon /></IconButton>
                                                        </div>
                                                        <div>
                                                            <TextField style={{ width: '400px', paddingRight: '15px' }} label="Exemplo: Terminal de retirada, Expresso..." />
                                                            <TextField label="R$" />
                                                            <IconButton><CloseIcon /></IconButton>
                                                        </div>
                                                        <ButtonUI color="primary" style={{ paddingTop: '20px' }} startIcon={<CloseIcon />}>Adicionar outro</ButtonUI>
                                                    </div>
                                                </div>
                                                : <Row>
                                                    <Col md={6}>
                                                        <div style={{ color: '#000000', fontSize: '18px' }}>
                                                            <img src={imgOfereceMercadoEnvios}></img>Faço envios pelo Mercado Envios
                                                        </div>
                                                        <FormControl component="fieldset">
                                                            <RadioGroup value={freeShipping} onChange={(event) => handleFreeShipping(event)}>

                                                                <FormControlLabel style={{ paddingTop: '50px' }} value='true' control={<Radio />} label={
                                                                    <span style={{ color: '#000000', fontSize: '18px' }}>
                                                                        Com frete grátis. {' '}
                                                                        <Popup
                                                                            wide='very'
                                                                            content={
                                                                                <>
                                                                                    <div style={{ padding: '10px 0 0' }}><img src={imgOfereceMercadoEnvios}></img>Frete grátis no serviço normal.</div>
                                                                                    <div><img src={imgOfereceMercadoEnvios}></img>Descontos significativos no serviço expresso.</div>
                                                                                    <div style={{ padding: '15px 0 5px', color: '#666666' }}>Em alguns casos, no lugar do frete grátis, eles terão descontos nos dois serviços. Isso dependerá do peso, do preço e da distância do envio.</div>
                                                                                </>
                                                                            }
                                                                            key={props.id}
                                                                            header='Todos os seus compradores terão:'
                                                                            trigger={<img src={imgInfoComFreteGratis}></img>}
                                                                        />

                                                                    </span>
                                                                } />

                                                                <div style={{ color: '#666666', fontSize: '16px', paddingLeft: '27px' }}>Você paga R$ {props.custoFrete} pelo frete para qualquer destino</div>
                                                                <FormControlLabel style={{ paddingTop: '15px' }} value='false' control={<Radio />} label={
                                                                    <div style={{ color: '#000000', fontSize: '18px' }}>Não oferecer frete grátis</div>
                                                                } />

                                                            </RadioGroup>
                                                        </FormControl>
                                                        <div style={{ color: '#666666', fontSize: '16px', paddingLeft: '27px' }}>O Comprador paga o frete</div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <img style={{ paddingTop: '120px' }} src={imgFormaDeEntrega}></img>
                                                    </Col>
                                                </Row>}
                                        </ExpansionPanelDetails>
                                        <div>
                                            <CardActions>
                                                <ButtonUI startIcon={<CheckCircleIcon />} onClick={() => verificarFormaEntrega(props.custoFrete)} variant="contained">{props.loadingButtonFormaEntrega === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                            </CardActions>
                                        </div>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Retirar pessoalmente</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <FormControl component="fieldset">
                                                    <RadioGroup style={{ padding: '0 10px 0' }} value={localPickUp} onChange={(event) => handleLocalPickUp(event)}>
                                                        <FormControlLabel value='true' control={<Radio />} label={
                                                            <span style={{ color: '#000000', fontSize: '18px' }}>Concordo</span>
                                                        } />
                                                        <FormControlLabel value='false' control={<Radio />} label={
                                                            <div style={{ color: '#000000', fontSize: '18px' }}>Não aceito</div>
                                                        } />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div>
                                                    <CardActions>
                                                        <ButtonUI onClick={() => confirmarRetirarPessoalmente()} startIcon={<CheckCircleIcon />} variant="contained">{props.loadingButtonRetirarPessoalmente === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                                    </CardActions>
                                                </div>
                                            </Row>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Tipo de anúncio</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <Col md={6}>
                                                    <Card style={{ width: '300px' }}>
                                                        <CardContent>
                                                            <div>
                                                                <img src={imgAnuncioClassico}></img>
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                                                                <div>Clássico</div>
                                                            </div>
                                                            <div style={{ fontSize: '20px', color: '#333333' }}>
                                                                <div>Exposição alta</div>
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: '#000000' }}>
                                                                <div></div>
                                                                <div>Duração ilimitada</div>
                                                            </div>

                                                            <br></br>
                                                            <Divider style={{ marginTop: '34px' }} />
                                                            <div style={{ fontSize: '32px', color: '#000000' }}>R$ {mostrarTarifaVendaClassico()}</div>
                                                            <div style={{ fontSize: '12px', color: '#000000' }}>Tarifa de venda</div>
                                                        </CardContent>
                                                        <CardActions>
                                                            <FormControlLabel
                                                                control={<Switch checked={isClassico} onChange={(event) => setIsClassico(event.target.checked)} />}
                                                                label={isClassico ? 'Selecionado' : ''}
                                                                color="primary"
                                                            />
                                                        </CardActions>
                                                    </Card>
                                                </Col>
                                                <Col md={6}>
                                                    <Card style={{ width: '300px' }}>
                                                        <CardContent>
                                                            <div>
                                                                <img src={imgAnuncioPremium}></img>
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                                                                <div>Premium</div>
                                                            </div>
                                                            <div style={{ fontSize: '20px', color: '#333333' }}>
                                                                <div>Exposição máxima</div>
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: '#000000' }}>
                                                                <div></div>
                                                                <div>Duração ilimitada</div>
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: '#000000' }}>
                                                                <div></div>
                                                                <div>Você oferece parcelamento sem acréscimo</div>
                                                            </div>

                                                            <br></br>
                                                            <Divider style={{ marginTop: '9px' }} />
                                                            <div style={{ fontSize: '32px', color: '#000000' }}>R$ {mostrarTarifaVendaPremium()}</div>
                                                            <div style={{ fontSize: '12px', color: '#000000' }}>Tarifa de venda</div>
                                                        </CardContent>
                                                        <CardActions>
                                                            <FormControlLabel
                                                                control={<Switch checked={isPremium} onChange={(event) => setIsPremium(event.target.checked)} />}
                                                                label={isPremium ? 'Selecionado' : ''}
                                                                color="primary"
                                                            />
                                                        </CardActions>
                                                    </Card>
                                                </Col>

                                                <CardActions>
                                                    <ButtonUI startIcon={<CheckCircleIcon />} onClick={() => handleConfirmarListingType()} variant="contained">{props.loadingButtonTipoAnuncio === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                                </CardActions>
                                            </Row>

                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Descrição</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}>| Opcional</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <TextField multiline label="Descrição somente texto" value={description} style={{ "color": "blue", width: '500%' }} onChange={handleDescription} />
                                        </ExpansionPanelDetails>
                                        <CardActions>
                                            <ButtonUI startIcon={<CheckCircleIcon />} onClick={() => handleConfirmarDescription()} variant="contained">{props.loadingButtonDescription === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                        </CardActions>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Vídeo</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}>| Opcional</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div>
                                                <div style={{ fontSize: '16px', color: '#666666' }}>Adicione o link do vídeo do YouTube</div>
                                                <Input icon='youtube' iconPosition='left' placeholder='Informe aqui o link do YouTube'
                                                    value={linkVideo} onChange={(event) => setLinkVideo(event.target.value)} style={{ "color": "blue", 'width': '640px' }} />
                                                {linkVideo !== '' &&
                                                    <YouTube
                                                        videoId={linkVideo.replace("https://www.youtube.com/watch?v=", "")}
                                                        opts={optsYouTube}
                                                    />
                                                }
                                            </div>
                                        </ExpansionPanelDetails>
                                        <div>
                                            <CardActions>
                                                <ButtonUI onClick={() => confirmarVideoYoutube()} startIcon={<CheckCircleIcon />} variant="contained">{props.loadingButtonVideoYoutube === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                            </CardActions>
                                        </div>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Disponibilidade de estoque</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}>| Opcional</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <Col>
                                                    <Message style={{ width: '650px' }}>
                                                        <Message.Header>Indique quantos dias corridos você demora para disponibilizar o produto. Isso será mostrado no seu anúncio e ajudará na decisão dos seus compradores.</Message.Header>
                                                    </Message>
                                                    <Message info style={{ width: '650px' }}>
                                                        <Message.Header>Quanto mais tempo adicionar, menos exposição você terá. Sempre o Mercado Livre irá mostrar primeiro os anúncios com estoque disponível.</Message.Header>
                                                    </Message>
                                                    <TextField
                                                        label="Dias"
                                                        style={{ margin: 8 }}
                                                        value={qtdeDisponibilidadeEstoque}
                                                        onChange={(event) => handleDisponibilidadeEstoque(event)}
                                                        placeholder="Ex.: 2"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    <div style={{ padding: '0 6px 0' }}>Este prazo é fixo, exclua-o quando ele não for mais necessário.</div>
                                                </Col>
                                                <div>
                                                    <CardActions>
                                                        <ButtonUI onClick={() => confirmarDisponibilidadeEstoque()} startIcon={<CheckCircleIcon />} variant="contained">{props.loadingButtonDisponibilidadeEstoque === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                                    </CardActions>
                                                </div>
                                            </Row>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Garantia</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <FormControl component="fieldset">
                                                    <RadioGroup style={{ padding: '0 10px 0' }} value={garantia} onChange={(event) => handleGarantia(event)}>
                                                        <FormControlLabel value='gv' control={<Radio />} label={
                                                            <span style={{ color: '#000000', fontSize: '18px' }}>Garantia do vendedor</span>
                                                        } />
                                                        {garantia === 'gv' &&

                                                            <div style={{ display: 'flex' }}>
                                                                <TextField value={valueNameGarantia} style={{ padding: '0 10px 0' }} placeholder='Ex: 2' onChange={(event) => handleValueNameGarantia(event)} />
                                                                <Select value={tempoGarantia} onChange={(event) => handleTempoGarantia(event)}>
                                                                    <MenuItem value='dias'>dias</MenuItem>
                                                                    <MenuItem value='meses'>meses</MenuItem>
                                                                    <MenuItem value='anos'>anos</MenuItem>
                                                                </Select>
                                                            </div>

                                                        }
                                                        <FormControlLabel value='gf' control={<Radio />} label={
                                                            <div style={{ color: '#000000', fontSize: '18px' }}>Garantia de fábrica</div>
                                                        } />
                                                        {garantia === 'gf' &&

                                                            <div style={{ display: 'flex' }}>
                                                                <TextField value={valueNameGarantia} style={{ padding: '0 10px 0' }} placeholder='Ex: 2' onChange={(event) => handleValueNameGarantia(event)} />
                                                                <Select value={tempoGarantia} onChange={(event) => handleTempoGarantia(event)}>
                                                                    <MenuItem value='dias'>dias</MenuItem>
                                                                    <MenuItem value='meses'>meses</MenuItem>
                                                                    <MenuItem value='anos'>anos</MenuItem>
                                                                </Select>
                                                            </div>

                                                        }
                                                        <FormControlLabel value='sg' control={<Radio />} label={
                                                            <div style={{ color: '#000000', fontSize: '18px' }}>Sem garantia</div>
                                                        } />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div>
                                                    <CardActions>
                                                        <ButtonUI onClick={() => confirmarGarantia()} startIcon={<CheckCircleIcon />} variant="contained">{props.loadingButtonGarantia === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                                    </CardActions>
                                                </div>
                                            </Row>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Condição</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Row>
                                                <FormControl component="fieldset">
                                                    <RadioGroup style={{ padding: '0 10px 0' }} value={condicao} onChange={(event) => setCondicao(event.target.value)}>
                                                        <FormControlLabel value='new' control={<Radio />} label={
                                                            <span style={{ color: '#000000', fontSize: '18px' }}>Novo</span>
                                                        } />
                                                        <FormControlLabel value='used' control={<Radio />} label={
                                                            <div style={{ color: '#000000', fontSize: '18px' }}>Usado</div>
                                                        } />
                                                    </RadioGroup>
                                                </FormControl>
                                                <div>
                                                    <CardActions>
                                                        <ButtonUI onClick={() => confirmarCondicao()} startIcon={<CheckCircleIcon />} variant="contained">{props.loadingButtonCondicao === true ? 'Processando...' : 'Confirmar'}</ButtonUI>
                                                    </CardActions>
                                                </div>
                                            </Row>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col md={12}>
                                <Paper elevation={3}>
                                    <ExpansionPanel onChange={() => props.obterCategoria(props.id)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}>
                                            <span style={{ fontSize: '18px', color: '#333333' }}>Categoria</span>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails style={{ display: 'flex', justifyContent: 'space-between' }}>


                                            <div style={{ color: '#333333', fontSize: '14px' }}>
                                                {props.loadingCategoria ? 'Carregando, aguarde...' : props.categoria}
                                            </div>

                                            <div>
                                                <ButtonUI disabled={props.quantidadeVendido > 0 ? true : false} size='small' style={{ color: '#333333' }}>Editar</ButtonUI>
                                            </div>

                                        </ExpansionPanelDetails>
                                        {props.quantidadeVendido > 0 &&
                                            <Message warning>
                                                <Message.Header>De acordo com o Mercado Livre, como o anúncio teve vendas, você não pode mais mudar a categoria.</Message.Header>
                                            </Message>
                                        }
                                    </ExpansionPanel>
                                </Paper>
                            </Col>
                        </Row>

                        <Modal.Footer>
                            <ButtonUI startIcon={<CloseIcon />} variant="contained" color="secondary" onClick={() => props.setShowModal(false)}>
                                Fechar
                        </ButtonUI>
                        </Modal.Footer>

                    </div>
                    <div id='barralateral' style={{ padding: '15px 5px 0' }}>
                        <Paper elevation={3} style={{ position: 'fixed' }}>
                            <div style={{ display: 'flex' }}>
                                <Circle progress={props.json.health * 100} />
                                <div style={{ padding: '15px 10px 0' }}>
                                    <div><span style={{ color: '#2ec07e', fontSize: '12px' }}>{props.json.health}</span>/<span style={{ color: '#bfbfbf', fontSize: '12px' }}>10</span></div>
                                    <div style={{ color: '#333333', fontSize: '24px' }}>{verificarQualidade()}</div>
                                    <div style={{ color: '#bfbfbf', fontSize: '12px' }}>Alcance os objetivos e consiga um anúncio profissional.</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', margin: '20px 5px 0' }}>
                                <div style={{ color: '#bfbfbf', fontSize: '14px' }}>Objetivos a alcançar</div>
                                <div style={{ borderBottom: '1px solid black', margin: '0 0 8px', borderColor: '#bfbfbf', marginLeft: '20px', width: '50%' }}></div>
                            </div>

                            {freeShipping === 'false' &&
                                <div style={{ display: 'flex' }}>
                                    <IconButton color="primary" style={{ fontSize: '12px' }}>
                                        <LocalShippingIcon />
                                        <span style={{ padding: '0 5px 0' }}>Ofereça frete grátis</span>
                                    </IconButton>
                                </div>
                            }
                            {isClassico &&
                                <div style={{ display: 'flex' }}>
                                    <IconButton color="primary" style={{ fontSize: '12px' }}>
                                        <DateRangeIcon />
                                        <span style={{ padding: '0 5px 0' }}>Ofereça parcelamento sem juros</span>
                                    </IconButton>
                                </div>
                            }

                        </Paper>
                    </div>
                </div>
            </Dialog>

            <Dialog open={state.showInfoMercadoLivreEditarTitulo} onClose={() => setState({ showInfoMercadoLivreEditarTitulo: false })} maxWidth='xl'>
                <DialogTitle>Escrever um bom título</DialogTitle>
                <Paper style={{ fontSize: '16px', color: '#666666' }}>
                    <div style={{ margin: '0 23px 0' }}>
                        <div>O título é fundamental para que os compradores encontrem o seu produto. Por isso, ele deve ser o mais claro possível.</div>
                        <p></p>
                        <div>Lembre-se de que você só será possível editar os anúncios sem vendas.</div>
                        <p></p>
                        <ul>
                            <li style={{ padding: '0 0 10px' }}>Crie o título com <strong>Produto + Marca + modelo do produto + algumas especificações que ajudem a identificar o produto.</strong></li>
                            <li style={{ padding: '0 0 10px' }}><p><strong>Evite colocar no título informações sobre outros serviços</strong>, como devoluções, frete grátis ou parcelamento. Estes dados serão incluídos por nós para que os compradores possam vê-los antes mesmo de entrar no anúncio.</p></li>
                            <li style={{ padding: '0 0 10px' }}><strong>Caso seu produto seja novo, usado ou recondicionado, não inclua isto no título</strong>, nós informaremos no detalhe do anúncio.</li>
                            <li style={{ padding: '0 0 10px' }}><p><strong>Se você vende o mesmo produto, porém em várias cores, evite especificar isso no título.</strong>É melhor criar variações, assim tudo ficará em um único anúncio.</p></li>
                            <li style={{ padding: '0 0 10px' }}><p>Caso você tenha estoque em apenas uma determinada cor, <strong>adicione a quantidade na variação correspondente ao anunciar, ou em Modificar.</strong></p></li>
                            <li style={{ padding: '0 0 10px' }}><p><strong>Se você oferecer algum desconto, destacaremos isso no seu anúncio,</strong>indicando a porcentagem do desconto.</p></li>
                            <li style={{ padding: '0 0 10px' }}><p>Separe as palavras com espaço, <strong>não use sinais de pontuação nem símbolos.</strong></p></li>
                            <li style={{ padding: '0 0 10px' }}><p>Revise para garantir que <strong>não tenha erros de ortografia.</strong></p></li>
                        </ul>
                        <div style={{ padding: '20px 0 10px' }}>Por exemplo: Notebook HP Dual Core 425 LED 14 320 GB 4 GB Wifi HDMI</div>
                    </div>
                    <Modal.Footer>
                        <ButtonUI startIcon={<CheckCircleIcon />} variant="contained" color="secondary" onClick={() => setState({ showInfoMercadoLivreEditarTitulo: false })}>
                            Ok, entendi!
                        </ButtonUI>
                    </Modal.Footer>
                </Paper>
            </Dialog>

            <Dialog open={showInfoFormaDeEntrega} onClose={() => { setShowInfoFormaDeEntrega(false) }}>
                <Paper>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 15px 0' }}>
                        <div><img src={imgFormaEntregaAviso}></img></div>
                        <div style={{ color: '#333333', fontSize: '18px', padding: '10px 0 10px' }}><strong>Você não oferecerá mais frete grátis e descontos significativos</strong></div>
                        <div style={{ color: '#666666', fontSize: '14px', padding: '0 26px 10px' }}>Você perderá oportunidades de vendas, exposição nos resultados de busca e diminuirá o nível de qualidade do seu anúncio.</div>
                        <CardActions>
                            <ButtonUI startIcon={<CloseIcon />} onClick={() => { setShowInfoFormaDeEntrega(false) }}>
                                Cancelar
                            </ButtonUI>
                            <ButtonUI startIcon={<CheckCircleIcon />} variant="contained" color="primary" onClick={() => confirmarFormaEntrega()}>
                                {props.loadingButtonFormaEntrega === true ? 'Processando...' : 'Confirmar'}
                            </ButtonUI>
                        </CardActions>
                    </div>
                </Paper>
            </Dialog>

            {openNovaVariacao && 
            <NovaVariacao
                {...props}
                openNovaVariacao={openNovaVariacao}
                setOpenNovaVariacao={setOpenNovaVariacao}
            />}
        </>
    )
}