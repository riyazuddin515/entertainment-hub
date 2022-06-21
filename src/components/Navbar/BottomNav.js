import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';

import { Typography } from '@material-ui/core';

import { useNavigate } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        background: '#39445a',
        boxShadow: '0rem -0.1rem 0.2rem grey'
    },
    label: {
        fontSize: '1.3rem'
    },
    icon: {
        fontSize: '2rem'
    }
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        switch (value) {
            case 0:
                navigate('/')
                break;
            case 1:
                navigate('/movies')
                break;
            case 2:
                navigate('/series')
                break;
            case 3:
                navigate('/search')
                break;
            default:
                break;
        }
    }, [value, navigate])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                style={{ color: value === 0 ? 'red' : 'white' }}
                label={
                    <Typography className={classes.label}>Trending</Typography>
                }
                icon={<WhatshotIcon className={classes.icon} />}
            />
            <BottomNavigationAction
                style={{ color: value === 1 ? 'red' : 'white' }}
                label={
                    <Typography className={classes.label}>Movies</Typography>
                }
                icon={<MovieIcon className={classes.icon} />}
            />
            <BottomNavigationAction
                style={{ color: value === 2 ? 'red' : 'white' }}
                label={
                    <Typography className={classes.label}>TV Series</Typography>
                }
                icon={<TvIcon className={classes.icon} />}
            />
            <BottomNavigationAction
                style={{ color: value === 3 ? 'red' : 'white' }}
                label={
                    <Typography className={classes.label}>Search</Typography>
                }
                icon={<SearchIcon className={classes.icon} />}
            />
        </BottomNavigation>
    );
}
