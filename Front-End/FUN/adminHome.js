let movieName = document.getElementById("movieName");
let movieDate = document.getElementById('movieDate');
let moviePrice = document.getElementById("moviePrice");
let movieSeats = document.getElementById("movieSeats");
let movieBtn = document.getElementById("movieSubBtn");
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
      listItem.className = 'movies_list';
      const content = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-0">${movie.movieName}</h5>
                    <p class="mb-0">${movie.movieDate}</p>
                    <p class="mb-0">Available Seats: ${movie.movieSeats}</p>
                    <p class="mb-0">Price: $${movie.moviePrice}</p>
                </div>
                <div>
                    <button class="btn btn-primary btn-sm mr-2 edit-movie-btn" movieID = "${movie._id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-movie-btn" movieID = "${movie._id}">Delete</button>
                </div>
            </div>
        `;
      listItem.innerHTML = content;
      moviesContainer.appendChild(listItem);
    }
  }
  catch (error) {
    console.log("error is ==>", error);
  }
  //for edit the movies
  const editMovieBtns = document.querySelectorAll('.edit-movie-btn');
  editMovieBtns.forEach((editMovieBtn) => {
    editMovieBtn.addEventListener('click', async (event) => {
      const listItem = event.target.closest('.movies_list');
      $('#movieModal').modal('show'); // Show the modal
      document.getElementById('saveChanges').addEventListener('click', async () => {
        let movieName = document.getElementById('movieNameUpdate');
        let movieDate = document.getElementById('movieDateUpdate');
        let movieSeats = document.getElementById('movieSeatsUpdate');
        let moviePrice = document.getElementById('moviePriceUpdate');
        let movieDetailU = {
          movieName: movieName.value,
          movieDate: movieDate.value,
          moviePrice: movieSeats.value,
          movieSeats: moviePrice.value
        };
        const movieId = event.target.getAttribute('movieID');
        try {
          const { data } = await axios.patch(`http://localhost:3001/movies/${movieId}`, movieDetailU, config);
          alert(data.message);
        } catch (error) {
          console.log("error in patch action is ==>", error);
        }
        location.reload();
        $('#movieModal').modal('hide');
      });
    });
  });
  // for deletion of movies
  const deleteMovieBtns = document.querySelectorAll('.delete-movie-btn');
  deleteMovieBtns.forEach((delMovieBtn) => {
    delMovieBtn.addEventListener('click', async (event) => {
      const listItem = event.target.closest('.movies_list');
      const movieId = event.target.getAttribute('movieID');
      try {
        const res = await axios.delete(`http://localhost:3001/movies/${movieId}`, config);
        location.reload();
      } catch (error) {
        console.log("error in patch actions is ==>", error);
      }
    });
  });
}
movieBtn.addEventListener('click', async function () {
  const apiUrl = 'http://localhost:3001/movies';
  const userLogAuth = await JSON.parse(localStorage.getItem("userLogAuth"))
  const token = userLogAuth.token;
  const movieDetail = {
    movieName: movieName.value,
    movieDate: movieDate.value,
    moviePrice: moviePrice.value,
    movieSeats: movieSeats.value
  }
  const config = {
    headers: {
      "x-access-token": token,
      "Content-type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl, movieDetail, config);
    location.reload();
  }
  catch (error) {
    console.log("error is ==>", error);
  }
})
window.onload = async function () {
  await moviesDisplay();
}
document.getElementById('closePopUpBtn').addEventListener('click', async () => {
  $('#movieModal').modal('hide');
})

