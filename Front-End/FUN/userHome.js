async function moviesDisplay() {
  const userLogAuth = await JSON.parse(localStorage.getItem("userLogAuth"))
  const token = userLogAuth.token;
  const config = {
    headers: {
      "x-access-token": token,
      "Content-type": "application/json",
    },
  };
  const apiUrl = 'http://localhost:3001/movies';
  try {
    const { data } = await axios.get(apiUrl, config);
    const moviesContainer = document.getElementById('moviesContainer');
    for (const movie of data) {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      const content = `
            <div class="row">
              <div class="col-md-8">
                <h5>${movie.movieName}</h5>
                <p>Date: ${movie.movieDate}</p>
                <p>Available Seats: ${movie.movieSeats}</p>
                <p>Price: $${movie.moviePrice}</p>
              </div>
            </div>
          `;
      listItem.innerHTML = content;
      moviesContainer.appendChild(listItem);

    }
  } catch (error) {
    console.error('Error:', error);
  }
}
window.onload = async function () {
  await moviesDisplay();
}
