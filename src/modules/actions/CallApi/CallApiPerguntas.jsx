import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {DOMAIN, GET_PERGUNTAS} from '../../constants/constants'

export default function CallApiPerguntas() {

    const dispatch = useDispatch()

    useEffect(() => {   
        let userId = String(localStorage.getItem('@sigiml/id'))
        axios.get(`${DOMAIN}/perguntas/fila_perguntas/${userId}`).then(pergunta => {
            dispatch({
                type: GET_PERGUNTAS,
                question: pergunta.data
            })
        }).catch(error => {console.log(error)})
    }, [])

    return(<></>)
}