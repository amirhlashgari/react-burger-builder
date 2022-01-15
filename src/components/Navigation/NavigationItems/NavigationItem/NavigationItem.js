import React from 'react';
import { navLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <navLink to={props.link} exact={props.exact} activeClassName={classes.active}>
            {props.children}
        </navLink>
    </li>
);

export default navigationItem;