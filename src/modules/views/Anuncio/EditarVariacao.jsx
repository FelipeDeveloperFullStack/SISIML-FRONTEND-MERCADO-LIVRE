import React, { useState, useEffect } from 'react'
import { Divider, Segment, Message, MessageHeader, MessageContent } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'
import { IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO, SOURCES, IMAGENS_ANUNCIO } from '../../constants/constants'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { DialogContent, DialogActions } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import sendNotification from '../../components/Notification/Notification'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import CallApiAnuncio from '../../../modules/actions/CallApi/CallApiAnuncio'

export default function EditarVariacao(props) {

    const state = useSelector(store => store.anuncio)
    const dispatch = useDispatch()
    const MENSAGEM_USUARIO = "Ops. Você esqueceu de informar a URL, digite novamente e clique em CONFIRMAR!"
    const MENSAGEM_USUARIO_02 = "Não é possível adicionar mais imagens, o limite permitido pelo Mercado Livre é de 10 imagem por variação"



    const useStyles = makeStyles(theme => ({

        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }));

    const classes = useStyles();

    const [openDialogImage, setOpenDialogImage] = React.useState(false)
    const [urlTemp, setUrlTemp] = React.useState({
        url: '',
        key: 0
    })
    const [urlMain, setUrlMain] = React.useState('')
    const [isNovaImagem, setIsNovaImagem] = React.useState(false)
    //const [sources, setSources] = React.useState([])

    const handleOnClickNovaImagem = () => {
        setUrlMain("")
        setIsNovaImagem(true)
        setOpenDialogImage(true)

    }

    const handleOnClickButtonImage = (url, key) => {
        setUrlTemp({ url, key })
        setUrlMain("")
        setIsNovaImagem(false)
        setOpenDialogImage(true)
    }

    const confirmarImagem = async () => {
        if (isNovaImagem) {
            if (urlMain !== '') {
                await sendNotification('success', 'Adicionando a imagem, por favor aguarde...', 2000)
                await props.getImageSite(urlMain.replace("/mostrar-codigo", ""))
                setOpenDialogImage(false)
                await props.setImageVariation(await adicionarImagem())
            } else {
                sendNotification('error', MENSAGEM_USUARIO, 5000)
            }
        } else {
            if (urlMain !== '') {
                await sendNotification('success', 'Atualizando a imagem, por favor aguarde...', 2000)
                await props.getImageSite(urlMain.replace("/mostrar-codigo", ""))
                let image = state.urlImage.filter((image) => {
                    if(image.url === localStorage.getItem("@sisiml/url_image")){
                        return image.url
                    }
                })
                if(image.length === 0){
                    atualizar()
                }else{
                    image.map(img => {
                        if (img.url === localStorage.getItem("@sisiml/url_image")) {
                            sendNotification('error', 'Você já possui essa imagem nessa variação, informe outra imagem diferente.', 10000)
                        }
                    })
                }
                
            } else {
                sendNotification('error', MENSAGEM_USUARIO, 5000)
            }
        }
    }

    const atualizar = () => {
        setOpenDialogImage(false)
        //await props.setImageVariation(atualizarImagem())
        dispatch({ type: IMAGENS_ANUNCIO, data: atualizarImagem() })
        console.log("IMAGE: " + localStorage.getItem("@sisiml/url_image"))
    }

    const adicionarImagem = async () => {
        if (state.urlImage.length < 10) {
            await state.urlImage.push({ url: localStorage.getItem("@sisiml/url_image") })

            setTimeout(() => {
                sendNotification('success', 'Imagem adicionada.', 1000)
            }, 2002);

            state.sources.push({ source: localStorage.getItem("@sisiml/url_image") })

            dispatch({ type: SOURCES, data: state.sources })
            dispatch({ type: IMAGENS_ANUNCIO, data: state.urlImage })

            return state.urlImage
        } else {
            sendNotification('error', MENSAGEM_USUARIO_02, 5000)
            dispatch({ type: IMAGENS_ANUNCIO, data: state.urlImage })
            return state.urlImage
        }
    }

    const atualizarImagemAPIMercadoLivre = async () => {
        console.log("state.urlImage \n")
        console.log(state.urlImage)
        console.log("\n")
        /**BLOCO - Adicinando os IDs das imagens atuais que não sofreram alterações no array sources */
        getIDsImagensExistente(state.urlImage).map(image => {
            state.sources.push({ id: image.id })
            dispatch({ type: SOURCES, data: state.sources })
        })

        let imageTemp = []
        let idsRemovidosTemp = []
        /**BLOCO - Adicionando as novos URLs das imagens no array imageTemp[] */
        state.urlImage.map(image => {
            state.idsRemovidos.map(imageRID => {
                if (imageRID.id === image.id) {
                    imageTemp.push(image.url)
                }
            })
        })

        /**BLOCO - Adicionandos os IDS das imagens da variação em um array temporário. */
        /* props.json.variations.map(variat => {
             variat.picture_ids.map(pictureId => {
                 if (props.vart.id === variat.id) {
                     imageTemp.push(pictureId)
                 }
             })
         })*/

        /**BLOCO - Adicionandos os IDS das imagens da variação em um array temporário. */
        state.result.map(anuncio => {
            if (props.id === anuncio.id) {
                anuncio.json.variations.map(variat => {
                    variat.picture_ids.map(pictureId => {
                        if (props.vart.id === variat.id) {
                            imageTemp.push(pictureId)
                        }
                    })
                })
            }
        })


        /**BLOCO - Adicionando os ids removidos em um array temporário */
        state.idsRemovidos.map(idsR => { idsRemovidosTemp.push(idsR.id) })

        /**BLOCO - Removendo os IDs repedidos e atualizando o array imageTemp - LIB lodash*/
        _.pullAll(imageTemp, idsRemovidosTemp)

        console.log("\n")
        console.log(imageTemp)
        console.log("\n")

        let variations = []
        /** BLOCO - Adicionando o ID da variação atual os IDs das imagens da variacação atual  */
        variations.push({
            id: props.vart.id,
            picture_ids: imageTemp
        })

        /**BLOCO - Adicionando as outras variações e suas IDs das imagens */
        variations.map(vart => {
            state.result.map(anuncio => {
                if (anuncio.id === props.id) {
                    anuncio.json.variations.map(value => {
                        if (vart.id !== value.id) {
                            value.picture_ids.map(id => {
                                state.sources.push({ id })
                                dispatch({ type: SOURCES, data: state.sources })
                            })

                            variations.push({
                                id: value.id,
                                picture_ids: value.picture_ids
                            })
                        }
                    })
                }
            })
        })

        //pictures = state.sources
        console.log(variations)
        console.log(state.sources)
        console.log("state.idsRemovidos: " + JSON.stringify(state.idsRemovidos))

        await props.updateImagemVariation(props.id, variations, state.sources)

        /**BLOCO - Atualizandos os dados da variação no store da aplicação */
        //dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: atualizarDadosStore(), isLoading: false})

        props.closeModalEditVariacao(false)

        //Atualizando os dados no store
        //props.getAnuncios()

    }

    const getIDsImagensExistente = (pictures) => {
        let temp = []
        pictures.map(pic => {
            /**BLOCO - Transferindo os dados para o Array temp[] */
            if (pic.id !== undefined) {
                temp.push({
                    id: pic.id
                })
            }
            /**BLOCO - Remove toda URL que comece com https://uploaddeimagens.com.br */
            temp = _.remove(temp, (str) => {
                if (!str.id.includes("https://uploaddeimagens.com.br")) {
                    return str
                }
            })

            /**BLOCO - Verifica se existe algum ID que foi removido dentro do array, se existir exclui. */
            temp.map((value, indiceTemp) => {
                state.idsRemovidos.map((result) => {
                    if (value.id === result.id) {
                        temp.splice(indiceTemp, 1)
                    }
                })
            })
        })

        return temp
    }

    /** @returns novoArrayDeImagensAtualizada */
    const atualizarImagem = () => {
        let temp = []
        state.urlImage.map((image, key) => {
            if (urlTemp.key === key) {
                setTimeout(() => {
                    sendNotification('success', 'Imagem atualizada.', 1000)
                }, 2002);

                state.sources.push({ source: localStorage.getItem("@sisiml/url_image") })

                dispatch({ type: SOURCES, data: state.sources })

                /**Atualizando os IDs removidos, evitando duplicidade e disparando a atualização no store da aplicação*/
                if (state.idsRemovidos.length === 0) {
                    state.idsRemovidos.push({ id: image.id })
                    dispatch({ type: IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO, data: state.idsRemovidos })
                } else {
                    state.idsRemovidos.map(ird => {
                        if (ird.id !== image.id) {
                            state.idsRemovidos.push({ id: image.id })
                            dispatch({ type: IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO, data: state.idsRemovidos })
                        }
                    })
                }

                temp.push({
                    url: localStorage.getItem("@sisiml/url_image"),
                    id: image.id
                })

            } else {
                temp.push({
                    url: image.url,
                    id: image.id
                })
            }
        })
        return temp
    }

    const atualizarDadosStore = async () => {

        let temp = []


        console.log("state.result \n")
        console.log(state.result)
        console.log('\n')

        state.result.map(result => {
            result.json.pictures.map(picture => {
                state.urlImage.map(image => {
                    if (picture.id === image.id) {
                        picture.url = image.url
                        temp.push(result)
                    } else {
                        temp.push(result)
                    }
                })
            })
        })
        console.log("state.urlImage e temp \n")
        console.log(state.urlImage)
        console.log(temp)
        console.log('\n')
        return temp
    }

    return (
        <>

            <Dialog fullWidth maxWidth='md' open={openDialogImage} onClose={() => { setOpenDialogImage(false) }}>
                {isNovaImagem ?
                    <DialogTitle>Informe a URL para adicionar a imagem</DialogTitle>
                    : <DialogTitle>Informe a URL para atualizar a imagem</DialogTitle>
                }
                <DialogContent>
                    <Message>
                        <MessageHeader>Considerações e práticas recomendadas</MessageHeader>
                        <MessageContent>
                            As imagens RGB são muito mais recomendáveis do que as CMYK. Recomendamos que você envie imagens de 1200 x 1200 px. Se estas forem maiores, o Mercado Livre irá editar para ter 1200 px. Além disso, você pode publicar uma quantidade máxima imagens por anúncio, dependendo da categoria que deseja fazer. Você pode carregar imagens de até 10 MB nos seguintes formatos:
                        <ul>
                                <li>JPG</li>
                                <li>JPEG</li>
                                <li>PNG</li>
                            </ul>
                        </MessageContent>
                    </Message>

                    {/*<FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="labelBdImage">Utilizar banco de imagens</InputLabel>
                        <Select
                            labelId="labelBdImage"
                        >
                            <MenuItem value={10}>
                                <img alt='bdImage' height='100' width='80' src="https://uploaddeimagens.com.br/images/002/596/357/full/imagem_teste.jpg?1587135791"></img>
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Divider horizontal>Ou</Divider>
            */  }

                    <TextField error={urlMain === '' ? true : false} value={urlMain} onChange={(event) => setUrlMain(event.target.value)} style={{ width: '100%' }} label="URL" variant="outlined" />
                    <Message>
                        <MessageHeader>
                            Utilize o site <a href='https://uploaddeimagens.com.br/' target='_blank'>https://uploaddeimagens.com.br/</a> pra realizar o upload da imagem, logo após informe a URL no campo acima.
                        </MessageHeader>
                    </Message>
                </DialogContent>
                <DialogActions>
                    <ButtonUI onClick={() => confirmarImagem()} startIcon={<SaveAltIcon />}>Confirmar</ButtonUI>
                    <ButtonUI onClick={() => setOpenDialogImage(false)} startIcon={<CloseIcon />}>Fechar</ButtonUI>
                </DialogActions>
            </Dialog>

            <Dialog fullScreen open={props.isShowEditarAnuncio} onClose={() => props.closeModalEditVariacao(false)}>
                <AppBar className={classes.appBar} style={{ 'backgroundColor': '#4682B4' }}>
                    <Toolbar>

                        <Typography variant="h6" className={classes.title}>
                            <>Alterar variação - {props.attributeCombinations.value_name}</>
                        </Typography>

                        <IconButton edge="start" color="inherit" onClick={() => props.closeModalEditVariacao(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div style={{ margin: '15px 10px 0' }}>
                    <Row>
                        <Col md={5}>
                            <FormInput label={<>Variação ({props.attributeCombinations.name})</>} placeholder='Variação' value={props.attributeCombinations.value_name} style={{ "color": "blue" }} />
                        </Col>
                        <Col md={2}>
                            <FormInput label="SKU" placeholder='SKU' style={{ "color": "blue" }} />
                        </Col>
                        <Col md={2}>
                            <FormInput label="Qtde estoque da variação" value={props.variation.available_quantity} placeholder='Estoque da variação' style={{ "color": "blue" }} />
                        </Col>
                        <Col md={3}>
                            <FormInput label='Código universal de produto' placeholder='Código universal de produto' />
                        </Col>
                    </Row>
                    <br></br>
                    <Segment raised color='grey'>
                        <div style={{ display: 'flex' }}>
                            <div style={{ padding: '10px 5px 0', paddingRight: '20px' }}>
                                <Paper style={{ height: '100px', display: 'flex', alignItems: 'center' }} elevation={2}>
                                    <ButtonUI onClick={() => { handleOnClickNovaImagem() }} color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                        Adicionar
                                    </ButtonUI>
                                </Paper>
                            </div>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    {state.urlImage.map((imagem, key) => {
                                        return (
                                            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Paper elevation={3} style={{ margin: '0 10px 0', marginTop: '10px' }}>
                                                    <img src={imagem.url} alt='imageVariation' height='100' width='80' />
                                                </Paper>
                                                <div style={{ padding: '0 10px 0', display: 'flex' }}>
                                                    <div>
                                                        <Tooltip title="Clique aqui para alterar a imagem!">
                                                            <IconButton onClick={() => { handleOnClickButtonImage(imagem.url, key) }} style={{ left: '-15px' }}><AddPhotoAlternateIcon /></IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip title="Clique aqui para remover a imagem!">
                                                            <IconButton style={{ left: '-35px' }}><DeleteForeverIcon /></IconButton>
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

                    <DialogActions>
                        <ButtonUI variant="contained" color="primary" onClick={() => atualizarImagemAPIMercadoLivre()} startIcon={<SaveAltIcon />}>Confirmar</ButtonUI>
                        <ButtonUI variant="contained" color="secondary" onClick={() => props.closeModalEditVariacao(false)} startIcon={<CloseIcon />}>  Fechar   </ButtonUI>
                    </DialogActions>

                </div>
            </Dialog>
        </>
    )
}