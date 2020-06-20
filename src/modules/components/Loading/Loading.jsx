import React from 'react'
import { Image } from "react-bootstrap";
import loading from '../../../assets/img/loading/carregando_transparente.gif'


export default function Loading(props){
    return ( 
        <Image src={loading} width={props.width}/>
    )
}

