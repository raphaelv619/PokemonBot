import axios from 'axios';
import imageToBase64 from 'image-to-base64';
import Discord from 'discord.js';
import alert from 'alert';
import { apiPost, chatId, pokeBotId, ourDiscordBotToken, headers, twoCaptchaKey, typingApi } from './config.js';
const client = new Discord.Client();

let intervalRef = null;
let pbCount = 0;
let gbCount = 0;
let ubCount = 0;
let mbCount = 0;
// let prbCount = 0;
let foundCaptcha = false;
let solveCaptchaAgain = true;
let captchaUrl = null;

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
    if (pbCount >= 10) {
        setTimeout(() => {
            buyPokeball(1, 10);
            pbCount = 0;
        }, 4000);
    }
    if (gbCount >= 10) {
        setTimeout(() => {
            buyPokeball(2, 10);
            gbCount = 0;
        }, 4000);
    }
    if (ubCount >= 3) {
        setTimeout(() => {
            buyPokeball(3, 3);
            ubCount = 0;
        }, 4000);
    }
}

const buyPokeball = (pokeballId, quantity) => {
    return new Promise((resolve, _reject) => {
        axios.post(apiPost, { content: `;shop buy ${pokeballId} ${quantity}` }, { headers }).then(res => {
            resolve(res);
        }).catch((err) => {
            console.log('ERR?', err);
        })
    });
};

const getPokeballType = (text) => {
    if (text.search('Common') !== -1 || text.search('Uncommon') !== -1) {
        pbCount ++;
        return 'pb';
    } else if (text.search('Rare') !== -1 && text.search('Super') === -1) {
        gbCount ++;
        return 'gb';
    } else if (text.search('Super Rare') !== -1) {
        ubCount ++;
        return 'ub';
    } else if (text.search('Legendary') !== -1 || text.search('Shiny') !== -1) {
        if (mbCount < 3) {
          mbCount ++;
          return 'mb'
        } else {
          ubCount ++;
          return 'ub';
        }
    }
}

const sendCaptchaRes = (solvedCaptcha) => {
    return new Promise((resolve, _reject) => {
        axios.post(apiPost, { content: solvedCaptcha }, { headers }).then(res => {
            resolve(res);
            solveCaptchaAgain = true;
            setTimeout(() => {
                if (solveCaptchaAgain) {
                    solveCaptcha(captchaUrl);
                }
            }, 5000);
        });
    });
}

const solveCaptcha = (uri) => {
    alert('Resolve captcha!');
    imageToBase64(uri) // Image URL
    .then(
        (response) => {
            axios.post('http://2captcha.com/in.php', { body: response, method: 'base64', key: `${twoCaptchaKey}`, json: 1, numeric: 1 }).then((resPost) => {
                setTimeout(() => {
                    axios.get(`http://2captcha.com/res.php?key=${twoCaptchaKey}&action=get&json=1&id=${resPost.data.request}`).then((resGet) => {
                        sendCaptchaRes(resGet.data.request);
                    }).catch((errGet) => {
                        console.log('ERR GET', errGet);
                    })
                }, 30000)
            }).catch((errPost) => {
                console.log('ERR POST', errPost);
            })
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )
}

const runWriteBot = () => {
    intervalRef = setInterval(() => {
        findPokemon();
    }, 12500);
};

const runReadBot = () => {
    client.on('message', msg => {
        if (msg.channel.id === chatId && msg.author.id === pokeBotId) {
            if (msg.content.search('captcha') !== -1 && foundCaptcha) {
                solveCaptchaAgain = false;
                msg.attachments.map((item) => {
                    captchaUrl = item.url;
                    solveCaptcha(item.url);
                    msg.channel.send("Errou indiano maldito, tente dnv");
                })
            }
            if (msg.content.search('captcha') !== -1 && !foundCaptcha) {
                foundCaptcha = true;
                solveCaptchaAgain = false;
                clearInterval(intervalRef);
                msg.attachments.map((item) => {
                    captchaUrl = item.url;
                    solveCaptcha(item.url);
                })
                msg.channel.send("Resolvam indianos!!!");
                // alert('TEM CAPTCHA LA NO BOT SEU FDP');
                // stopCaptchaCount();
            }
            if (msg.content.search('catch') !== -1 && !foundCaptcha) {
                if (msg.embeds.length && msg.embeds[0].footer) {
                    const pokeballType = getPokeballType(msg.embeds[0].footer.text);
                    throwPokeball(pokeballType);
                }
                // setTimeout(() => {
                // }, 500);
            }
            if (msg.content.search('continue hunting!') !== -1 && foundCaptcha) {
                foundCaptcha = false;
                solveCaptchaAgain = false;
                msg.channel.send("Boaaaaa indiano");
                runWriteBot();
            }
        }
    });
    client.login(ourDiscordBotToken);
}

runWriteBot();
runReadBot();
