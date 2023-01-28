import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import toggle from './toggleReducer';
import profile from './profileReducer';
import status from './statusReducer';
import homePosts from './postReducer';
import modal from './modalReducer';
import detailPost from './detailPostReducer';
import discover from './discoverReducer';
import suggestions from './suggestionsReducer';
import socket from './socketReducer';
import notify from './notifyReducer';
import message from './messageReducer';
import groupmessage from './groupReducer';
import online from './onlineReducer';
import call from './callReducer';
import peer from './peerReducer';
import eeu from './eeuReducer';

export default combineReducers({
  auth,
  eeu,
  alert,
  theme,
  toggle,
  profile,
  status,
  homePosts,
  modal,
  detailPost,
  discover,
  suggestions,
  socket,
  notify,
  message,
  groupmessage ,
  online,
  call,
  peer,
  
});
