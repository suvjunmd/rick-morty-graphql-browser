import { useEffect } from "react";
import { Form } from "react-router-dom";
import { FILTERS } from "../utils";

export default function Filters({
  name,
  status,
  species,
  type,
  gender,
  onSubmit,
}) {
  useEffect(() => {
    //restore form values when using the Back button in the browser
    document.getElementById("name").value = name || "";
    document.getElementById("status").value = status || "";
    document.getElementById("species").value = species || "";
    document.getElementById("type").value = type || "";
    document.getElementById("gender").value = gender || "";
  }, [name, status, species, type, gender]);

  function handleSubmit(e) {
    e.preventDefault();

    const params = {};
    // remove empty values from form data
    FILTERS.forEach((filter) => {
      const filterValue = e.target[filter].value;
      if (filterValue) {
        params[filter] = filterValue;
      }
    });
    onSubmit(params);
  }

  function handleReset() {
    onSubmit({});
  }

  return (
    <div>
      <Form
        id="filter-form"
        role="search"
        className="filter-form"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <fieldset>
          <legend>
            <b>Filters</b>
          </legend>
          <label htmlFor="name">Name</label>
          <br />
          <input id="name" type="search" name="name" defaultValue={name} />
          <br />
          <label htmlFor="status">Status</label>
          <br />
          <select id="status" name="status" defaultValue={status}>
            <option value=""></option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
          <br />
          <label htmlFor="species">Species</label>
          <br />
          <input
            id="species"
            type="text"
            name="species"
            defaultValue={species}
          />
          <br />
          <label htmlFor="type">Type</label>
          <br />
          <input id="type" type="text" name="type" defaultValue={type} />
          <br />
          <label htmlFor="gender">Gender</label>
          <br />
          <select id="gender" name="gender" defaultValue={gender}>
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
          <br />
          <br />
          <button type="submit">Filter</button>
          <button type="reset">Reset</button>
        </fieldset>
      </Form>
    </div>
  );
}
