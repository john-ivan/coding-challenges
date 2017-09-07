import React, { Component } from 'react';
import './Card.css';
import EditForm from './EditForm';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      editVisible: false,
      personName: '',
      personBirth_year: '',
      personPlanet: '',
    };

    // METHODS

    // EDIT SECTION
    this.edit = this.edit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handlePlanetChange = this.handlePlanetChange.bind(this);
    this.save = this.save.bind(this);

    // FAVORITES SECTION
    this.favorite = this.favorite.bind(this);
  }

  // Toggle edit visibility
  edit() {
    this.setState({ editVisible: !this.state.editVisible });
  }

  // Track input changes
  handleEditChange(event) {
    if (event.target.name === 'name')
      this.setState({ personName: event.target.value });
    if (event.target.name === 'birth_year')
      this.setState({ personBirth_year: event.target.value });
  }

  // Track planet selection
  handlePlanetChange(event) {
    this.setState({ personPlanet: event.target.value });
  }

  // save edits
  save(event) {
    const { personName, personBirth_year, personPlanet, editVisible } = this.state;
    const { id, fetchPerson } = this.props;
    fetchPerson(id, personName, personBirth_year, personPlanet);
    this.setState({ editVisible: !editVisible });
    event.preventDefault();
  }

  favorite() {
    const { modifyFavoritesAPI, id } = this.props;
    modifyFavoritesAPI(id);
  }

// RENDER -------------------------------------------------------------

  render() {
    const { name, image, birth_year, homeworld, planets } = this.props;
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-name">{name}</div>
          <img src={`http://localhost:3008/${image}`} alt="profile" />
          <p>
            <span>Birthday:</span>
            <span>{birth_year}</span>
          </p>
          <p>
            <span>Homeworld:</span>
            <span>{homeworld}</span>
          </p>
          {/* EDIT AND FAVORITE BUTTONS */}
          <button onClick={this.edit}>edit</button>
          <button onClick={this.favorite}>❤</button>
          { this.state.editVisible ?
            // CONDITIONAL EDIT FORM
            <EditForm
              planets={planets}
              handleEditChange={this.handleEditChange}
              handlePlanetChange={this.handlePlanetChange}
              save={this.save}
            /> : null
        }
        </div>
      </div>
    );
  }
}

export default Card;
