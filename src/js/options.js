/* global Y_PLAYER_VERSION */

export default (options) => {
    // default options
    const defaultOption = {
        container: options.element || document.getElementsByClassName('y-player')[0],
        autoplay: false,
        theme: {
            bar: '#F00',
            volume: '#FFF',
        },
        lang: (navigator.language || navigator.browserLanguage).toLowerCase(),
        hotkey: true,
        preload: 'metadata',
        volume: 0.5,
        video: {},
        contextmenu: [],
        mutex: true,
        pluginOptions: {
            hls: {},
            flv: {},
            dash: {},
            webtorrent: {}
        }
    };
    for (const defaultKey in defaultOption) {
        if (Object.prototype.hasOwnProperty.call(defaultOption, defaultKey) && !Object.prototype.hasOwnProperty.call(options, defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }
    if (options.video) {
        !options.video.type && (options.video.type = 'auto');
    }

    if (options.video.quality) {
        options.video.url = options.video.quality[options.video.defaultQuality].url;
    }

    if (options.lang) {
        options.lang = options.lang.toLowerCase();
    }

    options.contextmenu = options.contextmenu.concat([
        {
            text: 'Video info',
            click: (player) => {
                player.infoPanel.trigger();
            }
        },
        {
            text: 'About author',
            link: 'https://lab.y-english.org'
        },
        {
            text: `Y-Player v${Y_PLAYER_VERSION}`,
            link: 'https://github.com/Y-Lab/Y-Player'
        }
    ]);

    return options;
};
