import { chat } from "./chat";

const _accounts = {
  patolonha: {
    authorization: 'NDMyODYwMDA5MTc3Njc3ODM1.YDQ1Fg.s6VaZQI9yqZFuvi7ykF1DT00aUQ',
    chatId: chat.getChatId({ chatName: 'mattlm_spam' })
  },
  secondary: {
    authorization: 'NzU4MTA0MjkwNzQ4NzkyODMy.YFnIOQ.7Yy3Yl4FOk9mlZHGv0fSrTfZxBw',
    chatId: chat.getChatId({ chatName: 'mattlm_spam' })
  }
};

export const account = {
  getAccount: ({ accountName }) => {
    if (_accounts[accountName]) {
      return _accounts[accountName];
    }
  }
};
