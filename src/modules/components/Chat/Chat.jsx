import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import '../../../assets/css/Global/chat.css'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InputBase from '@material-ui/core/InputBase';

/** Created by Felipe M Santos */

export default class Chat extends React.Component {

    render() {
        return (
            <div className='box box-primary direct-chat direct-chat-primary' style={{ border: 'none' }}>
                <div className='box-header'>

                    <h3 className='box-title'>
                        {this.props.title}
                    </h3>

                    <div className='box-tools pull-right' style={{ 'display': this.props.displayButtonClose }}>
                        <button onClick={this.props.close} type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                    </div>

                </div>
                <div className='box-body' style={{ height: this.props.height }}>
                    <div>
                        {this.props.resposta !== null
                            ?
                            <div className='direct-chat-msg'>
                                <div className='direct-chat-info clearfix'>
                                    <span className="direct-chat-name pull-left"><b>{this.props.nomeEmpresa}</b></span>
                                </div>
                                <div style={{ display: 'flex' }}>
                                        <Avatar alt="" src="/" />
                                        <InputBase
                                            multiline
                                            style={{ backgroundColor: '#435F7A', margin: '0px 10px', padding: '15px', borderRadius: '25px', color: 'white' }}
                                            value={this.props.resposta}
                                            fullWidth
                                            size='small'
                                        />
                                </div>
                            </div>
                            : <></>
                        }
                        <span className="direct-chat-info clearfix direct-chat-name pull-left">{this.props.dataHoraPergunta}</span>

                        {this.props.pergunta !== null
                            ?
                            <div>
                                <div className="direct-chat-info clearfix">
                                    <span className="direct-chat-name pull-right"><b>{this.props.nomeCompletoCliente}</b></span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <InputBase
                                            multiline
                                            style={{paddingLeft: '580px', backgroundColor: '#E6EAEA', margin: '0px 10px 10px', padding: '15px', borderRadius: '25px', color: 'black' }}
                                            value={this.props.pergunta}
                                            fullWidth
                                            size='small'
                                        />
                                    <Avatar alt="" src="/" />
                                </div>
                                <div style={{ display: this.props.isShowView }} style={{ display: 'flex', justifyContent: 'flex-end', color: 'blue', margin: '-15px 10px 0px' }}>
                                    {this.props.isViewed ? <DoneIcon /> : <DoneAllIcon />}
                                </div>
                            </div>
                            : <></>
                        }

                    </div>
                </div>
                <div className='box-footer' style={{ 'display': this.props.displayFooter }}>
                    <Input fluid type='text' placeholder='Digite a mensagem que deseja enviar...' action>
                        <input />
                        <Button type='submit'>Enviar resposta</Button>
                    </Input>
                </div>
            </div>
        )
    }
}