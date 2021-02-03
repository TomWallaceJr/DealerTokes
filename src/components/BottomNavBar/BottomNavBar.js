import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import './BottomNavBar.css';

const useStyles = makeStyles({
    root: {
        width: 320,
    },
});

export default function BottomNavBar() {
    const [value, setValue] = React.useState(0);

    const Context = useContext(UserContext);

    const handleLogoutClick = () => {
        Context.processLogout()
    };

    return (
        <footer className='nav-footer'>
            <BottomNavigation
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className='footer'
            >
                <BottomNavigationAction label="Calendar" icon={<CalendarTodayIcon />} component={Link} to='/' />
                <BottomNavigationAction label="Statements" icon={<ListIcon />} component={Link} to='/statements' />
                <BottomNavigationAction label="Log Out" icon={<ExitToAppIcon />} onClick={handleLogoutClick} />
            </BottomNavigation>
        </footer>
    );
};