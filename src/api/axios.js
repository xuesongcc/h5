/**
 * Created by WL on 2018/11/6.
 * Description axios封装
 */
import axios from 'axios';
import {Connect} from "./apiURL";
import {getToken, removeToken} from '@u/token';
import Message from '@c/BaseMessage/index';
import router from '../router';
import sha256 from 'js-sha256'

//axios全局配置
axios.defaults.baseURL = Connect.baseURL;//超时时间
axios.defaults.timeout = 60000 * 5;//默认地址

//http request 拦截
axios.interceptors.request.use(async config => {
    if (getToken()) {
        // config.headers.Authorization = getToken();
        config.headers.Authentication = getToken();

    }
    return config;
}, error => {
    return Promise.reject(error);
});

//http response 拦截
axios.interceptors.response.use(response => {
    return response;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求';
                break;
            case 401:
                removeToken();
                sessionStorage.clear();
                localStorage.clear();
                Message.install('未授权，请重新登录');
                router.push('/');
                err.message = '未授权，请重新登录';
                break;
            case 403:
                err.message = '拒绝访问';
                break;
            case 404:
                err.message = '请求错误,未找到该资源';
                break;
            case 405:
                err.message = '请求方法未允许';
                break;
            case 408:
                err.message = '请求超时';
                break;
            case 500:
                Message.install('服务器端出错');
                err.message = '服务器端出错';
                break;
            case 501:
                err.message = '网络未实现';
                break;
            case 502:
                err.message = '网络错误';
                break;
            case 503:
                err.message = '服务不可用';
                break;
            case 504:
                err.message = '网络超时';
                break;
            case 505:
                err.message = 'http版本不支持该请求';
                break;
            default:
                err.message = `连接错误${err.response.status}`;
        }
    } else {
        err.message = "连接到服务器失败";
    }
    return Promise.resolve(err.response);
});

/**
 * get传参请求
 * @param url [String] 请求路径
 * @param params [Object] 请求参数
 * @returns {Promise<any>}
 */
let fetch = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
};

/**
 * get请求
 * @param url [String] 请求路径
 * @returns {Promise<any>}
 */
let get = (url) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    };
    return new Promise((resolve, reject) => {
        axios.get(url, config).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
};


/**
 * @Description: 定义 header timestamp 参数
 * @author 李雪松
 * @date 2019/4/7
 */
function getTimerTamo() {
    return (new Date()).getTime();
}

/**
 * @Description: sign加密
 * @author 李雪松
 * @date 2019/4/7
 */
function getSingStr(data, url) {
    let singP = {}
    let params = data
    let aa = []
    for (let pp in params) {
        aa.push(pp)
    }
    aa.sort()

    let aaaa = `/app/${url}`
    for (let i = 0; i < aa.length; i++) {
        aaaa += `${aa[i]}=${params[aa[i]]}&`
    }
    if (aaaa.length > 0 && params != undefined) {
        aaaa = aaaa.substr(0, aaaa.length - 1);
    }

    aaaa += getTimerTamo();
    singP.sign = aaaa;
    // console.log('签名之前内容',singP.sign)
    return singP
}

/**
 * FormDate Post 请求
 * @param url [String] 请求路径
 * @param data [Object] 请求参数
 * @returns {Promise<any>}
 */
let FDPost = (url, data) => {
    return new Promise((resolve, reject) => {
        let header={
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
            let cc,timestamp,sign;
            cc = getSingStr(data, url).sign
            timestamp =  cc.substring(cc.length - 13)
            sign = sha256(cc)
            header.timestamp = timestamp
            header.sign = sign
        axios({
            method: 'POST',
            url,
            headers: header,
            data,
            transformRequest: [function (data) {
                let arr = [];
                for (let param in data) {
                    arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]))
                }
                return arr.join('&');
            }],
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
};

/**
 * JSON post 请求
 * @param url [String] 请求路径
 * @param data [Object] 请求参数
 * @returns {Promise<any>}
 * @constructor
 */
let JSONPost = (url, data) => {
    let header={
        'Content-Type': 'application/json;charset=UTF-8',
    }
        let cc,timestamp,sign;
        cc = getSingStr(data, url).sign
        timestamp =  cc.substring(cc.length - 13)
        sign = sha256(cc)
        header.timestamp = timestamp
        header.sign = sign
    let config = {
        headers: header
    };
    return new Promise((resolve, reject) => {
        axios.post(url, data, config).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
};

export {fetch, get, FDPost, JSONPost};
