import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import { Loader, Tab } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import { Calendar } from 'primereact/calendar';
import { Chart } from 'primereact/chart';

import ChartUI from "react-apexcharts";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import { Message } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';


export default function DashboardView(props) {

  const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: 120
    }
  }));

  const classes = useStyles();

  const [state, setState] = useState({
    dataGrafico: new Date()
  })

  const pt_br = {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  };



  return (

    <>

      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Row style={{ padding: '0 0 10px' }}>
            <Col md={12}>
              {localStorage.getItem('@sigiml/expiration_day') <= 15 &&
                <Message warning>
                  <Message.Header>
                    Restam {localStorage.getItem('@sigiml/expiration_day')} dias para finalizar seu período de teste.
                  </Message.Header>
                  <Message.Content>
                    <div>
                      Caso queira continuar usando o sistema após esse período, clique aqui para efetuar a compra.
                    </div>
                  </Message.Content>
                </Message>
              }
              {props.comunicado !== undefined &&
                <Message negative style={{ width: '100%' }}>
                  <Message.Header>{props.comunicado.label}</Message.Header>
                  <Message.Content>
                    <>
                      <span>{props.comunicado.description}</span>
                      <div><a href={props.comunicado.link} target='_blank'>{props.comunicado.text}</a></div>
                    </>
                  </Message.Content>
                </Message>
              }
            </Col>
          </Row>
          <Paper elevation={3} style={{ 'height': '130px' }}>
            <Row>
              <Col md={12}>
                <div style={{ 'color': '#818181', 'fontSize': '20px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Mercado Pago</div>
              </Col>
            </Row>

            <Row style={{ 'paddingTop': '15px' }}>
              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoTotal}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Em conta</div>
              </Col>

              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoDisponivel}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Disponível</div>
              </Col>

              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoALiberar}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>A liberar</div>
              </Col>

              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoBloqueado}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Bloqueado</div>
              </Col>
            </Row>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3}>

            <Row>
              <Col md={12}>
                <div style={{ 'color': '#818181', 'fontSize': '20px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Estado das publicações</div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.statePerguntas.question.length}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Perguntas</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>sem responder</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.qtdeMessagensNaoLidas}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Mensagens</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>sem ler</div>
              </Col>
            </Row>

            <Row style={{ 'paddingBottom': '20px', 'paddingTop': '10px' }}>
              <Col md={6}>
                {props.totalAtivos === undefined
                  ? <Loader size='mini' active={props.totalAtivos === undefined} inline style={{ margin: '16px 130px 0' }} />
                  : <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.totalAtivos}</div>
                }
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Publicações</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>ativas</div>
              </Col>

              <Col md={6}>
                {props.totalPausados === undefined
                  ? <Loader size='mini' active={props.totalPausados === undefined} inline style={{ margin: '16px 130px 0' }} />
                  : <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.totalPausados}</div>
                }
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Publicações</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>pausadas</div>
              </Col>
            </Row>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} style={{ 'height': '200px' }}>

            <Row>
              <Col md={12}>
                <div style={{ 'color': '#818181', 'fontSize': '20px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Atividade de hoje</div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.qtdeVendasDiaria}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Vendas</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ {props.faturamentoDiario.toFixed(2)}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Faturamento</div>
              </Col>
            </Row>

            <Row style={{ 'paddingBottom': '20px', 'paddingTop': '30px' }}>
              <Col md={6}>
                <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.qtdePerguntasDiaria}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Perguntas</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ {props.ticketMedioDiario.toFixed(2)}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Ticket médio</div>
              </Col>
            </Row>

          </Paper>
        </Grid>
      </Grid>

      <div style={{ margin: '15px 0 0' }}>

        <FormControl className={classes.formControl} style={{ width: '150px' }}>
          <InputLabel>Escolher período.</InputLabel>
          <Select>
            <MenuItem value={7}>Últimos 7 dias</MenuItem>
            <MenuItem value={14}>Últimos 14 dias</MenuItem>
            <MenuItem value={30}>Últimos 30 dias</MenuItem>
            <MenuItem value={0}>Escolher período</MenuItem>
          </Select>
        </FormControl>

        <Calendar style={{ width: '200px', margin: '15px 15px 0' }} value={state.dataGrafico} onChange={(e) => setState({ ...state, dataGrafico: e.value })}
          selectionMode="range" readonlyInput={true} locale={pt_br} dateFormat="dd/mm/yy" numberOfMonths={2} />

      </div>


      <ChartUI
        options={props.options}
        series={props.series}
        type="line"
        width="550"
      />


    </>
  );

}


