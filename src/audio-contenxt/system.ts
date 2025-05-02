export const unmutedSound = new Audio('/sounds/unmuted-sound.mp3');

export const sendMessageSound = new Audio('/sounds/send-message-sound.mp3');
sendMessageSound.volume = 0.2;

// export const receiveMessageSound = new Audio('/sounds/receive-message-sound.mp3');

export const sendStickerSound = new Audio('/sounds/send-sticker-sound.mp3');
sendStickerSound.volume = 0.2;

export const playSendMessageSound = () => {
  sendMessageSound.currentTime = 0;
  sendMessageSound.play();
};

export const playSendStickerSound = () => {
  sendStickerSound.currentTime = 0;
  sendStickerSound.play();
};

export const playUnmutedSound = () => {
  unmutedSound.currentTime = 0;
  unmutedSound.play();
};
