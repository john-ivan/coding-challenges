import React from 'react';

function SelectPlanet({ planets, handlePlanetChange }) {
  return (
    <label>Planet
    {/* OPTIONAL: set default homeworld */}
      <select onChange={handlePlanetChange}>
        { planets.map(planet => <option key={planet.id} value={planet.id}>{planet.name}</option>,
        )
    }
      </select>
    </label>
  );
}

export default SelectPlanet;
