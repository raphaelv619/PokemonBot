import axios from 'axios';
// import imageToBase64 from 'image-to-base64';
import Discord from 'discord.js';
import alert from 'alert';
import { apiPost, chatId, pokeBotId, ourDiscordBotToken, headers, typingApi } from './config.js';
const client = new Discord.Client();

let intervalRef = null;
let pbCount = 0;
// let gbCount = 0;
let ubCount = 0;
// let mbCount = 0;
// let prbCount = 0;
let foundCaptcha = false;

const findPokemon = () => {
    return new Promise((resolve, reject) => {
        tellDiscYreTyping().then(() => {
            axios.post(apiPost, { content: ";p" }, { headers }).then((res) => {
                resolve(res);
            })
        })
    });
};

const throwPokeball = (pokeballType) => {
    return new Promise((resolve, _reject) => {
        tellDiscYreTyping().then(() => {
            axios.post(apiPost, { content: pokeballType }, { headers }).then(res => {
                shouldBuyPokeball();
                resolve(res);
            })
        })
    });
};

const tellDiscYreTyping = () => {
    return new Promise((resolve, reject) => {
        axios.post(typingApi, {}, { headers }).then((res) => {
            resolve(res);
        })
    });
};

const stopCaptchaCount = () => {
    return new Promise((resolve, _reject) => {
        axios.post(apiPost, { content: "stop captcha count" }, { headers }).then(res => {
            resolve(res);
        })
    });
};

const shouldBuyPokeball = () => {
    if (pbCount === 20) {
        setTimeout(() => {
            buyPokeball(1, 20);
            pbCount = 0;
        }, 4000);
    }
    if (ubCount === 5) {
        setTimeout(() => {
            buyPokeball(3, 3);
            ubCount = 0;
        }, 4000);
    }
}

const buyPokeball = (pokeballId, quantity) => {
    return new Promise((resolve, _reject) => {
        tellDiscYreTyping(() => {
            axios.post(apiPost, { content: `;shop buy ${pokeballId} ${quantity}` }, { headers }).then(res => {
                resolve(res);
            })
        })
    });
};

const getPokeballType = (text) => {
    if (text.search('Common') !== -1 || text.search('Uncommon') !== -1) {
        pbCount ++;
        return 'pb';
    } else if (text.search('Rare') !== -1 && text.search('Super') === -1) {
        pbCount ++;
        return 'pb';
    } else if (text.search('Super Rare') !== -1) {
        ubCount ++;
        return 'ub';
    } else if (text.search('Legendary') !== -1 || text.search('Shiny') !== -1) {
        ubCount ++;
        return 'ub';
    }
}

const runWriteBot = () => {
    intervalRef = setInterval(() => {
        findPokemon();
    }, 12500);
};

const runReadBot = () => {
    client.on('message', msg => {
        if (msg.channel.id === chatId && msg.author.id === pokeBotId) {
            if (msg.content.search('captcha') !== -1 && !foundCaptcha) {
                foundCaptcha = true;
                clearInterval(intervalRef);
                msg.channel.send("Olha só, temos um captcha aki, tchaom.");
                alert('TEM CAPTCHA LA NO BOT SEU FDP');
                stopCaptchaCount();
            }
            if (msg.content.search('catch') !== -1 && !foundCaptcha) {
                const pokeballType = getPokeballType(msg.embeds[0].footer.text);
                throwPokeball(pokeballType);
            }
        }
    });
    client.login(ourDiscordBotToken);
}

runWriteBot();
runReadBot();
