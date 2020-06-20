import React from "react";
import { Button, Modal, Header, Icon, Select, Comment, Form, Input } from 'semantic-ui-react'
import { formatarDataHora } from '../../../Helpers/util'
import userAvatar from '../../../assets/img/funcionario-icon.png'
import Chat from '../../components/Chat/Chat'
import '../../../assets/css/Global/chat.css'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

export default function PerguntasAnuncio(props) {

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
        }
      });

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
          <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </MuiDialogTitle>
        );
      });
      
      const DialogContent = withStyles((theme) => ({
        root: {
          padding: theme.spacing(2),
        },
      }))(MuiDialogContent);
      
      const DialogActions = withStyles((theme) => ({
        root: {
          margin: 0,
          padding: theme.spacing(1),
        },
      }))(MuiDialogActions);

    return (
        <Dialog scroll='paper' fullWidth maxWidth='md' className={styles.dialogWidth} onClose={() => props.setIsShowPerguntas(false)} open={props.isShowPerguntas}>
            <DialogTitle id="customized-dialog-title" onClose={() => props.setIsShowPerguntas(false)}>
                Perguntas
            </DialogTitle>

            <DialogContent dividers>
                <p>{props.question.length === 0 ? 'Nenhuma pergunta para esse anúncio!' : props.titulo}</p>
                <p style={{ 'fontSize': '12px', 'position': 'absolute', 'marginTop': '-15px' }}>
                    {props.question.length === 0 ? '' : 'O sistema irá listar apenas as 50 primeiras perguntas'}
                </p>

                {props.question.map((property, key) => {
                    return (
                        <Chat nomeCompletoCliente={property.date_created != null ? formatarDataHora(property.date_created) : property.date_created}
                            pergunta={property.text}
                            resposta={property.answer != null ? property.answer.text : ''}
                            nomeEmpresa='Comproline'
                            displayFooter={'none'}
                            displayButtonClose={'none'} />
                    )
                })

                }
            </DialogContent>

            <DialogActions>
                <Button color='red' onClick={() => { props.setIsShowPerguntas(false) }}>
                    <Icon name='remove' /> Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}