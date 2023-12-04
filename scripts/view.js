const movieTemplate = (movieDetail) => {
  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
     <article class ="media is-full-mobile">
       <figure class ="media-left">
          <p class ="image">
            <img src="${movieDetail.Poster}"/>
          </p>
       </figure>
       <div class=media-content> 
          <div class="content">
            <h1>${movieDetail.Title}</h1>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
          </div>
       </div>
     </article>
     <article data-value ="${awards}"class="notification is-link ">
        <p class ="title">${
          movieDetail.Awards === "N/A" ? "NOT FOUND IN API" : movieDetail.Awards
        }</p>
        <p class ="subtittle">Awards</p>
     </article>
     <article data-value ="${dollars}"class="notification is-link ">
        <p class ="title">${
          movieDetail.BoxOffice === "N/A"
            ? "NOT FOUND IN API"
            : movieDetail.BoxOffice
        }</p>
        <p class ="subtittle">Box Office</p>
     </article>
     <article data-value ="${metascore}"class="notification is-link ">
        <p class ="title">${
          movieDetail.Metascore === "N/A"
            ? "NOT FOUND IN API"
            : movieDetail.Metascore
        }</p>
        <p class ="subtittle">Metascore</p>
     </article>
     <article data-value ="${imdbRating}"class="notification is-link ">
        <p class ="title">${
          movieDetail.imdbRating === "N/A"
            ? "NOT FOUND IN API"
            : movieDetail.imdbRating
        }</p>
        <p class ="subtittle">IMDB Rating</p>
     </article>
     <article data-value ="${imdbVotes}"class="notification is-link ">
        <p class ="title">${
          movieDetail.imdbVotes === "N/A"
            ? "NOT FOUND IN API"
            : movieDetail.imdbVotes
        }</p>
        <p class ="subtittle">IMDB Votes</p>
     </article>
  `;
};
