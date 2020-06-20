import React from 'react'
import '../../../assets/css/Global/style.css';

/* Criado por Felipe Miguel dos Santos*/

export default function Panel(props) {
    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title">
                    {props.title}
                </h3>
            </div>
            <div className="panel-body" style={{ "minHeight": "142px" }}>
                {props.content}
            </div>
        </div>
    )
}