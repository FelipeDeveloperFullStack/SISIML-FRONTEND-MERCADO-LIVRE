import React from 'react'
import { Image } from "react-bootstrap";
import aguardeLoading from '../../../assets/img/loading/aguarde.gif'


export default function Carregando(props){
    return ( 
        <Image src={aguardeLoading} width={props.width}/>
    )
}

