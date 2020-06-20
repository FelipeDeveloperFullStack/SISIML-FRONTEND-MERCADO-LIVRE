import { GET_PERGUNTAS, GET_QTDE_PERGUNTAS } from '../../constants/constants'

const INITIAL_STATE = {
    question: [],
    qtdePerguntas: 0
}

export default function perguntasReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PERGUNTAS: {
            return { ...state, question: action.question}
        } case GET_QTDE_PERGUNTAS: {
            return {...state, qtdePerguntas: action.qtdePerguntas}
        }
        default: {
            return { ...state }
        }
    }
}

