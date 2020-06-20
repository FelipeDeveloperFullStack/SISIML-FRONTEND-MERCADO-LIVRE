import React from 'react'
import ChatComponent from './ChatComponent'
import * as moment from 'moment'
import 'moment/locale/pt-br'

export default function ChatView(props) {

    const [horasAtras, setHorasAtras] = React.useState()

    const showHorasAtras = (date) => {
        setHorasAtras(moment(date).locale('pt-br').fromNow())
    }

    return (
        <>
            <ChatComponent {...props} 
                showHorasAtras={showHorasAtras} 
                horasAtras={horasAtras} 
                perguntas={props.perguntas}
                responder={props.responder}/>
        </>
    )
}

