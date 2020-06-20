import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import ControlleEstoqueView from './ControlleEstoqueView'

export default function Icons() {

  document.title = "Controle de Estoque"
  
  return (
    <ControlleEstoqueView></ControlleEstoqueView>
  );
}


