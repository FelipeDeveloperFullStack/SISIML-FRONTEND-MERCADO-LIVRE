import React from "react";

import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "modules/components/Card/Card.jsx";
import { FormInputs } from "modules/components/FormInputs/FormInputs.jsx";
import Button from "modules/components/CustomButton/CustomButton.jsx";


export default function AnuncioView(props) {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Anúncio"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Título",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Digite aqui o título do anúncio",
                          disabled: false
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4"]}
                      properties={[
                        {
                          label: "Preço",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Digite o preço de venda do produto",
                        }
                      ]}
                    />
                 
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Descrição</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Digite aqui a descrição do anúncio"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                          {props.response}
                      </Col>
                    </Row>

                    <Button bsStyle="info" pullRight fill type="submit">
                      Salvar
                    </Button>

                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  
}


