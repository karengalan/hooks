import { useState, useEffect } from 'react';
//import noPoster from '../assets/images/no-poster.jpg';

function SearchMovies(){

	/* const movies = [         example
		{
			"Title": "Parchís",
			"Year": "1983",
			"Poster": "https://m.media-amazon.com/images/M/MV5BYTgxNjg2MTAtYjhmYS00NjQwLTk1YTMtNmZmOTMyNTAwZWUwXkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_SX300.jpg"
		},
		{
			"Title": "Brigada en acción",
			"Year": "1977",
			"Poster": "N/A"
		},
	]; */

	// Credenciales de API
	const apiKey = 'bec3ca59'; /* llegó al email */

	/* A partir de lo que yo escriba en el input afectará el estado de movies */
	const [movies, setMovies] = useState([]); //Este array se llenará con el resultado de las peliculas

	const [keyword, setKeyword] = useState('');
	/* Cuando envie el formulario voy a setear con lo que yo escriba en el input */

    useEffect(async () => {
		if(keyword){
			try {
				let response = await fetch(`http://www.omdbapi.com/?apiKey=${apiKey}&s=${keyword}`) /* Saco la palabra rambo que viene, y dentro de bastik el keyword */
				
				let result = await response.json()
				if(result.Response === 'True'){
                    setMovies(result.Search);
				}
			} catch (error) {
				console.log(error);
			}
		}
		
	}, [keyword]);

	const searchMovie = (e) => {
		e.preventDefault();
		setKeyword(e.target.search.value); /* el valor de setKeyword será target.search.value */
    }

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}

							<form method="GET" onSubmit={searchMovie}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" className="form-control" name='search'/>
								</div>
								<button className="btn btn-info">Search</button>
							</form>

						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;
