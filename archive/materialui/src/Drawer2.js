import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Button, List, Divider, ListItem, ListItemIcon, 
    ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles({
    list: { width: 250 },
    fullList: { width: 'auto' }
});

export const TemporaryDrawer = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        top: false, 
        left: true, 
        bottom: false, 
        right: false
    });

    const anchor='left';

    const onClickListItem = (e, text, index) => {
        e.preventDefault();
        console.log(`text: ${text}`);
    };

    const list = (anchor) => (
        <div>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text} onClick={(e) => onClickListItem(e, text)}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={true} variant="permanent">
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
};