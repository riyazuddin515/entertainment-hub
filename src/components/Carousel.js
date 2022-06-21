import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../Config/config'
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ mediaType, id }) => {

    const [credit, setCredit] = useState([]);

    const fetch = async () => {
        const response = await axios(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        console.log(response)
        setCredit(response?.data?.cast)
    }

    const items = credit.map(c => (
        <div className="carousel_item">
            <img src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                onDragStart={handleDragStart}
                role="presentation" />
            <b>{c.name}</b>
        </div>
    ))

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        console.log(items)
    }, [items])

    const responsive = {
        0: {
            items: 3
        },
        512: {
            items: 5
        },
        1024: {
            items: 5
        }
    }

    return (
        <>
            <AliceCarousel
                mouseTracking
                responsive={responsive}
                autoPlay
                infinite
                items={items}
                disableDotsControls={true}
                disableButtonsControls={true}
            />
        </>
    );
}

export default Carousel;