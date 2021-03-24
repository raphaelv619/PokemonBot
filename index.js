import axios from 'axios';
import { apiPost, apiGet, headers } from './config.js';

let intervalRef = null;
let pbCount = 0;
let gbCount = 0;
let ubCount = 0;
let mbCount = 0;
let prbCount = 0;
let findedPokesCount = 0;

const findPokemon = () => {
    return new Promise((resolve, reject) => {
        axios.post(apiPost, { content: ";p" }, { headers }).then((res) => {
            findedPokesCount++;
            if (findedPokesCount === 10) {
                resetBot();
            }
            resolve(res);
        })
    });
};

const throwPokeball = () => {
    return new Promise((resolve, reject) => {
        axios.post(apiPost, { content: "pb" }, { headers }).then(res => {
            pbCount++;
            if (pbCount === 20) {
                setTimeout(() => {
                    buyPokeball();
                }, 4000);
            }
            resolve(res);
        })
    });
};

const verifyCaptcha = () => {
    return new Promise((resolve, reject) => {
        axios.get(apiGet, { headers }).then((res) => {
            console.log('RESSSSS', res.data);
        })
    });
}

const buyPokeball = () => {
    return new Promise((resolve, reject) => {
        axios.post(apiPost, { content: ";shop buy 1 20" }, { headers }).then(res => {
            pbCount = 0;
            resolve(res);
        })
    });
}

const resetBot = () => {
    findedPokesCount = 0;
    clearInterval(intervalRef);
    setTimeout(() => {
        init();
    }, 120000);
}

const init = () => {
    intervalRef = setInterval(() => {
        findPokemon().then((p) => {
            // verifyCaptcha();
            setTimeout(() => {
                throwPokeball();
            }, 4000)
        })
    }, 45000);
};

init();