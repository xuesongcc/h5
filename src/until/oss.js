import co from 'co';

const OSSConfig = {
    uploadHost: 'http://hbtdeal.oss-cn-hongkong.aliyuncs.com', //OSS上传地址
    type: 'scs',
    ossParams: {
        key: '', // key后面有用，先默认设空字符串
        region: 'oss-cn-hongkong',
        success_action_status: '200', // 默认200
        accessKeyId: 'LTAIU1SpPCvQMra7',
        accessKeySecret: 'YZhegrUotMgFQV0D6Vejsbyo9RUy1h',
        bucket: 'hbtdeal',
        dir: 'user-dir',
        host: 'http://hbtdeal.oss-cn-hongkong.aliyuncs.com',
    },
};

function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
    var maxPos = chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function uploadOSS(event, type) {
    return new Promise((resolve, reject) => {
        var client = new OSS({
            region: OSSConfig.ossParams.region,
            accessKeyId: OSSConfig.ossParams.accessKeyId,
            accessKeySecret: OSSConfig.ossParams.accessKeySecret,
            bucket: OSSConfig.ossParams.bucket,
        });
        var file;
        if (type == 0) {
            file = event;
        } else {
            file = event.target.files[0];
        }
        let randomName = `${random_string(6)}_${file.name}`;
        co(function* () {
            var result = yield client.multipartUpload(randomName, file);
            console.log(`${OSSConfig.uploadHost}/${result.name}`);
            resolve(`${OSSConfig.uploadHost}/${result.name}`);
        }).catch(function (err) {
            console.log(err);
            reject(err);
        });
    });
}

export {uploadOSS};
