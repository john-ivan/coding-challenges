import React from 'react';
import SelectPlanet from './SelectPlanet';

function EditForm({ planets, handleEditChange, handlePlanetChange, save }) {
  return (
    <form onSubmit={save}>
      <label>Name:</label>
      <input type="text" name="name"onChange={handleEditChange} />
      <label>Birthday:</label>
      <input type="text" name="birth_year" onChange={handleEditChange} />
      {/* PLANET DROPDOWN */}
      <SelectPlanet
        planets={planets}
        handlePlanetChange={handlePlanetChange}
      />
      <button type="submit" >Save</button>
    </form>
  );
}

export default EditForm;
