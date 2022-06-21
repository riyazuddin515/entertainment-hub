import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleItem from '../../components/SingleItem/SingleItem';
import CustomePagination from '../../components/Pagination/CustomePagination'
import '../TrendingMoviesSeries.css'
import Genre from '../../components/Genre';
import useGenre from '../../hooks/useGenre'


const Movies = () => {
    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    const genreForUrl = useGenre(selectedGenres)

    const fetch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate&with_genres=${genreForUrl}`)
        setContent(data.results)
        setTotalPages(data.total_pages)
        window.scroll(0, 0)
    }

    useEffect(() => {
        fetch() // eslint-disable-next-line
    }, [currentPage, genreForUrl])

    return (
        <>
            <div className='container'>
                <Genre
                    type='movie'
                    genres={genres}
                    setGenres={setGenres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    setCurrentPage={setCurrentPage}
                />
                <div className='container-items'>
                    {
                        content && content.map(c => (
                            <SingleItem
                                key={c.id}
                                id={c.id}
                                title={c.name || c.original_title}
                                image={c.poster_path}
                                date={c.first_air_date || c.release_date}
                                vote={c.vote_average}
                                mediaType='movie'
                            />
                        ))
                    }
                </div>
                {
                    totalPages > 1 &&
                    <CustomePagination className='pagination' count={totalPages} setCurrentPage={setCurrentPage} />
                }
            </div>
        </>
    )
}

export default Movies
