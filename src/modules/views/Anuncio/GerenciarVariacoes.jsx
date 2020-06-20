import React from 'react'
import { Button, Modal, Header, Icon, Table } from 'semantic-ui-react'
import EditarVariacao from './EditarVariacao'
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import ButtonUI from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { DialogActions } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios'
import {
  IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO,
  SOURCES,
  LISTAR_TODOS_ANUNCIOS,
  DOMAIN,
  IMAGENS_ANUNCIO
} from '../../constants/constants'


class GerenciarVariacoes extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowEditarAnuncio: false,
      attributeCombinations: {},
      imageVariation: [],
      vart: '',
      json: {}
    }
  }

  setProps = (attr) => {
    this.setState({
      isShowEditarAnuncio: true,
      attributeCombinations: attr
    })
  }

  setImageVariation = (imageVariation) => {
    this.setState({
      imageVariation: imageVariation
    })
  }

  getImageVariation = (variationId) => {
    let urls = []
    this.props.result.map(anuncio => {
      if (anuncio.id === this.props.id) {
        anuncio.json.pictures.map(picture => {
          anuncio.json.variations.map(variation => {
            if (variationId === variation.id) {
                variation.picture_ids.map(picture_ids => {
                  if (picture_ids === picture.id) {
                    urls.push({
                      url: picture.url,
                      id: picture.id
                    })
                  }
                })
              }
          })
        })
      }
    })
    /*
    json.pictures.map(image => {
      variation.picture_ids.map(picture_ids => {
        if (picture_ids === image.id) {
          urls.push({
            url: image.url,
            id: image.id
          })
        }
      })
    })*/
    console.log("this.props.result \n")
    console.log(urls)
    console.log('\n')

    /*this.setState({
      imageVariation: urls,
    })*/

    this.props.updateUrlImage(urls)

  }

  setPropsEditAnuncio = (variationId, variation, attr, json) => {
    this.getAnuncios()
    this.props.limparArrayIdsRemovidos([])
    this.props.limparArraySources([])
    this.setProps(attr)
    this.getImageVariation(variationId)
    this.setState({
      vart: variation,
      json: json
    })
  }

  handleChangeInputAvailableQuantity = (event) => {
    this.setState({ availableQuantity: event.target.value })
  }

  updateAvailableQuantity = (itemId, id, availableQuantity) => {
    this.props.updateAvailableQuantity(itemId, id, availableQuantity)
    this.props.setIsShowVariationManager(false)
  }

  closeModalEditVariacao = (close) => {
    this.setState({ isShowEditarAnuncio: close })
  }

  getAnuncios = async () => {
    await axios.get(`${DOMAIN}/anuncio/0/active`).then(async resp => {
      await this.props.listarTodosAnuncios(LISTAR_TODOS_ANUNCIOS, resp.data, false)
    }).catch(err => { console.log(err) })
  }


  render() {
    return (
      <div>
        <Modal open={this.props.isShowVariationManager} style={{
          position: 'relative',
          width: '65%',
          marginBottom: '5%',
          marginLeft: '50%',
          marginRight: '50%',
          margin: '70px 0 0',
          left: '13px'
        }}
          closeOnDimmerClick={false} >

          <Header icon='edit' content={

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ paddingTop: '13px' }}>Gerenciar Variações</div>
              <IconButton style={{ left: '580px' }} onClick={() => this.props.setIsShowVariationManager(false)}>
                <CancelIcon />
              </IconButton>
            </div>}

            style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

          <Modal.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p>
                  {this.props.titulo}{' | '}
                  <font size="3">
                    <b>
                      <a style={{ "color": "blue" }}>
                        R$ {this.props.preco.toLocaleString("pt-BR")}{' '}
                      </a>
                    </b>
                  </font>
                  <font size="3"> x {this.props.estoque_total} disponíveis</font>
                </p>
              </div>
              <div>
                <ButtonUI color="primary" startIcon={<CloseIcon />}>Adicionar variações</ButtonUI>
              </div>
            </div>


            <Table basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Variação</Table.HeaderCell>
                  <Table.HeaderCell>Estoque</Table.HeaderCell>
                  <Table.HeaderCell>Qtde vendido</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.json.variations.map((variation, key) => {

                  return (
                    <Table.Row key={key}>
                      {variation.attribute_combinations.map(attr => {
                        return (
                          <>
                            <Table.Cell>{attr.value_name}</Table.Cell>
                            <Table.Cell>{variation.available_quantity}</Table.Cell>
                            <Table.Cell>{variation.sold_quantity}</Table.Cell>
                            <Table.Cell>
                              <Tooltip title="Remover variação">
                                <Button icon color='red' style={{ 'fontSize': '12px' }}> <Icon name='remove' /> </Button>
                              </Tooltip>
                              <Tooltip title="Editar variação">
                                <Button icon color='blue' style={{ 'fontSize': '12px' }} onClick={() => this.setPropsEditAnuncio(variation.id, variation, attr, this.props.json)}> <Icon name='edit' /> </Button>
                              </Tooltip>
                            </Table.Cell>
                            <EditarVariacao
                              getImageSite={this.props.getImageSite}
                              setImageVariation={this.setImageVariation}
                              updateImagemVariation={this.props.updateImagemVariation}
                              urlImage={this.state.imageVariation}
                              attributeCombinations={this.state.attributeCombinations}
                              isShowEditarAnuncio={this.state.isShowEditarAnuncio}
                              variation={variation}
                              getAnuncios={this.getAnuncios}
                              vart={this.state.vart}
                              {...this.props}
                              {...this.state}
                              closeModalEditVariacao={this.closeModalEditVariacao}
                            />
                          </>
                        )
                      })}

                    </Table.Row>
                  )
                })}

              </Table.Body>
            </Table>
          </Modal.Content>
          <DialogActions>
            <ButtonUI variant="contained" color="primary" startIcon={<SaveAltIcon />}>Confirmar</ButtonUI>
            <ButtonUI variant="contained" color="secondary" onClick={() => this.props.setIsShowVariationManager(false)} startIcon={<CloseIcon />}>  Fechar   </ButtonUI>
          </DialogActions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    idRemovidos: store.anuncio.idRemovidos,
    sources: store.anuncio.sources,
    result: store.anuncio.result
  }
}

const mapDispatchToProps = (dispatch) => ({
  limparArrayIdsRemovidos: (idRemovidos) => {
    dispatch({ type: IDS_REMOVIDOS_IMAGENS_VARIACAO_ANUNCIO, data: idRemovidos })
  },
  limparArraySources: (sources) => {
    dispatch({ type: SOURCES, data: sources })
  },
  listarTodosAnuncios: (type, data, isLoading) => {
    dispatch({ type, data, isLoading })
  },
  updateUrlImage: (urlImage) => {
    dispatch({type: IMAGENS_ANUNCIO, data: urlImage})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GerenciarVariacoes)