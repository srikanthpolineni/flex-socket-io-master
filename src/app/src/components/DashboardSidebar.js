import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Avatar, Box, Divider, Drawer, Hidden, List, Typography } from '@material-ui/core';
import {
    AlertTriangle as AlertTriangleIcon,
    Activity as ActivityIcon,
    Calendar as CalendarIcon,
    Grid as GridIcon,
    MapPin as MapPinIcon,
    Server as ServerIcon,
    User as UserIcon,
    Users as UsersIcon,
    LogOut as LogOutIcon
} from 'react-feather';
import NavItem from './NavItem';


const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    role: 'Administrator',
    name: 'Srikanth Polineni'
};

const items = [
    {
        href: '/dashboard',
        icon: GridIcon,
        title: 'Dashboard'
    },
    {
        href: '/servers',
        icon: ServerIcon,
        title: 'Servers'
    },
    {
        href: '/matches',
        icon: ActivityIcon,
        title: 'Matches'
    },
    {
        href: '/geo',
        icon: MapPinIcon,
        title: 'Geo'
    },
    {
        href: '/plan',
        icon: CalendarIcon,
        title: 'Schedule'
    },
    {
        href: '/users',
        icon: UsersIcon,
        title: 'Users'
    },
    {
        href: '/alerts',
        icon: AlertTriangleIcon,
        title: 'Emergency'
    },
    {
        href: '/account',
        icon: UserIcon,
        title: 'Account'
    }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [pathname]);

    const content = (

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>

            <Box sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                p: 2
            }}>

                <Avatar
                    component={RouterLink}
                    src={user.avatar}
                    sx={{ cursor: 'pointer', width: 64, height: 64 }}
                    to="/account" />
                <Typography color="textPrimary" variant="h5">
                    {user.name}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {user.role}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {items.map((item) => (
                        <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
                    ))}
                </List>
            </Box>
            <Box sx={{ flowGrow: 1, marginBottom: "auto" }} />
            <Hidden lgUp>
                <Box sx={{ p: 2, marginTop: "auto" }} >
                    <NavItem href="/logout" key="Logout" title="Logout" icon={LogOutIcon} />
                </Box>
            </Hidden>
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
                    PaperProps={{ sx: { width: 256, top: 64, height: 'calc(100% - 64px)' } }}>
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

DashboardSidebar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
}

export default DashboardSidebar;