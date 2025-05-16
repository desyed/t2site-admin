import Pusher from 'pusher-js';

import { api } from './api';

if (import.meta.env.DEV) {
  Pusher.logToConsole = true;
}

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  channelAuthorization: {
    endpoint: '/pusher/auth',
    transport: 'ajax',
    customHandler: async ({ channelName, socketId }, callback) => {
      try {
        const response = await api.post('/pusher/auth', {
          channel_name: channelName,
          socket_id: socketId,
        });
        callback(null, response.data);
      } catch (error: any) {
        callback(
          {
            stack: error.stack,
            name: error.name,
            message: error.message,
          },
          null
        );
      }
    },
  },
});

export default pusher;
