import React from "react";
import { Row, Col } from "react-bootstrap";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'

export default function StatsCard(props) {
  
    if(!props.isLoading){
      return (
        <div className="card card-stats">
          <div className="content">
  
            <Row>
              <Col xs={5}>
                <div className="icon-big text-center icon-warning">
                  {props.bigIcon}
                </div>
              </Col>
              
              <Col xs={7}>
                <div className="numbers">
                  <p>{props.statsText}</p>
                  {props.statsValue}
                </div>
              </Col>
            </Row>
  
            <div className="footer">
  
              <hr />
              <div className="stats">
                {props.statsIcon} {props.statsIconText}
              </div>
            
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className="card card-stats">
          <div className="content">
            <Carregando width={250}/>
          </div>
        </div>
        
      )
    }
  
   
}

