import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import './BottomNavBar.css';

const useStyles = makeStyles({
    root: {
        width: 320,
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <footer>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className='footer'
            >
                <BottomNavigationAction label="Calendar" icon={<CalendarTodayIcon />} />
                <BottomNavigationAction label="Statements" icon={<ListIcon />} />
            </BottomNavigation>
        </footer>
    );
}