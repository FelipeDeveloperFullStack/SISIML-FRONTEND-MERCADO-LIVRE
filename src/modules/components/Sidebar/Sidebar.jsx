import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { OPEN_DRAWER_MENU } from '../../constants/constants'
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import Collapse from '@material-ui/core/Collapse';
//import ChatIcon from '@material-ui/icons/Chat';
//import ListSubheader from '@material-ui/core/ListSubheader';
import TouchRipple from "@material-ui/core/ButtonBase";
import { Icon } from "@material-ui/core";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function Sidebar(props) {

  const drawerWidth = 250;

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const sideBarState = useSelector(store => store.sidebar)
  const perguntas = useSelector(store => store.perguntas)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  const [selectedIndex, setSelectedIndex] = React.useState(props.location.pathname);

  const handleListItemClick = (path, name) => {
    setSelectedIndex(path);
    setOpen(name === 'Chat' ? !open : open)
  };

  const handleClickClose = () => {
    dispatch({ type: OPEN_DRAWER_MENU, isSidebar: false })
  }

  return (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: sideBarState.isSidebar,
            [classes.drawerClose]: !sideBarState.isSidebar,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: sideBarState.isSidebar,
              [classes.drawerClose]: !sideBarState.isSidebar,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleClickClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>

          <Divider />

          {props.routes.map((prop, key) => {
            if (!prop.redirect) {
              //https://material-ui.com/pt/components/lists/#simple-list
              return (
                <List dense={true} key={key} component="nav">
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    activeStyle={{ color: 'black' }}
                    style={{color: 'black'}}>

                    <ListItem button key={key} onClick={() => handleListItemClick(prop.layout + prop.path, prop.name)} selected={selectedIndex === prop.layout + prop.path}>
                      <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} badgeContent={prop.name === 'Chat' ? (perguntas.qtdePerguntas >= 0 ? perguntas.qtdePerguntas : 0) : 0} color="primary">
                        <ListItemIcon style={{ 'marginLeft': '10px', color: 'black' }}><i className={prop.icon} style={{ 'fontSize': '15px' }} /></ListItemIcon>
                      </Badge>
                      <ListItemText style={{fontSize: '5px'}} primary={prop.name} />
                    </ListItem>

                  </NavLink>
                </List>
              );
            }
            return null;
          })}

        </Drawer>
  );
}

