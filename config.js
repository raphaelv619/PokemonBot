const chatId = '824008083487457342';
const apiPost = `https://discord.com/api/v8/channels/${chatId}/messages`;
const typingApi = `https://discord.com/api/v8/channels/${chatId}/typing`;
const headers = {
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'pt-BR',
    'content-type': 'application/json',
    authorization: 'NDEzMjk3MjMyOTYwNTUyOTYw.YFyN3Q.HH0kruBtBScEF5kcz7gKgDd4fKQ',
    'cookie': '__cfduid=de0e885576a7a30ae7ff46bf34b4d55181616437070; locale=pt-BR',
    'origin': 'https://discord.com',
    'referer': `https://discord.com/channels/689624343138795532/${chatId}`,
    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
    'x-super-properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg5LjAuNDM4OS45MCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiODkuMC40Mzg5LjkwIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL3d3dy5nb29nbGUuY29tLyIsInJlZmVycmluZ19kb21haW4iOiJ3d3cuZ29vZ2xlLmNvbSIsInNlYXJjaF9lbmdpbmUiOiJnb29nbGUiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6ODAzMTQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9'
    
};
const pokeBotId = '664508672713424926';
const ourDiscordBotToken = 'ODI0Mzc4MTY0NDY0NTgyNjY2.YFuf_g.6haanJSgcU8H7hWqJlsKtxPsxgA';

export { apiPost, chatId, pokeBotId, ourDiscordBotToken, typingApi, headers };