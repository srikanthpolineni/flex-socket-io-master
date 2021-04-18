import { Button, ListItem } from "@material-ui/core";
import { matchPath, useLocation, NavLink as RouterLink } from "react-router-dom";
import PropTypes from 'prop-types';

const NavItem = ({ href, icon: Icon, title, ...rest }) => {

    const location = useLocation();

    const active = href ? !!matchPath({ path: href, end: false }, location.pathname) : false;

    return (
        <ListItem disableGutters sx={{ display: 'flex', py: 0 }} {...rest}>
            <Button component={RouterLink} sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                ...(active && { color: 'primary.main' }),
                '& svg': { mr: 1 }
            }}
                to={href}>
                {Icon && (<Icon size="20" />)}
                <span>
                    {title}
                </span>
            </Button>
        </ListItem>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string
};

export default NavItem;

