/**
 * Created by WL on 2019/3/4.
 * Description 导航栏
 */
//首页
import home from './home.png'
import homeS from './homeSelect.png'
//旅游金
import fish from './travelGold.png'
import fishS from './travelGoldSelect.png'
//商城
import mall from './mall.png'
import mallS from './mall-s.png'
//团队

//我的
import my from './my.png'
import myS from './mySelect.png'

const titles = [
  {
    id: 0,
    name: '首页',
    icon: home,
    select: homeS,
    path: '/main',
  }, {
    id: 1,
    name: '旅游卡',
    icon: fish,
    select: fishS,
    path: '/travelGold',

  }, {
    id: 2,
    name: '商城',
    icon: mall,
    select: mallS,
    path: '/mainMall',
  }, {
    id: 3,
    name: '我的',
    icon: my,
    select: myS,
    path: '/mycenter',
  }
];

export default titles;
