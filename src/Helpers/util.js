

export const formatarDataHora = (date) => {
    let formatData = date.substring(0, 10).split('-')
    let hora = date.substring(11, 16)
    let dataHoraFormatada = formatData[2] + '/' + formatData[1] + '/' + formatData[0] + ' as ' + hora
    return dataHoraFormatada
}

export const formatarData = (date) => {
    let formatData = date.substring(0, 10).split('-')
    let dataHoraFormatada = formatData[2] + '/' + formatData[1] + '/' + formatData[0]
    return dataHoraFormatada
}

export const formatarDataInverter = (date) => {
    date = date.replace(/"/g, '')
    let formatData = date.substring(0,10).split('-')
    let dataHoraFormatada = formatData[0]+'-'+formatData[1]+'-'+formatData[2]
    return dataHoraFormatada
}

export const removerCaracteresEspeciaisEAcentos = (especialChar) => {
    especialChar = especialChar.replace('/[áàãâä]/ui', 'a');
    especialChar = especialChar.replace('/[éèêë]/ui', 'e');
    especialChar = especialChar.replace('/[íìîï]/ui', 'i');
    especialChar = especialChar.replace('/[óòõôö]/ui', 'o');
    especialChar = especialChar.replace('/[úùûü]/ui', 'u');
    especialChar = especialChar.replace('/[ç]/ui', 'c');
    especialChar = especialChar.replace('/[^a-z0-9]/i', '_');
    especialChar = especialChar.replace('/_+/', '_'); //
    return especialChar;
}
