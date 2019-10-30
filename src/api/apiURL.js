/**
 * Created by WL on 2018/11/6.
 * Description url请求路径
 */
//Debug false 正式服务器 true 测试服务器
const DEBUG = false;
let Connect = {
  baseURL: '',//接口地址
  shareURL: '',//分享链接
};

if (DEBUG) {

  // Connect.baseURL = 'http://10.16.52.106:9001/api/';//过信誉
  // Connect.baseURL = 'http://192.168.2.152:9001/api/';//徐祥瑞
  Connect.baseURL = 'http://192.168.2.151:9001/api/';//dongchen
  // Connect.baseURL = 'http://192.168.2.121:9001/api/';//dong
  // Connect.baseURL = 'http://192.168.2.141:9001/api/';//wangrui
  // Connect.baseURL = 'http://192.168.2.122:9001/api/';//wangrui

  // Connect.baseURL = 'http://192.168.2.151:9001/api/app/';
  // Connect.baseURL = 'http://127.0.0.1:9000/api/app';
  // Connect.shareURL = 'http://192.168.2.129:8080/#/register?referrer=';
  Connect.shareURL = 'http://192.168.2.132:8080/#/register?popCode=';

} else {
  //正式服务器
  Connect.baseURL = 'http://www.ayy360.com:9001/api/';
  Connect.shareURL = 'http://www.ayy360.com/#/register?popCode=';
  //测试服务器
  // Connect.baseURL = 'http://fish.jinanluke.com:8111/app/';
  // Connect.shareURL = 'http://fish.jinanluke.com:8848/#/register?referrer=';
}

export {Connect};
