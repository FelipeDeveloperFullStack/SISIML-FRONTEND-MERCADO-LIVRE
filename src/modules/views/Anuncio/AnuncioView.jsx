import React, { useState } from "react";
import { Row, Col, Navbar, Form} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import LoadingCarregandoSolicitacao from "modules/components/Loading/LoadingCarregandoSolicitacao"
import '../../../assets/css/Global/style.css';
import EditarAnuncio from './EditarAnuncio'
import { Button, Dropdown, Icon} from 'semantic-ui-react'
import ButtonUI from '@material-ui/core/Button';
import AlterarPreco from '../Anuncio/AlterarPreco'
import GerenciarVariacoes from '../Anuncio/GerenciarVariacoes'
import PerguntasAnuncio from '../Anuncio/PerguntasAnuncio'
import MudarStatus from '../Anuncio/MudarStatus'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlUI from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import DuplicaAnuncio from './DuplicaAnuncio'
import Pagination from '@material-ui/lab/Pagination';
import {Dimmer, Segment} from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ModificaEmMassaAnuncio from '../Anuncio/ModificaEmMassaAnuncio'
import {PAGE_OFFSET} from '../../constants/constants'


export default function AnuncioView(props) {
  document.title = "Anúncios"

  const state = useSelector(store => store.anuncio)
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [anuncio, setAnuncio] = useState({})
  const [isActive, setIsActive] = useState('active')
  const [isSelectedEstadoProduto, setIsSelectedEstadoProduto] = useState('novo')
  const [isSelectedFrete, setIsSelectedFrete] = useState(props.freteGratis)
  const [isShowVariationManager, setIsShowVariationManager] = useState(false)
  const [isShowPerguntas, setIsShowPerguntas] = useState(false)
  const [isShowDuplicarAnuncio, setIsShowDuplicarAnuncio] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialogModificadorEmMassa, setOpenDialogModificadorEmMassa] = React.useState(false)
  

  const handleClickNovoAnuncio = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeIsActive = (e) => {
    props.setOpenBackdrop(true)
    setIsActive(e.target.value)
    props.getAnuncioByOffset(0, e.target.value)
  };

  const handleChangeIsSelectedEstadoProdutoNovo = () => {
    setIsSelectedEstadoProduto('novo')
  }
  const handleChangeIsSelectedEstadoProdutoUsado = () => {
    setIsSelectedEstadoProduto('usado')
  }

  function handleChangeSelectedFreteGratis() {
    setIsSelectedFrete(props.freteGratis)
  }

  function handleChangeSelectedFretePorContaDoComprador() {
    setIsSelectedFrete('')
  }

  const totalDePaginasAnunciosAtivos = () => {
    let totalPaginas = (props.stateDashboard.totalAtivos / 100).toFixed(0)
    return totalPaginas < 1 ? 1 : totalPaginas
  }

  const totalDePaginasAnunciosPausados = () => {
    let totalPaginas = (props.stateDashboard.totalPausados / 100).toFixed(0)
    return totalPaginas < 1 ? 1 : totalPaginas
  }

  const options = [
    { key: 'porcentagem', text: '%', value: 'porcentagem' },
    { key: 'real', text: 'R$', value: 'real' }
  ]

  /**
   * <FormControl componentClass="select" onChange={handleChangeIsActive}>
                                <option value="active">Ativos</option>
                                <option value="paused">Pausados</option>
                            </FormControl>
   */

   const onChangeHandlePage = (event, page, status) => {
        props.setOpenBackdrop(true)
        dispatch({type: PAGE_OFFSET, data: page})
        props.getAnuncioByOffset(page === 1 ? 0 : (page * 100) - 100, isActive)
   }

  if (!props.isLoading) {
    return (
      <Grid container>
         <Grid item xs={12}>
                  <>
                    <Navbar bg="light" expand="lg">
                      <Form inline>
                      
                      <br></br>

                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <div>

                            <span>
                              <FormControlUI style={{marginRight: '15px', width: '100px'}}>
                                <Select
                                  value={isActive}
                                  onChange={handleChangeIsActive}>
                                  <MenuItem value="active">Ativos</MenuItem>
                                  <MenuItem value="paused">Pausados</MenuItem>
                                </Select>
                              </FormControlUI>
                            </span>

                            <span style={{padding: '0 15px 0'}}>
                              <TextField style={{width: '300px'}} placeholder="Buscar por título" />
                            </span>
                            
                          </div>
                          <div style={{marginRight: '420px'}}>
                            <span style={{paddingLeft: '5px'}}>
                                <ButtonUI color="primary" size="small" variant="contained" onClick={handleClickNovoAnuncio}>Novo anúncio</ButtonUI>
                                <Menu
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}>
                                    <MenuItem onClick={handleClose}>Cadastrar anúncio individual</MenuItem>
                                    <MenuItem onClick={handleClose}>Cadastrar anúncios em massa</MenuItem>
                                </Menu>
                            </span>
                            <span style={{paddingLeft: '5px'}}><ButtonUI size="small" onClick={() => setOpenDialogModificadorEmMassa(true)} variant="contained">Modificar em massa</ButtonUI></span>
                          </div>
                      </div>
                      </Form>
                    </Navbar>

                    {/*PAGINAÇÃO*/}                
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px'}}>
                        {
                          isActive === 'active' ? props.stateDashboard.totalAtivos   > 100 && <Pagination page={state.page} onChange={onChangeHandlePage} count={totalDePaginasAnunciosAtivos()} color="primary" showFirstButton showLastButton /> 
                        : isActive === 'paused' ? props.stateDashboard.totalPausados > 100 && <Pagination page={state.page} onChange={onChangeHandlePage} count={totalDePaginasAnunciosPausados()} color="primary" showFirstButton showLastButton /> : <></> 
                        }
                    </div>

                    {props.result.map((prop, key) => {
                      if (prop.status) {
                        return (
                          <div className="panel panel-primary" key={key}>
                            <Dimmer.Dimmable dimmed={props.openBackdrop}>

                            <div className="panel-heading" style={{backgroundColor: '#4682B4'}}>
                              <h3 className="panel-title">
                                 #{prop.id} - {prop.titulo}
                              </h3>
                            </div>

                            <div className="panel-body" style={{ "minHeight": "142px" }}>

                              <div className="col-md-2 col-xs-12 text-center">
                                <img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80' />

                              </div>

                              <div className="col-md-5 col-xs-12 text-center-xs">
                                
                                <font size="4pt">
                                  <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                                </font>
                                {prop.freteGratis !== '' ?
                                    <p style={{ "fontSize": "15px" }}>Mercado Envios {prop.freteGratis} - R$ {prop.custoFreteGratis.toLocaleString("pt-BR")} por envio</p>
                                    : <p style={{ "fontSize": "15px" }}>Mercado Envios - R$ {prop.custoFreteGratis.toLocaleString("pt-BR")} de tarifa</p>
                                } 
                                <p>
                                  <span style={{ "fontSize": "12px" }} className="badge">{prop.quantidadeVendido} Vendidos</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.visualizacao} visitas</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.tipoAnuncio}</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-danger" >{prop.sub_status}</span>
                                  <span className="badge badge-primary" style={{ "fontSize": "12px"}}>{prop.totalVariacoes} Variações </span>
                                </p>

                              </div>

                              <div className="col-md-3 col-xs-6 text-center-xs" style={{margin: '0 -70px 0'}}>

                                <font size="3">
                                  <b>
                                    <a style={{ "color": "blue" }}>
                                      R$ {prop.preco.toFixed(2).toLocaleString("pt-BR")}{' '}
                                    </a>
                                  </b>
                                </font>
                                <font size="3"> x {prop.estoque_total} disponíveis</font>

                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Tarifa R$ -{prop.tarifa.toFixed(2).toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Envio R$ -{prop.custoFreteGratis.toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="badge badge-info" style={{ "fontSize": "12px" }}>Líquido R$ {prop.liquido.toFixed(2).toLocaleString("pt-BR")}</span>
                              </div>

                              {/*Botão de modificar anúncio*/}
                              <div className="col-md-2 text-center-xs" style={{margin: '0 -6px 0'}}>
                                <Button icon labelPosition='left' style={{ fontSize: '12px', margin: '0 0 2px' }} 
                                  onClick={() => {
                                  setShowModal(true)
                                  setAnuncio(prop)
                                  props.obterAtributosPorCategoria(prop.json.category_id, prop.id)
                                }}> Modificar
  
                                <Icon name='edit' />
                                </Button>

                                {/* Botão para editar pequenas alterações*/}
                                <Dropdown
                                  text='Ajuste'
                                  icon='cog'
                                  floating
                                  labeled
                                  button
                                  className='icon'
                                  style={{ 'fontSize': '12px' }}
                                >
                                  {/* Alterar preço */}
                                  <Dropdown.Menu>
                                    <Dropdown.Header icon='cog' content='Configurações' />
                             
                                  {prop.status === 'active' && 
                                  <>
                                    <Dropdown.Item>
                                      <a onClick={() => {
                                        props.setIsShowEditPrice(true)
                                        setAnuncio(prop)}}>
                                          <Dropdown.Item>
                                              Alterar preço
                                          </Dropdown.Item>
                                      </a>
                                    </Dropdown.Item>

                                    {prop.json.variations.length !== 0 && 
                                    <Dropdown.Item>
                                      <a onClick={() => {
                                        setIsShowVariationManager(true) 
                                        setAnuncio(prop)}}>
                                          <Dropdown.Item>
                                              Gerenciar variações
                                          </Dropdown.Item>
                                      </a>
                                    </Dropdown.Item>}

                                    <Dropdown.Item>
                                      <a onClick={() => {
                                        setIsShowPerguntas(true)
                                        setAnuncio(prop)}}>
                                          <Dropdown.Item>
                                              Visualizar perguntas
                                          </Dropdown.Item>
                                      </a>
                                    </Dropdown.Item>  
                                    <Dropdown.Item>
                                          <a onClick={() => {
                                            props.setIsShowConfirmPauseProduct(true)
                                            setAnuncio(prop)}}>
                                              <Dropdown.Item>
                                                  Pausar
                                              </Dropdown.Item>
                                          </a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                          <a onClick={() => {
                                            setIsShowDuplicarAnuncio(true)
                                            setAnuncio(prop)}}>
                                              <Dropdown.Item>
                                                Replicar anúncio
                                              </Dropdown.Item>
                                          </a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>Msg automática pós venda</Dropdown.Item>

                                   </>
                                    }
                                    {prop.status === 'paused' && 
                                      <Dropdown.Item>
                                        <a onClick={() => {
                                          props.setIsShowConfirmPauseProduct(true)
                                          setAnuncio(prop)}}>
                                        Reativar
                                        </a>
                                      </Dropdown.Item>
                                    }
  
                                  </Dropdown.Menu>
                                </Dropdown>

                              </div>
                            </div>
                              <Dimmer active={props.openBackdrop} onClickOutside={() => props.setOpenBackdrop(false)}>
                                  <CircularProgress color="inherit" />
                              </Dimmer>

                            </Dimmer.Dimmable>
                          </div>
                        )
                      }else{
                        return (
                          <div>
                            <Dimmer.Dimmable>
                              <Dimmer active={props.openBackdrop} onClickOutside={() => props.setOpenBackdrop(false)}>
                                  <CircularProgress color="inherit" />
                              </Dimmer>
                            </Dimmer.Dimmable>
                          </div>
                        )
                      }
                    }
                    )}
                    
                  </>
                 {/*PAGINAÇÃO*/}                
                 <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '10px'}}>
                    {
                      isActive === 'active' ? props.stateDashboard.totalAtivos   > 100 && <Pagination page={state.page} onChange={onChangeHandlePage} count={totalDePaginasAnunciosAtivos()} color="primary" showFirstButton showLastButton /> 
                    : isActive === 'paused' ? props.stateDashboard.totalPausados > 100 && <Pagination page={state.page} onChange={onChangeHandlePage} count={totalDePaginasAnunciosPausados()} color="primary" showFirstButton showLastButton /> : <></> 
                    }
                 </div>
        
          </Grid>

        { /*MODAL*/}
        {isShowVariationManager && 
          <GerenciarVariacoes  
            {...anuncio} 
            getImageSite={props.getImageSite}
            isShowVariationManager={isShowVariationManager} 
            setIsShowVariationManager={setIsShowVariationManager}
            updateAvailableQuantity={props.updateAvailableQuantity}
            updateImagemVariation={props.updateImagemVariation}
          />}

        {isShowPerguntas &&
          <PerguntasAnuncio {...anuncio}
                            isShowPerguntas={isShowPerguntas} 
                            setIsShowPerguntas={setIsShowPerguntas}
        />}

        {openDialogModificadorEmMassa && 
        <ModificaEmMassaAnuncio 
            openDialogModificadorEmMassa={openDialogModificadorEmMassa} 
            setOpenDialogModificadorEmMassa={setOpenDialogModificadorEmMassa}/>}

        {props.isShowEditPrice && 
          <AlterarPreco options={options} 
                        propsAnuncio={anuncio}
                        {...anuncio} 
                        updateAnuncioPrice={props.updateAnuncioPrice}
                        isShowEditPrice={props.isShowEditPrice}
                        setIsShowEditPrice={props.setIsShowEditPrice}
                        loadingButton={props.loadingButton}
                        setLoadingButton={props.setLoadingButton}
                        disabledButton={props.disabledButton}
                        setDisabledButton={props.setDisabledButton}/>
        }

        {isShowDuplicarAnuncio &&
          <DuplicaAnuncio
           {...anuncio}
           duplicarAnuncioPorID={props.duplicarAnuncioPorID}
           setIsShowDuplicarAnuncio={setIsShowDuplicarAnuncio}
           isShowDuplicarAnuncio={isShowDuplicarAnuncio}/>
        }
              
        {showModal &&
          <EditarAnuncio
            {...anuncio}
            updateStatus={props.updateStatus}
            setDisabledButton={props.setDisabledButton}
            setLoadingButton={props.setLoadingButton}
            loadingButtonVideoYoutube={props.loadingButtonVideoYoutube}
            setLoadingButtonVideoYoutube={props.setLoadingButtonVideoYoutube}
            updateVideoYoutube={props.updateVideoYoutube}
            validationAttribute={props.validationAttribute}
            setLoadingButtonAtributos={props.setLoadingButtonAtributos}
            loadingButtonAtributos={props.loadingButtonAtributos}
            updateAtributos={props.updateAtributos}
            atributo={props.atributo}
            setAtributo={props.setAtributo}
            loadingCategoria={props.loadingCategoria}
            categoria={props.categoria}
            obterCategoria={props.obterCategoria}
            updateCondicao={props.updateCondicao}
            loadingButtonCondicao={props.loadingButtonCondicao}
            setLoadingButtonCondicao={props.setLoadingButtonCondicao}
            updateDisponibilidadeEstoque={props.updateDisponibilidadeEstoque}
            setLoadingButtonDisponibilidadeEstoque={props.setLoadingButtonDisponibilidadeEstoque}
            loadingButtonDisponibilidadeEstoque={props.loadingButtonDisponibilidadeEstoque}
            updateDescription={props.updateDescription}
            updateRetirarPessoalmente={props.updateRetirarPessoalmente}
            updateShipping={props.updateShipping}
            setShowModal={setShowModal}
            showModal={showModal}
            updateTitle={props.updateTitle}
            isSelectedEstadoProduto={isSelectedEstadoProduto}
            handleChangeIsSelectedEstadoProdutoNovo={handleChangeIsSelectedEstadoProdutoNovo}
            handleChangeIsSelectedEstadoProdutoUsado={handleChangeIsSelectedEstadoProdutoUsado}
            isSelectedFrete={isSelectedFrete}
            handleChangeSelectedFreteGratis={handleChangeSelectedFreteGratis}
            handleChangeSelectedFretePorContaDoComprador={handleChangeSelectedFretePorContaDoComprador}
            freteGratis={props.freteGratis} 
            obterValorDoCustoFreteGratisPorAnuncio={props.obterValorDoCustoFreteGratisPorAnuncio}
            custoFrete={props.custoFrete}
            updateAnuncioPrice={props.updateAnuncioPrice}
            updateListingType={props.updateListingType}
            loadingButtonTitulo={props.loadingButtonTitulo}
            setLoadingButtonTitulo={props.setLoadingButtonTitulo}
            loadingButtonFormaEntrega={props.loadingButtonFormaEntrega}
            setLoadingButtonFormaEntrega={props.setLoadingButtonFormaEntrega}
            loadingButtonTipoAnuncio={props.loadingButtonTipoAnuncio}
            setLoadingButtonTipoAnuncio={props.setLoadingButtonTipoAnuncio}
            loadingButtonRetirarPessoalmente={props.loadingButtonRetirarPessoalmente}
            setLoadingButtonRetirarPessoalmente={props.setLoadingButtonRetirarPessoalmente}
            setLoadingButtonDescription={props.setLoadingButtonDescription}
            loadingButtonDescription={props.loadingButtonDescription}
            loadingButtonGarantia={props.loadingButtonGarantia}
            setLoadingButtonGarantia={props.setLoadingButtonGarantia}
            updateGarantia={props.updateGarantia}/>
            }

        {props.isShowConfirmPauseProduct && 
          <MudarStatus 
            isShowConfirmPauseProduct={props.isShowConfirmPauseProduct}
            setIsShowConfirmPauseProduct={props.setIsShowConfirmPauseProduct}
            loadingButton={props.loadingButton}
            setLoadingButton={props.setLoadingButton}
            disabledButton={props.disabledButton}
            setDisabledButton={props.setDisabledButton}
            {...anuncio}
            updateStatus={props.updateStatus}
          />}    

      </Grid>
    );
  } else {
    return (
      <>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                  <LoadingCarregandoSolicitacao width={450} />
              </Col>
            </Row>
          </Grid>
        </div>
      </>
    )
  }
}


