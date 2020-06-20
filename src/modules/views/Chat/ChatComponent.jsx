import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Grid } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Input } from 'semantic-ui-react'


import mensagem_notificationImage from '../../../assets/img/mensagem_notification.svg'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 430,
    },
    inline: {
        display: 'inline',
    },
}));

export default function ChatComponent(props) {

    const classes = useStyles();

    const [prop, setProp] = React.useState({})
    const [textField, setTextField] = React.useState('')
    const [showImage, setShowImage] = React.useState(true)

   
    const handleClickListItem = (prop) => {
        setProp(prop)
        setShowImage(false)
        setTextField('')
    }

    const responder = () => {
        props.responder(prop.id, textField)
        setShowImage(true)
    }

    return (
        <Grid columns={2} divided>
            <Grid.Row>
                <Grid.Column width={7}>
                    <List component="nav" className={classes.root}>
                        {props.perguntas.length != 0 ? props.perguntas.map((prop, key) => {
                            props.showHorasAtras(prop.date_created)
                            return (
                                <>
                                    <ListItem key={key} button alignItems="flex-start" onClick={() => handleClickListItem(prop)}>

                                        <ListItemAvatar>
                                            <Avatar alt="" src="/" />
                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={prop.status === 'UNANSWERED' ? prop.nick_name : ''}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Anuncio
                                                    </Typography>
                                                    <span style={{ fontSize: '11px' }}>- {prop.title}</span>
                                                </React.Fragment>
                                            }
                                        />


                                        <ListItemSecondaryAction style={{ padding: '0 0 15px' }}>
                                            <span>{props.horasAtras} atrás</span>
                                        </ListItemSecondaryAction>

                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            )
                        }) : <>
                        
                                <div style={{display: 'flex', justifyContent: 'center', fontSize: '16px', color: '#263238', fontWeight: 'bold' }}>Nenhuma pergunta disponível no momento</div>

                            </>}
                    </List>
                </Grid.Column>

                <Grid.Column>

                    {showImage ? <>
                        <img style={{ width: '600px', paddingLeft: '100px' }} src={mensagem_notificationImage}></img>
                        <div style={{ fontSize: '20px', color: '#263238', fontWeight: 'bold' }}>Selecione a conversa para exibir</div>
                        <div style={{ fontSize: '14px', color: '#263238' }}>Para iniciar uma conversa, basta clicar na mensagem do perfil de uma pessoa ao lado </div>

                    </> :
                        <>
                            <AppBar position="static" style={{ backgroundColor: '#4682b4' }}>
                                <Toolbar variant="dense">
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column style={{ width: '200px' }}>
                                                <div>{prop.nick_name}</div>
                                                <div><a style={{ fontSize: '10px', color: 'white' }} href='#'>#{prop.item_id}</a></div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <ListItemSecondaryAction>
                                        <span><a style={{ fontSize: '12px', color: 'white' }} href='#'>{prop.title}</a></span>
                                    </ListItemSecondaryAction>
                                </Toolbar>
                            </AppBar>
                            <Paper elevation={3} style={{ height: '350px' }}>

                                {prop.text === undefined ? <></> :
                                    <div style={{ display: 'flex' }} arial-label='Pergunta'>
                                        <div style={{
                                            backgroundColor: '#3f51b5',
                                            color: '#FFFFFF',
                                            minHeight: '25px',
                                            borderRadius: '10px 10px',
                                            padding: '5px',
                                            maxWidth: '500px',
                                            marginTop: '5px',
                                            marginLeft: '5px'
                                        }}>
                                            {prop.text}
                                        </div>

                                    </div>}

                                {textField === '' ? <></> :
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} arial-label='Resposta'>
                                        <div style={{
                                            backgroundColor: '#3f51b5',
                                            color: '#FFFFFF',
                                            minHeight: '25px',
                                            borderRadius: '10px 10px',
                                            padding: '5px',
                                            maxWidth: '500px',
                                            marginTop: '15px',
                                            marginRight: '5px'
                                        }}>
                                            {textField}
                                        </div>
                                    </div>}

                            </Paper>
                            <Paper component='form'>
                                <Input value={textField} onChange={(event) => setTextField(event.target.value)} type='text' fluid placeholder='Digite uma resposta...' action>
                                    <input />
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() => responder()}
                                        startIcon={<SendIcon />}>
                                        Enviar
                                    </Button>
                                </Input>
                            </Paper>
                        </>
                    }
                </Grid.Column>

            </Grid.Row>
        </Grid>
    )
}