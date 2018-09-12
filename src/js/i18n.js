/*
W3C def language codes is:
    language-code = primary-code ( "-" subcode )
        primary-code    ISO 639-1   ( the names of language with 2 code )
        subcode         ISO 3166    ( the names of countries )

NOTE: use lowercase to prevent case typo from user!
Use this as shown below.....
*/

function i18n (lang) {
    this.lang = lang;
    this.tran = (text) => {
        if (tranTxt[this.lang] && tranTxt[this.lang][text]) {
            return tranTxt[this.lang][text];
        }
        else {
            return text;
        }
    };
}

// add translation text here
const tranTxt = {
    'zh-cn' : {
        'Top': '顶部',
        'Bottom': '底部',
        'Rolling': '滚动',
        'About author': '关于作者',
        'Y-Player feedback': 'Y-Player意见反馈',
        'About Y-Player': '关于Y-Player',
        'Speed': '速度',
        'Normal': '正常',
        'Video load failed': '视频加载失败',
        'Switching to': '正在切换至',
        'Switched to': '已经切换至',
        'quality': '画质',
        'FF': '快进',
        'REW': '快退',
        'Setting': '设置',
        'Full screen': '全屏',
        'Web full screen': '页面全屏',
        'Send': '发送',
        's': '秒',
        'Volume': '音量',
        'Video info': '视频统计信息',
    }
};

export default i18n;
