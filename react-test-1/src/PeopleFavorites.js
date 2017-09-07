import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import Card from './Card';

const SortableItem = SortableElement(({ id, name, image, birth_year, homeworld }) => {
  return (
    <div>
      <Card
        id={id}
        name={name}
        image={image}
        birth_year={birth_year}
        homeworld={homeworld}
  // modifyFavoritesAPI={this.modifyFavoritesAPI}
  // fetchPerson={this.fetchPerson}
      />
    </div>
  );
});

const SortableList = SortableContainer(({ PeopleFavorites }) => {
  return (
    <ul>
      { PeopleFavorites.map((person, index) => (
        <SortableItem
          key={person.id}
          index={index}
          id={person.id}
          name={person.name}
          image={person.image}
          birth_year={person.birth_year}
          homeworld={person.homeworld}
        />
      ))}
    </ul>
  );
});

class PeopleFavorites extends Component {
  constructor() {
    super();
    this.state = {
      PeopleFavorites: null,
    }
    this.fetchFaveCards = this.fetchFaveCards.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentDidMount() {
    this.fetchFaveCards();
  }

  onSortEnd ({ oldIndex, newIndex }) {
    this.setState({
      PeopleFavorites: arrayMove(this.state.PeopleFavorites, oldIndex, newIndex),
    });
  }

  fetchFaveCards() {
    fetch('http://localhost:3008/peoplefavorites')
    .then(res => res.json())
    .then((res) => {
      this.setState({ PeopleFavorites: res });
    });
  }

  render() {
    // console.log(this.state);
    const { PeopleFavorites } = this.state;
    return (
      <div>
        { PeopleFavorites ?
          <SortableList
            onSortEnd={this.onSortEnd}
            PeopleFavorites={PeopleFavorites}
          /> : null }
      </div>
    );
  }
}

export default PeopleFavorites;
