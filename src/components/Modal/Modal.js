import { Badge, Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { img_500, unavailable } from '../../Config/config'
import './Modal.css'
import Carousel from '../Carousel';
import MailIcon from '@material-ui/icons/Mail';

const b = {
    position: 'fixed',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',
    borderRadius: '2rem',
    backgroundColor: 'rgb(0, 0, 0, 0.7)',
    zIndex: 1000
}

const Modal = ({ open, setOpen, mediaType, id, children }) => {

    const [content, setContent] = useState({})
    const [video, setVideo] = useState();

    const fetch = async () => {
        const response = await axios(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        console.log(response)
        setContent(response.data)
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        if (open) {
            fetch()
            fetchVideo()
        }
    }, [open])

    if (!open) {
        return null
    }

    return ReactDOM.createPortal(
        <>

            <div style={b} onClick={() => setOpen(false)}></div>
            <div className='modal' onMouseEnter={() => console.log('enter')} onMouseLeave={() => console.log('leave')}>

                <HighlightOffIcon style={
                    {
                        fontSize: '3rem',
                        marginTop: '1rem',
                        marginRight: '1rem',
                        position: 'absolute',
                        right: '-4%',
                        top: '-4%',
                        color: 'white',
                        cursor: 'pointer'
                    }
                } onClick={() => setOpen(false)} />

                <img className='poster_image_backdrop' src={`${content.backdrop_path}` ? `${img_500}/${content.backdrop_path}` : unavailable} alt={`${content.name || content.title}`} />
                <img className='poster_image_landscape' src={`${content.poster_path}` ? `${img_500}/${content.poster_path}` : unavailable} alt={`${content.name || content.title}`} />
                <div className="model_content">
                    <h1>{content.name || content.title}</h1>
                    <div className="con" style={{ display: 'flex' }}>
                        <div className="item" >
                            <h3>Released</h3>
                            <p className='p'>{content.release_date}</p>
                        </div>
                        <div className="item" >
                            <h3>Vote</h3>
                            <p className='p'>{content.vote_average}</p>
                        </div>
                        <div className="item" >
                            <h3>Runtime</h3>
                            <p className='p'>{content.runtime}</p>
                        </div>
                    </div>
                    <p className='overview'>{content.overview}</p>
                    <Carousel mediaType={mediaType} id={id} />
                    <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                        style={{ fontSize: '1.5rem', marginTop: '2rem' }}
                    >
                        Watch the Trailer
                    </Button>
                </div>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal
