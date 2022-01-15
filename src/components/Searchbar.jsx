import { useState } from "react";
import { ReactComponent as MyImg } from "../img/307875.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./styles.module.css";

export default function SearchBar(value) {
  // state = {
  //   query: "",
  // };
  const [query, setQuery] = useState("");

  const hanleChange = (event) => {
    setQuery(event.currentTarget.value.toLowerCase());
    //console.log(state.query);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    if (query !== "") {
      value.onSubmit(query);
      setQuery("");
      return;
    }
    toast.error("write searching images");
  };

  return (
    <header className={style.Searchbar}>
      <form onSubmit={HandleSubmit} className={style.SearchForm}>
        <button type="submit" className={style["SearchForm-button"]}>
          <MyImg style={{ marginRight: 8 }} />

          <span className={style["SearchForm-button-label"]}>Search</span>
        </button>

        <input
          className={style["SearchForm-input"]}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={hanleChange}
        />
      </form>
    </header>
  );
}
