import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { OPEN_DRAWER_MENU_RIGHT, DOMAIN } from '../../constants/constants'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import sendNotification from '../../components/Notification/Notification'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function Sidebar(props) {

  const drawerWidth = 250;

  const [tipoImpressao, setTipoImpressao] = React.useState('');

  const handleChangeTipoImpressao = (event) => {
    setTipoImpressao(event.target.value);
    atualizarTipoImpressao(event.target.value)
  };

  React.useEffect(() => {
      obterUsuarioPorID()
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const sideBarRightState = useSelector(store => store.sidebar)
  const dispatch = useDispatch()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch({ type: OPEN_DRAWER_MENU_RIGHT, isSidebarRight: false })
  }

  const obterUsuarioPorID = async () => {
    let userId = String(localStorage.getItem('@sigiml/id'))
    await axios.post(`${DOMAIN}/usuario/post/usuario_by_id`, {id: userId}).then(response => {
        setTipoImpressao(response.data[0].tipo_impressao)
    }).catch(error => {
      sendNotification("error", 'Ocorreu um erro ao tentar obter usuario por id! Entre em contato com o suporte técnico!', 3000)
    })
  }

  const atualizarTipoImpressao = async (tipoImpressao) => {
    let userId = String(localStorage.getItem('@sigiml/id'))
    await axios.post(`${DOMAIN}/usuario/atualizar_tipo_impressao/get01/get02/get03/get04/`, {id: userId, tipo_impressao: tipoImpressao}).then(response => {
      sendNotification("success", `Tipo de impressao de etiqueta atualizada com sucesso! A partir de agora suas impressões serão no formato (${tipoImpressao})`, 5000)
    }).catch(error => {
      sendNotification("error", 'Ocorreu um erro ao tentar atualizar o tipo de impressão! Entre em contato com o suporte técnico!', 3000)
    })
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={sideBarRightState.isSidebarRight}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <CancelIcon />
        </IconButton>
      </div>

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ padding: '10px 0 10px' }}>Saldo para duplicar anúncios: <b>157</b></div>
        <div style={{ padding: '0 0 10px' }}>
          <Button size="small" variant="contained">Adicionar saldo</Button>
        </div>
      </div>

      <Divider />
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ padding: '10px 0 10px' }}>
          <FormControl component="fieldset">
            <FormLabel>Tipo de impressão (Etiqueta)</FormLabel>
            <RadioGroup value={tipoImpressao} onChange={handleChangeTipoImpressao}>
              <FormControlLabel value="pdf" control={<Radio />} label="PDF - Impressora normal" />
              <FormControlLabel value="zpl2" control={<Radio />} label="ZPL2 - Impressora térmica" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      

    </Drawer>
  );
}

