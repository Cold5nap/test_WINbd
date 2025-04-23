import { Config } from '@app/config';
import React, { createContext, useContext } from 'react';
import {io} from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = io(Config.socketUrl, {
    auth: {
      token: localStorage.getItem('token')
    }
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};