import { useEffect } from 'react';
import {
    AlertTriangle as AlertTriangle,
    BarChart as BarChartIcon,
    Calendar as CalendarIcon,
    Grid as GridIcon,
    MapPin as MapPinIcon,
    Server as ServerIcon,
    User as UserIcon,
    Users as UsersIcon
} from 'react-feather';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import NavItem from './NavItem';
import { PropTypes } from 'prop-types';


const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    role: 'Administrator',
    name: 'Srikanth Polineni'
};

const items = [
    {
        href: '/app/dashboard',
        icon: GridIcon,
        title: 'Dashboard'
    },
    {
        href: '/app/servers',
        icon: ServerIcon,
        title: 'Servers'
    },
    {
        href: '/app/matches',
        icon: BarChartIcon,
        title: 'Matches'
    },
    {
        href: '/app/geo',
        icon: MapPinIcon,
        title: 'Geo'
    },
    {
        href: '/app/plan',
        icon: CalendarIcon,
        title: 'Schedule'
    },
    {
        href: '/app/users',
        icon: UsersIcon,
        title: 'Users'
    },
    {
        href: '/app/alerts',
        icon: AlertTriangleIcon,
        title: 'Emergency'
    },
    {
        href: '/app/account',
        icon: UserIcon,
        title: 'Account'
    }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (

        <Box sx={{ display: 'flex', flowDirection: 'column', height: '100%' }}>

            <Box sx={{ alignItems: 'center', display: 'flex', flowDirection: 'column', p: 2 }}>

                <Avatar component={RouterLink} src={user.avatar} sx={{ cursor: 'pointer', width: 64, height: 64 }} to="/app/account" />
                <Typography color="textPrimary" variant="h5">
                    {user.name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {user.role}
                </Typography>
            </Box>
            <Divider />
            <Box>
                <List>
                    {items.map((item) => (
                        <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
                    ))}
                </List>
            </Box>
            <Box sx={{ flowGrow: 1 }} />

        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{ sx: { width: 256 } }}>
                    {content}
                </Drawer>
            </Hidden>
            <Hidden lgDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{ sx: { width: 256, top: 64, height: 'calc(100%-64px' } }}>
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
}

DashboardSidebar.propTypes = {
    onMobileClose: () => { },
    openMobile: false
}

