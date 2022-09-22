import React, { useState } from 'react'
import './SingleItem.css'
import { img_300 } from '../../Config/config'
import Modal from '../Modal/Modal';

const SingleItem = ({
    id,
    title,
    image,
    date,
    vote,
    mediaType
}) => {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className='poster'>
                <img src={`${img_300}/${image}`} alt="" onClick={() => setOpen(true)} />
                <h1 className='title'>{title} </h1>
                <div className='data'>
                    <p >{mediaType === 'tv' ? 'TV Series' : 'Movie'}</p>
                    <p>{date}</p>
                </div>
                <Modal open={open} setOpen={setOpen} mediaType={mediaType} id={id} />
            </div>
        </div>
    )
}

export default SingleItem
