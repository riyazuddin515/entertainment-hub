import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleItem from '../../components/SingleItem/SingleItem';
import '../TrendingMoviesSeries.css'
import CustomePagination from '../../components/Pagination/CustomePagination'

const Trending = () => {

    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`)
            console.log(data)
            setContent(data.results)
            setTotalPages(data.total_pages)
            window.scroll(0, 0)
        }
        fetch()
    }, [currentPage])

    return (
        <>
            <div className='container'>
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
                                mediaType={c.media_type}
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

export default Trending
