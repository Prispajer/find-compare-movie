const autoCompleteConfig = {
  renderOption(movie) {
    const showImg = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${showImg}" />
    ${movie.Title} (${movie.Year})
  `;
  },
  onOptionSelect(movie, summarySide, columnSide) {
    document.querySelector(".tutorial").classList.add("is-hidden");
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

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "d9835cc5",
      i: movie.imdbID,
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data);
  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSideStats = document.querySelectorAll(
    "#right-summary .notification"
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else if (leftSideValue > rightSideValue) {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    } else {
      rightStat.classList.add("is-primary");
      leftStat.classList.add("is-primary");
    }
  });
};
