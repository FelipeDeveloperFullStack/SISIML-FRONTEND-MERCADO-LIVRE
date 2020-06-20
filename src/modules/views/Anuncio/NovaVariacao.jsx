import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import novaVariacaoImage from '../../../assets/img/nova_variacao_icon.png'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import { Popup, Segment} from 'semantic-ui-react'
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import imgInfoComFreteGratis from '../../../assets/img/infoComFreteGratis.png'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        borderRadius: '20px'
    }
}));



export default function NovaVariacao(props) {

    const classes = useStyles();

    const [openDialogCaracteristica, setOpenDialogCaracteristica] = React.useState(false)
    const [isDisabledButtonCaracteristica, setIsDisabledButtonCaracteristica] = React.useState(true)
    const [isOpenOpcoes, setIsOpenOpcoes] = React.useState(false)
    const [isOpenVariacoes, setIsOpenVariacoes] = React.useState(false)
    const [textFieldCaracteristica, setTextFieldCaracteristica] = React.useState('')

    const [textFieldOpcoes01, setTextFieldOpcoes01] = React.useState({
        text: '',
        quantidade: 0
    })
    const [textFieldOpcoes02, setTextFieldOpcoes02] = React.useState('')
    const [textFieldOpcoes03, setTextFieldOpcoes03] = React.useState('')
    const [textFieldOpcoes04, setTextFieldOpcoes04] = React.useState('')
    const [textFieldOpcoes05, setTextFieldOpcoes05] = React.useState('')
    const [textFieldOpcoes06, setTextFieldOpcoes06] = React.useState('')
    const [textFieldOpcoes07, setTextFieldOpcoes07] = React.useState('')
    const [textFieldOpcoes08, setTextFieldOpcoes08] = React.useState('')
    const [textFieldOpcoes09, setTextFieldOpcoes09] = React.useState('')
    const [textFieldOpcoes10, setTextFieldOpcoes10] = React.useState('')
    const [textFieldOpcoes11, setTextFieldOpcoes11] = React.useState('')
    const [textFieldOpcoes12, setTextFieldOpcoes12] = React.useState('')
    const [textFieldOpcoes13, setTextFieldOpcoes13] = React.useState('')
    const [textFieldOpcoes14, setTextFieldOpcoes14] = React.useState('')
    const [textFieldOpcoes15, setTextFieldOpcoes15] = React.useState('')
    const [textFieldOpcoes16, setTextFieldOpcoes16] = React.useState('')

    const [infoVariacoes, setInfoVariacoes] = React.useState([])
    const [indexVariacao, setIndexVariacao] = React.useState(0)

    const handleDeleteCaracteristica = () => {
        setOpenDialogCaracteristica(true)
    }

    const handleOnChangeCaracteristica = event => {
        setTextFieldCaracteristica(event.target.value)
        if (event.target.value === '') {
            setIsDisabledButtonCaracteristica(true)
        } else {
            setIsDisabledButtonCaracteristica(false)
        }
    }

    const handlebuttonCaracteristica = () => {
        setIsOpenOpcoes(true)
        setIsDisabledButtonCaracteristica(true)
    }

    const handleOnChangeQuantidade = (id, event) => {
        infoVariacoes.map(info => {
            if(info.id === id){
                info.quantidade = event.target.value
            }
            return info
        })
        setInfoVariacoes(infoVariacoes)
    }

    const adicionarInfoVariacoes = () => {

        if (textFieldOpcoes01 != '') {
            infoVariacoes.push({
                id: 1,
                opcao: textFieldOpcoes01.text,
                fotos: [],
                quantidade: textFieldOpcoes01.quantidade
            })
        }

        if (textFieldOpcoes02 != '') {
            infoVariacoes.push({
                id: 2,
                opcao: textFieldOpcoes02.text,
                fotos: [],
                quantidade: textFieldOpcoes02.quantidade
            })
        }
        if (textFieldOpcoes03 != '') {
            infoVariacoes.push({
                id: 3,
                opcao: textFieldOpcoes03.text,
                fotos: [],
                quantidade: textFieldOpcoes03.quantidade
            })
        }
        if (textFieldOpcoes04 != '') {
            infoVariacoes.push({
                id: 4,
                opcao: textFieldOpcoes04.text,
                fotos: [],
                quantidade: textFieldOpcoes04.quantidade
            })
        }
        if (textFieldOpcoes05 != '') {
            infoVariacoes.push({
                id: 5,
                opcao: textFieldOpcoes05.text,
                fotos: [],
                quantidade: textFieldOpcoes05.quantidade
            })
        }
        if (textFieldOpcoes06 != '') {
            infoVariacoes.push({
                id: 6,
                opcao: textFieldOpcoes06.text,
                fotos: [],
                quantidade: textFieldOpcoes06.quantidade
            })
        }
        if (textFieldOpcoes07 != '') {
            infoVariacoes.push({
                id: 7,
                opcao: textFieldOpcoes07.text,
                fotos: [],
                quantidade: textFieldOpcoes07.quantidade
            })
        }
        if (textFieldOpcoes08 != '') {
            infoVariacoes.push({
                id: 8,
                opcao: textFieldOpcoes08.text,
                fotos: [],
                quantidade: textFieldOpcoes08.quantidade
            })
        }
        if (textFieldOpcoes09 != '') {
            infoVariacoes.push({
                id: 9,
                opcao: textFieldOpcoes09.text,
                fotos: [],
                quantidade: textFieldOpcoes09.quantidade
            })
        }
        if (textFieldOpcoes10 != '') {
            infoVariacoes.push({
                id: 10,
                opcao: textFieldOpcoes10.text,
                fotos: [],
                quantidade: textFieldOpcoes10.quantidade
            })
        }
        if (textFieldOpcoes11 != '') {
            infoVariacoes.push({
                id: 11,
                opcao: textFieldOpcoes11.text,
                fotos: [],
                quantidade: textFieldOpcoes11.quantidade
            })
        }
        if (textFieldOpcoes12 != '') {
            infoVariacoes.push({
                id: 12,
                opcao: textFieldOpcoes12.text,
                fotos: [],
                quantidade: textFieldOpcoes12.quantidade
            })
        }
        if (textFieldOpcoes13 != '') {
            infoVariacoes.push({
                id: 13,
                opcao: textFieldOpcoes13.text,
                fotos: [],
                quantidade: textFieldOpcoes13.quantidade
            })
        }
        if (textFieldOpcoes14 != '') {
            infoVariacoes.push({
                id: 14,
                opcao: textFieldOpcoes14.text,
                fotos: [],
                quantidade: textFieldOpcoes14.quantidade
            })
        }
        if (textFieldOpcoes15 != '') {
            infoVariacoes.push({
                id: 15,
                opcao: textFieldOpcoes15.text,
                fotos: [],
                quantidade: textFieldOpcoes15.quantidade
            })
        }
        if (textFieldOpcoes16 != '') {
            infoVariacoes.push({
                id: 16,
                opcao: textFieldOpcoes16.text,
                fotos: [],
                quantidade: textFieldOpcoes16.quantidade
            })
        }
        setInfoVariacoes(infoVariacoes)
        console.log(infoVariacoes)
        setIsOpenVariacoes(true)
    }

    const handleOnChangeOpcoes01 = (event) => {
        setTextFieldOpcoes01(event.target.value)
        infoVariacoes.filter(infoFilter => infoFilter.opcao !== textFieldOpcoes01).map(info => {
            infoVariacoes.push({
                id: 1,
                opcao: textFieldOpcoes01,
                fotos: [],
                quantidade: 0
            })
        })
        setInfoVariacoes(infoVariacoes)
    }

    const handleButtonAdicionarEstoque = index => {
        setIndexVariacao(index)
    }


    return (
        <div>
            <Dialog fullScreen open={props.openNovaVariacao} onClose={() => props.setOpenNovaVariacao(false)}>
                <AppBar className={classes.appBar} style={{ 'backgroundColor': '#4682B4' }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Adicionar variacao - {props.titulo}
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={() => props.setOpenNovaVariacao(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ margin: '0 255px 0', backgroundColor: '#E6E6E6', borderLeft: '3px solid #3483FA', borderRadius: '10px', display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ padding: '35px 42px 0' }}>
                                <div style={{ color: 'black', fontSize: '15px' }}>Editar variações de</div>
                                <div style={{ paddingBottom: '22px', color: 'black', fontSize: '15px' }}>{props.titulo}</div>
                                <div style={{ paddingBottom: '39px' }}><Button startIcon={<ArrowBackIcon />} size="small" onClick={() => props.setOpenNovaVariacao(false)}>Voltar aos detalhes</Button></div>
                            </div>
                            <div>
                                <img src={novaVariacaoImage}></img>
                            </div>
                        </div>

                        <div style={{ margin: '30px 255px 0' }}>
                            <Paper elevation={3}>
                                <div style={{ fontSize: '16px', padding: '20px 32px 20px' }}><b>Que característica faz com que o seu produto varie?</b></div>

                                <Divider style={{ marginBottom: '30px' }} />

                                <Chip style={{ marginLeft: '30px' }} onDelete={() => handleDeleteCaracteristica()} label={<TextField value={textFieldCaracteristica} onChange={handleOnChangeCaracteristica} style={{ width: '85px' }} size="small" />} />

                                <Divider style={{ marginTop: '30px' }} />

                                <div style={{ display: 'flex', justifyContent: 'flex-end', height: '59px', alignItems: 'center' }}>
                                    <Button disabled={isDisabledButtonCaracteristica} onClick={() => handlebuttonCaracteristica()} size="small" variant="contained" style={{ padding: '20px 20px 20px' }}>Confirmar</Button>
                                </div>
                            </Paper>
                        </div>

                        {isOpenOpcoes && <div style={{ margin: '30px 255px 30px' }}>
                            <Paper elevation={3}>
                                <div style={{ fontSize: '16px', padding: '20px 32px 20px' }}><b>Que opções de {textFieldCaracteristica.toLowerCase()} você tem?</b></div>

                                <Divider style={{ marginBottom: '30px' }} />

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes01.text} onChange={(event) => setTextFieldOpcoes01({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes02.text} onChange={(event) => setTextFieldOpcoes02({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes03.text} onChange={(event) => setTextFieldOpcoes03({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes04.text} onChange={(event) => setTextFieldOpcoes04({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                    </div>
                                    <div style={{ paddingTop: '5px' }}>
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes05.text} onChange={(event) => setTextFieldOpcoes05({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes06.text} onChange={(event) => setTextFieldOpcoes06({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes07.text} onChange={(event) => setTextFieldOpcoes07({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes08.text} onChange={(event) => setTextFieldOpcoes08({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                    </div>
                                    <div style={{ paddingTop: '5px' }}>
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes09.text} onChange={(event) => setTextFieldOpcoes09({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes10.text} onChange={(event) => setTextFieldOpcoes10({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes11.text} onChange={(event) => setTextFieldOpcoes11({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes12.text} onChange={(event) => setTextFieldOpcoes12({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                    </div>
                                    <div style={{ paddingTop: '5px' }}>
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes13.text} onChange={(event) => setTextFieldOpcoes13({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes14.text} onChange={(event) => setTextFieldOpcoes14({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes15.text} onChange={(event) => setTextFieldOpcoes15({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                        <Chip style={{ marginLeft: '30px' }} label={<TextField value={textFieldOpcoes16.text} onChange={(event) => setTextFieldOpcoes16({text: event.target.value})} style={{ width: '135px' }} size="small" />} />
                                    </div>
                                </div>

                                <Divider style={{ marginTop: '30px' }} />

                                <div style={{ display: 'flex', justifyContent: 'flex-end', height: '59px', alignItems: 'center' }}>
                                    <Button onClick={() => adicionarInfoVariacoes()} size="small" variant="contained" style={{ padding: '20px 20px 20px' }}>Confirmar</Button>
                                </div>
                            </Paper>
                        </div>}

                        {isOpenVariacoes && <div style={{ margin: '30px 255px 30px' }}>
                            <Paper elevation={3}>
                                <div style={{ fontSize: '16px', padding: '20px 32px 20px' }}><b>Informações das suas variações</b></div>
                                <Divider style={{ marginBottom: '30px' }} />
                                {infoVariacoes.map((info, index) => {
                                    return (
                                        <div key={info.id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', paddingLeft: '25px', alignItems: 'center' }}>
                                                    <Button startIcon={index === indexVariacao ? <ArrowUpIcon/> : <ArrowDownIcon />} onClick={() => handleButtonAdicionarEstoque(index)} style={{ paddingLeft: '15px' }}>{info.opcao}</Button>
                                                </div>
                                                <div style={{ color: 'black', fontSize: '15px', paddingRight: '30px' }}><Button onClick={() => handleButtonAdicionarEstoque(index)} style={{ color: 'blue' }}>Adicionar estoque</Button></div>
                                            </div>
                                            {(index === indexVariacao) && <div style={{ paddingLeft: '61px' }}>

                                                <div style={{ display: 'flex', padding: '15px 0 15px' }}>
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
                                                    <Segment raised color='grey' style={{ width: '95%' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            <div style={{ padding: '10px 5px 0', paddingRight: '20px' }}>
                                                                <Paper style={{ height: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} elevation={2}>
                                                                    <Button color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                                                        Adicionar
                                                                    </Button>
                                                                    <Button style={{ left: '-4px' }} color="primary" aria-label="upload picture" component="span" startIcon={<DeleteForeverIcon />}>
                                                                        Remover
                                                                    </Button>
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

                                                <div style={{ padding: '15px 0 15px' }}>
                                                    <TextField label='Quantidade' value={info.quantidade} onChange={(event) => handleOnChangeQuantidade(info.id, event)}/>
                                                </div>
                                            </div>}
                                            <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
                                        </div>
                                    )
                                })}
                            </Paper>
                        </div>}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialogCaracteristica} onClose={() => setOpenDialogCaracteristica(false)}>
                <DialogContent>
                    <div style={{ fontSize: '20px' }}><b>Você está prestes a excluir uma característica</b></div>
                    <div style={{ fontSize: '15px', paddingTop: '20px', paddingBottom: '20px', color: 'black' }}>Lembre-se que você perderá as opções, quantidades, fotos e tudo mais que havia informado.</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.setOpenNovaVariacao(false)} startIcon={<CloseIcon />} color="secondary" size="small" variant="contained">Excluir</Button>
                    <Button>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

