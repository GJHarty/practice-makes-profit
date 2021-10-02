import { Button, Fab, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';

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

export default function ChatDisplay() {

  const store = useSelector((store) => store);
  const classes = useStyles();
  const [newChat, setNewChat] = useState('');

  const sendChat = () => {
    console.log('newChat', newChat);
    axios.post('/api/chat', {
        newChat
      }).then(response => {

      }).catch(err => {
        console.error('Error posting new message', err);
      })
  }

 
  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
            <Typography className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container style={{padding: '20px'}}>
        <Grid item xs={11}>
            <TextField 
              label="Type Something" 
              fullWidth 
              onChange={(event) => setNewChat(event.target.value)} 
            />
        </Grid>
        <Grid item xs={1} align="right">
          {newChat}
          <Button variant="contained" color="primary" onClick={sendChat}>
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}