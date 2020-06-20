import {OPEN_DRAWER_MENU, OPEN_DRAWER_MENU_RIGHT} from '../../constants/constants'

const INITIAL_STATE = {
    isSidebar: true,
    drawerWidth: 240,
    isSidebarRight: false
}

export default function sidebarReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case OPEN_DRAWER_MENU: {
            return {...state, isSidebar: action.isSidebar}
        }
        case OPEN_DRAWER_MENU_RIGHT: {
            return {...state, isSidebarRight: action.isSidebarRight}
        }
        default: {
            return {...state}
        }
    }
}

