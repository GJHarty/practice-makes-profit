import { Avatar, Button, Divider, Fab, Grid, ListItemText, List, ListItem, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

export default function ChatDisplay({ stockSymbol }) {

  const store = useSelector((store) => store);
  const user = store.user;
  const classes = useStyles();
  const [newChat, setNewChat] = useState('');
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    fetchChat();
  }, [])

  const sendChat = () => {
    console.log('newChat', newChat);
    console.log('stockSymbol', stockSymbol);
    axios.post('/api/chat', {
        newChat,
        stockSymbol
      }).then(response => {
        fetchChat();
      }).catch(err => {
        console.error('Error posting new message', err);
      })
  }

  const fetchChat = () => {
    axios.get('/api/chat', { params: { stockSymbol }})
      .then(response => {
        console.log('chat data is ', response.data);
        setChatList(response.data);
      })
      .catch(err => {
        console.error('error getting chats', err);
      })
  }

 
  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
            <Typography className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={9}>
            <List className={classes.messageArea}>
                {chatList.map(item => (
                  <>
                  {item.stockSymbol === stockSymbol &&
                    <ListItem key={item.message}>
                      <Grid container>
                        <Grid item xs={12}>
                          {user.id === item.userId ?
                          <ListItemText align="right" primary={item.message}></ListItemText> :
                          <ListItemText align="left" primary={item.message}></ListItemText> 
                          }
                        </Grid>
                        <Grid item xs={12}>
                          {user.id === item.userId ?
                              <ListItemText align="right" secondary={item.timeStamp}></ListItemText> :
                              <ListItemText align="left" primary={item.timeStamp}></ListItemText> 
                          }
                        </Grid>
                      </Grid>
                    </ListItem>
                  }
                  </>
                ))}
            </List>
            <Divider />
          <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
                <TextField 
                  label="Type Something" 
                  fullWidth 
                  onChange={(event) => setNewChat(event.target.value)} 
                />
            </Grid>
            <Grid item xs={1} align="right">
              <Button variant="contained" color="primary" onClick={sendChat}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}