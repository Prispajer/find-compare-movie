const autoCompleteConfig = {
  renderOption(movie) {
    const showImg = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${showImg}" />
    ${movie.Title} (${movie.Year})
  `;
  },
  onOptionSelect(movie, summarySide, columnSide) {
    onMovieSelect(movie, document.querySelector(summarySide), columnSide);
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(foundTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "d9835cc5",
        s: foundTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});
