/**
 * Created by WL on 2019/1/12.
 * Description 挂载参数
 */
import Vue from 'vue';
import Message from './Message';

const messageBox = Vue.extend(Message);
Message.install = function (options) {
  if (options === undefined || options === null) {
    options = {
      message: ''
    };
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      message: options
    };
  }
  let instance = new messageBox({
    data: options
  }).$mount();

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.isVisible = true;
  });
};

export default Message;
