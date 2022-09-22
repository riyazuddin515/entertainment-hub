import { Button } from '@material-ui/core'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import './Search.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import SingleItem from '../../components/SingleItem/SingleItem';
import CustomePagination from '../../components/Pagination/CustomePagination';
import '../TrendingMoviesSeries.css'

const Search = () => {

    const [searchInput, setSearchInput] = useState('')
    const [type, setType] = useState('movie')

    const [content, setContent] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const search = async () => {
        if (searchInput.length < 1)
            return
        const response = await axios(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchInput}&page=${currentPage}&include_adult=false`)
        setContent(response?.data?.results)
        setTotalPages(response?.data?.total_pages)
    }

    useEffect(() => {
        window.scroll(0, 0)
        search()
        // eslint-disable-next-line
    }, [currentPage])

    return (
        <div className='container' >
            <div className='form'>
                <input type='text'
                    className='search-input'
                    placeholder='Search'
                    value={searchInput}
                    onChange={(e) => { setSearchInput(e.target.value) }}
                    style={{ paddingLeft: '1.5rem', fontSize: '2rem' }}
                />
                <Button variant='contained'
                    style={{ backgroundColor: 'white' }}
                    onClick={search}
                >
                    <SearchIcon className='search-icon'
                        style={{ fontSize: '2.8rem', color: 'black' }}
                    />
                </Button>
            </div>

            <Tabs
                style={{ width: '100%', marginTop: '1rem' }}
                value={type}
                onChange={(e, newValue) => {
                    setType(newValue)
                    setCurrentPage(1)
                }}
                textColor="inherit"
                indicatorColor='primary'
                aria-label="secondary tabs example"
            >
                <Tab value="movie" label="Movies" style={{ width: '50%', fontSize: '1.5rem' }} />
                <Tab value="tv" label="TV Series" style={{ width: '50%', fontSize: '1.5rem' }} />
            </Tabs>

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
        </div >
    )
}

export default Search
