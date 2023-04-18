import { FormEvent, useEffect } from "react";
import { Form } from "react-router-dom";
import { FilterConfig, getFilterConfig } from "../utils";

interface FiltersProps {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  onSubmit: (config: FilterConfig) => void;
}

export default function Filters({
  name,
  status,
  species,
  type,
  gender,
  onSubmit,
}: FiltersProps) {
  useEffect(() => {
    //restore form values when using the Back button in the browser
    (document.getElementById("name") as HTMLInputElement).value = name || "";
    (document.getElementById("status") as HTMLInputElement).value =
      status || "";
    (document.getElementById("species") as HTMLInputElement).value =
      species || "";
    (document.getElementById("type") as HTMLInputElement).value = type || "";
    (document.getElementById("gender") as HTMLInputElement).value =
      gender || "";
  }, [name, status, species, type, gender]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // remove empty values from form data
    const filterConfig = getFilterConfig((item) => e.currentTarget[item]?.value);
    
    onSubmit(filterConfig);
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
