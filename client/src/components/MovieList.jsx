import React from 'react';
import { useAuthToken } from "../AuthTokenContext";


const MovieList = (props) => {
	const { accessToken } = useAuthToken();
	const handleAdd = async (movie) => {
		// const newContent = window.prompt("Current content: \n"+item.content +"\n New Content");
		// //window.open('childcomponent.js','Data','height=250,width=250');
	
		if (movie) {
			
		  const data = await fetch(`http://localhost:8000/movie`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${accessToken}`,
			},
			//some placeholder for empty data
			body: JSON.stringify({
			  title: movie.Title,
			  director: "PlaceHolder",
			  rating: 0.0
			}),
		  });
		  if (data.ok) {
	
			window.location.reload(false);
	  
		  } else {
			console.error("Failed to update user name");
		  }
		}
	}
	  


	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<li >
               			<span>Title: {movie.Title}</span><br/>
						   <button onClick={(e) => handleAdd(movie)}>
               				Add to databse
             				</button>
            		</li>		
					<img src={movie.Poster} alt='movie'></img>
				</div>
			))}
		</>
	);
};

export default MovieList;