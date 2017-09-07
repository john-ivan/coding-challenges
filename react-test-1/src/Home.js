import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Card from './Card';
import Nav from './Nav';
import SearchBar from './SearchBar';
import star from './images/star.svg';
import wars from './images/wars.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: null,
      planets: null,
      page: 1,
      searchTerm: '',
      fetchURL: '',
      favorites: null,
      favoritesCount: null,
    };

    // METHODS

    // fetch Planets from API
    this.fetchPlanets = this.fetchPlanets.bind(this);
    // fetch specific people from API and do a PATCH request
    this.fetchPerson = this.fetchPerson.bind(this);
    // fetch paginated people from API
    this.fetchPage = this.fetchPage.bind(this);
    // map Homeworld id to Homeworld name
    this.findHomeWorld = this.findHomeWorld.bind(this);

    // Pagination
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    // Search
    this.search = this.search.bind(this);
    this.searchChange = this.searchChange.bind(this);
    // Favorites
    this.fetchFavorites = this.fetchFavorites.bind(this);
    this.modifyFavoritesAPI = this.modifyFavoritesAPI.bind(this);
    // this.incFavorites = this.incFavorites.bind(this);
    // this.decFavorites = this.decFavorites.bind(this);
  }

  // LIFECYCLE METHODS

  componentDidMount() {
    // Why does loading show?
    // setState just once initially
    this.fetchPlanets();
    this.fetchFavorites();
    this.fetchPage();
  }

// API CALLS

  // GET request to planets endpoint
  fetchPlanets() {
    let planets;
    fetch('http://localhost:3008/planets')
    .then(res => res.json())
    .then((res) => {
      planets = res;
      this.setState({ planets });
    });
  }

  // GET request to favorites endpoint
  fetchFavorites() {
    const favorites = [];
    fetch('http://localhost:3008/peoplefavorites')
    .then(res => res.json())
    .then((res) => {
      res.forEach(el => favorites.push(el.id));
      this.setState({ favorites, favoritesCount: favorites.length });
    });
  }

  // POST request to modify favorites endpoint
  modifyFavoritesAPI(id, name, image, birth_year, homeworld) {
    const { favorites } = this.state;
    if (!favorites.includes(id)) {
      fetch('http://localhost:3008/peoplefavorites', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
          image,
          birth_year,
          homeworld,
        }),
      })
      .then(() => this.fetchFavorites())
      .then(() => this.fetchPage);
    } else {
      fetch(`http://localhost:3008/peoplefavorites/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      })
      .then(() => this.fetchFavorites())
      .then(() => this.fetchPage);
    }
  }

  // PATCH request to edit a specific id on the people endpoint
  fetchPerson(id, personName, personBirth_year, personPlanet) {
    fetch(`http://localhost:3008/people/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: personName,
        birth_year: personBirth_year,
        homeworld: personPlanet,
      }),
    }).then(() => this.fetchPage());
  }

  // GET request to people endpoint will render initial page or provided searchTerm
  fetchPage() {
    let fetchURL;
    let people;
    const { searchTerm } = this.state;
    if (searchTerm) {
      fetchURL = `http://localhost:3008/people?q=${searchTerm}`;
    } else {
      const { page } = this.state;
      fetchURL = `http://localhost:3008/people?_page=${page}`;
    }
    fetch(fetchURL)
    .then(res => res.json())
    .then((res) => {
      people = res;
      this.setState({ people, fetchURL });
    });
  }

  // Map person id to appropriate homeworld
  findHomeWorld(id) {
    const { planets } = this.state;
    let planetName;
    for (let i = 0; i < planets.length; i += 1) {
      if (id === planets[i].id) {
        planetName = planets[i].name;
      }
    }
    return planetName;
  }

  // PAGINATION

  next() {
    const { page, searchTerm } = this.state;
    const newPage = new Promise((resolve) => {
      if (page >= 1 && page < 8 && !searchTerm) {
        resolve(this.setState({ page: page + 1 }));
      }
    });
    newPage.then(() => this.fetchPage());
  }

  prev() {
    const { page, searchTerm } = this.state;
    const newPage = new Promise((resolve) => {
      if (page > 1 && page <= 8 && !searchTerm) {
        resolve(this.setState({ page: page - 1 }));
      }
    });
    newPage.then(() => this.fetchPage());
  }

// SEARCH

  search(event) {
    this.fetchPage();
    event.preventDefault();
  }

  // Track input changes on searchbar
  searchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

// RENDER ---------------------------------------------------------------------

  render() {
    console.log(this.state);
    const { favorites, favoritesCount, people, planets, searchTerm } = this.state;

    return (
      <div className="content">
        {/* FAVORITES */}
        <div id="favoritesButton">
          <Link to="/peoplefavorites">
            {favoritesCount}❤
          </Link>
        </div>
        <div className="logo">
          <img src={star} alt="star-logo" />
          <span className="interview-text">The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>

        {/* Search */}
        <SearchBar
          value={searchTerm}
          onSearchChange={this.searchChange}
          onSubmit={this.search}
        />

        {/* Pagination */}
        <Nav
          prev={this.prev}
          next={this.next}
        />

        {/* Card Component */}
        { (people && planets) ?
          people.map(person =>
            <Card
              key={person.id}
              id={person.id}
              name={person.name}
              image={person.image}
              birth_year={person.birth_year}
              homeworld={this.findHomeWorld(person.homeworld)}
              planets={planets}
              favorites={favorites}
              modifyFavoritesAPI={this.modifyFavoritesAPI}
              fetchPerson={this.fetchPerson}
            />,
          )
           : null }
      </div>
    );
  }
}

export default App;
