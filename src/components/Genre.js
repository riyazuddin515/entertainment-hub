import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import axios from 'axios'
import React, { useEffect } from 'react'

const Genre = ({
    type,
    genres,
    setGenres,
    selectedGenres,
    setSelectedGenres,
    setCurrentPage
}) => {

    const fetchGenre = async () => {
        const { data: { genres } } = await axios(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(genres)
    }

    useEffect(() => {
        fetchGenre()
        return () => {
            setGenres([])
        }
    }, [])

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        setCurrentPage(1)
    }

    const handleDelete = (genre) => {
        setGenres([...genres, genre])
        setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id))
        setCurrentPage(1)
    }

    return (
        <div>
            {selectedGenres && selectedGenres.map(genre => (
                <Chip
                    key={genre.id}
                    label={
                        <Typography style={{ fontSize: '1.2rem' }}>{genre.name}</Typography>
                    }
                    style={{ margin: '.2rem' }}
                    clickable
                    color='secondary'
                    onDelete={() => handleDelete(genre)}
                />
            ))}
            {genres && genres.map(genre => (
                <Chip
                    key={genre.id}
                    label={
                        <Typography style={{ fontSize: '1.2rem' }}>{genre.name}</Typography>
                    }
                    style={{ margin: '.2rem' }}
                    clickable
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    )
}

export default Genre
