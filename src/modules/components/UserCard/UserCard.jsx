import React, { Component } from "react";
import '../../../assets/css/Global/style.css'

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user" style={{ "height": "250px" }}>
        <a href="#" onClick={this.props.onClick}>
          <div className="image">
            <a src={this.props.bgImage} />
          </div>
          <div className="content" style={{'minHeight': '150px'}}>
            <div className="author">

              <img
                src={this.props.avatar}
                alt="..."
                style={{ "maxWidth": "80px", "maxHeight": "80px" }}
              />
              <h4 className="title" style={{ "paddingTop": "5px" }}>
                <>
                  {this.props.name}
                  <br />
                  <small>{this.props.userName}</small>
                </>
              </h4>

            </div>
            <p className="description text-center">{this.props.description}</p>
          </div>
        </a>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
