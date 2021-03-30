const _chats = {
  mattlm_spam: { Id: 824008153023643688, Name: 'mattlm_spam' },
};

export const chat = {
  getChatId: ({ chatName }) => {
    if (_chats[chatName]) {
      return _chats[chatName];
    }
  }
};
