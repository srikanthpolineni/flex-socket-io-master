
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { LogOut as LogOutIcon } from 'react-feather';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const [notifications] = useState([]);

    return (
        <AppBar elevation={0} {...rest}>
            <Toolbar>
                <RouterLink to="/">
                    <img alt="Logo" src="/static/logo.svg" />
                </RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                <Hidden lgDown>
                    <IconButton color="inherit">
                        <Badge badgeContent={notifications.length}
                            color="primary" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <LogOutIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onMobileNavOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;