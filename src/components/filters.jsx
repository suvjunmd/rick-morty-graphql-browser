import { Form, useSearchParams } from "react-router-dom";
import { getFiltersFromSearchParams } from "../utils";
import { FILTERS } from "../utils";

export default function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValues = getFiltersFromSearchParams(searchParams);

  function handleSubmit(e) {
    e.preventDefault();

    // remove empty values from form data
    const params = {};
    FILTERS.forEach((filter) => {
      const filterValue = e.target[filter].value;
      if (filterValue) {
        params[filter] = filterValue;
      }
    });
    setSearchParams(params);
  }

  function handleReset() {
    setSearchParams({});
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
          <input
            id="name"
            type="search"
            name="name"
            defaultValue={filterValues.name}
          />
          <br />
          <label htmlFor="status">Status</label>
          <br />
          <select id="status" name="status" defaultValue={filterValues.status}>
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
            defaultValue={filterValues.species}
          />
          <br />
          <label htmlFor="type">Type</label>
          <br />
          <input
            id="type"
            type="text"
            name="type"
            defaultValue={filterValues.type}
          />
          <br />
          <label htmlFor="gender">Gender</label>
          <br />
          <select id="gender" name="gender" defaultValue={filterValues.gender}>
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
