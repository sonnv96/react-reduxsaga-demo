import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dashboard, PeopleAlt } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',

      '&.active > div': {
        backgroundColor: theme.palette.action.selected
      }

    }
  })
);


export function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dasboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/admin/student" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Student" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
