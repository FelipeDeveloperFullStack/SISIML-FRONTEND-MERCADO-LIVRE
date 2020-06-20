import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from "@material-ui/core/DialogContent"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Row, Col, Modal } from "react-bootstrap";
import { Message } from 'semantic-ui-react'
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
        </MuiDialogTitle>
    );
});

export default function ModificaEmMassaAnuncio(props) {


    let TEXT_BUTTON = 'Modificar em massa'

    return (
        <>
            <Dialog fullScreen open={props.openDialogModificadorEmMassa} onClose={() => props.setOpenDialogModificadorEmMassa(false)}>
                <DialogTitle onClose={() => props.setOpenDialogModificadorEmMassa(false)}>
                    Modificador em massa
                </DialogTitle>
                <DialogContent>
                    <Paper elevation={3}>
                        <ExpansionPanel expanded>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}>
                                <span style={{ fontSize: '18px', color: '#333333' }}>Descrição</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}></span>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <TextField multiline label="Descrição somente texto" style={{ "color": "blue", width: '500%' }} />
                            </ExpansionPanelDetails>
                            <CardActions>
                                <Button startIcon={<CheckCircleIcon />} variant="contained">{TEXT_BUTTON}</Button>
                            </CardActions>
                        </ExpansionPanel>
                    </Paper>
                    <p></p>
                    <Paper elevation={3}>
                        <ExpansionPanel expanded>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}>
                                <span style={{ fontSize: '18px', color: '#333333' }}>Disponibilidade de estoque</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}></span>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Row>
                                    <Col>
                                        <Message style={{ width: '100%' }}>
                                            <Message.Header>Indique quantos dias corridos você demora para disponibilizar o produto. Isso será mostrado no seu anúncio e ajudará na decisão dos seus compradores.</Message.Header>
                                        </Message>
                                        <Message info style={{ width: '100%' }}>
                                            <Message.Header>Quanto mais tempo adicionar, menos exposição você terá. Sempre o Mercado Livre irá mostrar primeiro os anúncios com estoque disponível.</Message.Header>
                                        </Message>
                                        <TextField
                                            label="Dias"
                                            style={{ margin: 8 }}
                                            placeholder="Ex.: 2"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <div style={{ padding: '0 6px 0' }}>Este prazo é fixo, exclua-o quando ele não for mais necessário.</div>
                                    </Col>
                                    <div>
                                        <CardActions>
                                            <Button startIcon={<CheckCircleIcon />} variant="contained">{TEXT_BUTTON}</Button>
                                        </CardActions>
                                    </div>
                                </Row>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Paper>
                    <p></p>
                    <Paper elevation={3}>
                        <ExpansionPanel expanded>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}>
                                <span style={{ fontSize: '18px', color: '#333333' }}>Status</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}></span>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Row>
                                    <FormControl component="fieldset">
                                        <RadioGroup style={{ padding: '0 10px 0' }}>
                                            <Tooltip title='Clique aqui para ativar todos os anúncios pausados!'>
                                                <FormControlLabel value='new' control={<Radio />} label={
                                                    <span style={{ color: '#000000', fontSize: '18px' }}>Ativo</span>
                                                } />
                                            </Tooltip>
                                            <Tooltip title='Clique aqui para pausar todos os anúncios ativos!'>
                                                <FormControlLabel value='used' control={<Radio />} label={
                                                    <div style={{ color: '#000000', fontSize: '18px' }}>Pausado</div>
                                                } />
                                            </Tooltip>
                                        </RadioGroup>
                                    </FormControl>
                                </Row>
                            </ExpansionPanelDetails>
                            <CardActions>
                                <Button startIcon={<CheckCircleIcon />} variant="contained">{TEXT_BUTTON}</Button>
                            </CardActions>
                        </ExpansionPanel>
                    </Paper>
                    <p></p>


                </DialogContent>

                <Modal.Footer>
                    <Button startIcon={<CloseIcon />} variant="contained" color="secondary" onClick={() => props.setOpenDialogModificadorEmMassa(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Dialog>
        </>
    )
}