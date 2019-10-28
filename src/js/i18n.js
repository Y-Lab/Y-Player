function i18n (lang) {
    this.lang = lang;
    this.tran = (text) => {
        if (tranTxt[this.lang] && tranTxt[this.lang][text]) {
            return tranTxt[this.lang][text];
        } else {
            return text;
        }
    };
}

// add translation text here
const tranTxt = {
    'zh-cn' : {
        'About author': '关于作者',
        'Y-Player feedback': 'Y-Player意见反馈',
        'About Y-Player': '关于Y-Player',
        'Video info': '视频统计信息',
        'Video load failed': '视频加载失败',
        'FF': '快进',
        'REW': '快退',
        's': '秒',
        'Volume': '音量',
        'Switching to': '正在切换至',
        'Switched to': '已经切换至',
        'quality': '画质',
        'Speed': '速度',
        'Normal': '正常',
        'Decrease speed': '减速',
        'Increase speed': '加速',
        'Default view': '默认视图',
        'Theater mode': '影院模式',
        'Full screen': '全屏',
        'Exit full screen': '退出全屏',
    }
};

export default i18n;
