import React, {useEffect} from "react";
import axios from 'axios'
import { LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'
import {useDispatch} from 'react-redux'
import {DOMAIN} from '../../constants/constants'
import sendNotification from '../../components/Notification/Notification'

/**
 * Criador por: @author Felipe M. Santos
 */

export default function CallApiAnuncio(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        let userId = String(localStorage.getItem('@sigiml/id'))
        axios.get(`${DOMAIN}/anuncio/0/active/${userId}`).then(resp => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false })
        }).catch(err => { sendNotification('error', 'Ocorreu um erro ao tentar obter os anúncios do Mercado Livre, por favor verifique sua conexão com a internet e aperte F5 para atualizar a página!', 5000) })
    }, [])

    return(
        <div></div>
    )
}