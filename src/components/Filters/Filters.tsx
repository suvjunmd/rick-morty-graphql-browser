import type { FormEvent } from "react";
import { Form } from "react-router-dom";
import { type FilterConfig, getFilterConfig } from "../../utils";
import styles from './Filters.module.css';

interface FiltersProps {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  onSubmit: (config: FilterConfig) => void;
}

export function Filters({
  name,
  status,
  species,
  type,
  gender,
  onSubmit,
}: FiltersProps) {
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
        className={styles.form}
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
