import Promise from 'promise-polyfill';

import utils from './utils';
import handleOption from './options';
import i18n from './i18n';
import Template from './template';
import Icons from './icons';
import Events from './events';
import User from './user';
import Bar from './bar';
import Bezel from './bezel';
import FullScreen from './fullscreen';
import Controller from './controller';
import Timer from './timer';
import HotKey from './hotkey';
import ContextMenu from './contextmenu';
import InfoPanel from './info-panel';
import templateVideo from '../templates/video.art';

let index = 0;
const instances = [];

class Player {

    /**
     * Y-Player constructor function
     *
     * @param {Object} options - See README
     * @constructor
     */
    constructor (options) {
        this.options = handleOption({ preload: options.video.type === 'webtorrent' ? 'none' : 'metadata', ...options });

        if (this.options.video.quality) {
            this.qualityIndex = this.options.video.defaultQuality;
            this.quality = this.options.video.quality[this.options.video.defaultQuality];
        }
        this.tran = new i18n(this.options.lang).tran;
        this.events = new Events();
        this.user = new User(this);
        this.container = this.options.container;

        this.container.classList.add('y-player');
        if (utils.isMobile) {
            this.container.classList.add('y-player-mobile');
        }
        this.arrow = this.container.offsetWidth <= 500;
        if (this.arrow) {
            this.container.classList.add('y-player-arrow');
        }

        this.template = new Template({
            container: this.container,
            options: this.options,
            index: index,
            tran: this.tran,
        });

        this.video = this.template.video;

        this.bar = new Bar(this.template);

        this.bezel = new Bezel(this.template.bezel);

        this.fullScreen = new FullScreen(this);

        this.controller = new Controller(this);

        this.plugins = {};

        document.addEventListener('click', () => {
            this.focus = false;
        }, true);
        this.container.addEventListener('click', () => {
            this.focus = true;
        },true);

        this.paused = true;

        this.timer = new Timer(this);

        this.hotkey = new HotKey(this);

        this.contextmenu = new ContextMenu(this);

        this.initVideo(this.video, this.quality && this.quality.type || this.options.video.type);

        this.infoPanel = new InfoPanel(this);

        if (this.options.autoplay) {
            this.play();
        }

        index++;
        instances.push(this);
    }

    /**
     * Seek video
     */
    seek (time) {
        time = Math.max(time, 0);
        if (this.video.duration) {
            time = Math.min(time, this.video.duration);
        }
        if (this.video.currentTime < time) {
            this.notice(`${this.tran('FF')} ${(time - this.video.currentTime).toFixed(0)} ${this.tran('s')}`);
        } else if (this.video.currentTime > time) {
            this.notice(`${this.tran('REW')} ${(this.video.currentTime - time).toFixed(0)} ${this.tran('s')}`);
        }

        this.video.currentTime = time;

        this.bar.set('played', time / this.video.duration, 'width');
        this.template.ptime.innerHTML = utils.secondToTime(time);
    }

    /**
     * Play video
     */
    play () {
        this.paused = false;
        if (this.video.paused) {
            this.bezel.switch(Icons.play);
        }

        this.template.playButton.innerHTML = Icons.pause;

        const playedPromise = Promise.resolve(this.video.play());
        playedPromise.catch(() => {
            this.pause();
        }).then(() => {});
        this.timer.enable('loading');
        this.container.classList.remove('y-player-paused');
        this.container.classList.add('y-player-playing');
        if (this.options.mutex) {
            for (let i = 0; i < instances.length; i++) {
                if (this !== instances[i]) {
                    instances[i].pause();
                }
            }
        }
    }

    /**
     * Pause video
     */
    pause () {
        this.paused = true;
        this.container.classList.remove('y-player-loading');

        if (!this.video.paused) {
            this.bezel.switch(Icons.pause);
        }

        this.template.playButton.innerHTML = Icons.play;
        this.video.pause();
        this.timer.disable('loading');
        this.container.classList.remove('y-player-playing');
        this.container.classList.add('y-player-paused');
    }

    switchVolumeIcon () {
        if (this.volume() >= 0.95) {
            this.template.volumeIcon.innerHTML = Icons.volumeUp;
        } else if (this.volume() > 0) {
            this.template.volumeIcon.innerHTML = Icons.volumeDown;
        } else {
            this.template.volumeIcon.innerHTML = Icons.volumeOff;
        }
    }

    /**
     * Set volume
     */
    volume (percentage, nostorage, nonotice) {
        percentage = parseFloat(percentage);
        if (!isNaN(percentage)) {
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.bar.set('volume', percentage, 'width');
            const formatPercentage = `${(percentage * 100).toFixed(0)}%`;
            this.template.volumeBarWrapWrap.dataset.balloon = formatPercentage;
            if (!nostorage) {
                this.user.set('volume', percentage);
            }
            if (!nonotice) {
                this.notice(`${this.tran('Volume')} ${(percentage * 100).toFixed(0)}%`);
            }

            this.video.volume = percentage;
            if (this.video.muted) {
                this.video.muted = false;
            }
            this.switchVolumeIcon();
        }

        return this.video.volume;
    }

    /**
     * Toggle between play and pause
     */
    toggle () {
        if (this.video.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    /**
     * attach event
     */
    on (name, callback) {
        this.events.on(name, callback);
    }

    /**
     * Switch to a new video
     *
     * @param {Object} video - new video info
     */
    switchVideo (video) {
        this.pause();
        this.video.poster = video.pic ? video.pic : '';
        this.video.src = video.url;
        this.initMSE(this.video, video.type || 'auto');
    }

    initMSE (video, type) {
        this.type = type;
        if (this.options.video.customType && this.options.video.customType[type]) {
            if (Object.prototype.toString.call(this.options.video.customType[type]) === '[object Function]') {
                this.options.video.customType[type](this.video, this);
            } else {
                console.error(`Illegal video type: ${type}`);
            }
        } else {
            if (this.type === 'auto') {
                if (/m3u8(#|\?|$)/i.exec(video.src)) {
                    this.type = 'hls';
                } else if (/.flv(#|\?|$)/i.exec(video.src)) {
                    this.type = 'flv';
                } else if (/.mpd(#|\?|$)/i.exec(video.src)) {
                    this.type = 'dash';
                } else {
                    this.type = 'normal';
                }
            }

            if (this.type === 'hls' && (video.canPlayType('application/x-mpegURL') || video.canPlayType('application/vnd.apple.mpegURL'))) {
                this.type = 'normal';
            }

            switch (this.type) {
            // https://github.com/video-dev/hls.js
            case 'hls':
                if (window.Hls) {
                    if (window.Hls.isSupported()) {
                        const options = this.options.pluginOptions.hls;
                        const hls = new window.Hls(options);
                        this.plugins.hls = hls;
                        hls.loadSource(video.src);
                        hls.attachMedia(video);
                        this.events.on('destroy', () => {
                            hls.destroy();
                            delete this.plugins.hls;
                        });
                    } else {
                        this.notice('Error: HLS is not supported.');
                    }
                } else {
                    this.notice('Error: Cannot find HLS.');
                }
                break;

            // https://github.com/Bilibili/flv.js
            case 'flv':
                if (window.flvjs) {
                    if (window.flvjs.isSupported()) {
                        const options = Object.assign(this.options.pluginOptions.flvjs, {
                            type: 'flv',
                            url: video.src,
                        });
                        const flvPlayer = window.flvjs.createPlayer(options);
                        this.plugins.flvjs = flvPlayer;
                        flvPlayer.attachMediaElement(video);
                        flvPlayer.load();
                        this.events.on('destroy', () => {
                            flvPlayer.unload();
                            flvPlayer.detachMediaElement();
                            flvPlayer.destroy();
                            delete this.plugins.flvjs;
                        });
                    } else {
                        this.notice('Error: flvjs is not supported.');
                    }
                } else {
                    this.notice('Error: Cannot find flvjs.');
                }
                break;

            // https://github.com/Dash-Industry-Forum/dash.js
            case 'dash':
                if (window.dashjs) {
                    const dashjsPlayer = window.dashjs.MediaPlayer().create().initialize(video, video.src, false);
                    const options = this.options.pluginOptions.dash;
                    dashjsPlayer.updateSettings(options);
                    this.plugins.dash = dashjsPlayer;
                    this.events.on('destroy', () => {
                        window.dashjs.MediaPlayer().reset();
                        delete this.plugins.dash;
                    });
                } else {
                    this.notice('Error: Cannot find dashjs.');
                }
                break;

            // https://github.com/webtorrent/webtorrent
            case 'webtorrent':
                if (window.WebTorrent) {
                    if (window.WebTorrent.WEBRTC_SUPPORT) {
                        this.container.classList.add('dplayer-loading');
                        const options = this.options.pluginOptions.webtorrent;
                        const client = new window.WebTorrent(options);
                        this.plugins.webtorrent = client;
                        const torrentId = video.src;
                        video.src = '';
                        video.preload = 'metadata';
                        video.addEventListener('durationchange', () => this.container.classList.remove('dplayer-loading'), { once: true });
                        client.add(torrentId, (torrent) => {
                            const file = torrent.files.find((file) => file.name.endsWith('.mp4'));
                            file.renderTo(this.video, {
                                autoplay: this.options.autoplay,
                            });
                        });
                        this.events.on('destroy', () => {
                            client.remove(torrentId);
                            client.destroy();
                            delete this.plugins.webtorrent;
                        });
                    } else {
                        this.notice('Error: WebTorrent is not supported.');
                    }
                } else {
                    this.notice('Error: Cannot find WebTorrent.');
                }
                break;
            }
        }
    }

    initVideo (video, type) {
        this.initMSE(video, type);

        /**
         * video events
         */
        // show video time: the metadata has loaded or changed
        this.on('durationchange', () => {
            // compatibility: Android browsers will output 1 or Infinity at first
            if (video.duration !== 1 && video.duration !== Infinity) {
                this.template.dtime.innerHTML = utils.secondToTime(video.duration);
            }
        });

        // show video loaded bar: to inform interested parties of progress downloading the media
        this.on('progress', () => {
            const percentage = video.buffered.length ? video.buffered.end(video.buffered.length - 1) / video.duration : 0;
            this.bar.set('loaded', percentage, 'width');
        });

        // video download error: an error occurs
        this.on('error', () => {
            if (!this.video.error) {
                // not a video load error, may be caused by poster loading failure
                return;
            }
            this.tran && this.notice && this.type !== 'webtorrent' && this.notice(this.tran('Video load failed'), -1);
        });

        // video end
        this.on('ended', () => {
            this.bar.set('played', 1, 'width');
            this.pause();
        });

        this.on('play', () => {
            if (this.paused) {
                this.play();
            }
        });

        this.on('pause', () => {
            if (!this.paused) {
                this.pause();
            }
        });

        this.on('timeupdate', () => {
            this.bar.set('played', this.video.currentTime / this.video.duration, 'width');
            const currentTime = utils.secondToTime(this.video.currentTime);
            if (this.template.ptime.innerHTML !== currentTime) {
                this.template.ptime.innerHTML = currentTime;
            }
        });

        for (let i = 0; i < this.events.videoEvents.length; i++) {
            video.addEventListener(this.events.videoEvents[i], () => {
                this.events.trigger(this.events.videoEvents[i]);
            });
        }

        this.volume(this.user.get('volume'), true, true);
    }

    switchQuality (index) {
        index = typeof index === 'string' ? parseInt(index) : index;
        if (this.qualityIndex === index || this.switchingQuality) {
            return;
        } else {
            this.qualityIndex = index;
        }
        this.switchingQuality = true;
        this.quality = this.options.video.quality[index];
        this.template.qualityButton.innerHTML = this.quality.name;

        const paused = this.video.paused;
        this.video.pause();
        const videoHTML = templateVideo({
            current: false,
            pic: null,
            preload: 'auto',
            url: this.quality.url,
        });
        const videoEle = new DOMParser().parseFromString(videoHTML, 'text/html').body.firstChild;
        this.template.videoWrap.insertBefore(videoEle, this.template.videoWrap.getElementsByTagName('div')[0]);
        this.prevVideo = this.video;
        this.video = videoEle;
        this.initVideo(this.video, this.quality.type || this.options.video.type);
        this.seek(this.prevVideo.currentTime);
        this.notice(`${this.tran('Switching to')} ${this.quality.name} ${this.tran('quality')}`, -1);
        this.events.trigger('quality_start', this.quality);

        this.on('canplay', () => {
            if (this.prevVideo) {
                if (this.video.currentTime !== this.prevVideo.currentTime) {
                    this.seek(this.prevVideo.currentTime);
                    return;
                }
                this.template.videoWrap.removeChild(this.prevVideo);
                this.video.classList.add('y-player-video-current');
                if (!paused) {
                    this.video.play();
                }
                this.prevVideo = null;
                this.notice(`${this.tran('Switched to')} ${this.quality.name} ${this.tran('quality')}`);
                this.switchingQuality = false;

                this.events.trigger('quality_end');
            }
        });
    }

    notice (text, time = 2000, opacity = 0.8) {
        this.template.notice.innerHTML = text;
        this.template.notice.style.opacity = opacity;
        if (this.noticeTime) {
            clearTimeout(this.noticeTime);
        }
        this.events.trigger('notice_show', text);
        if (time > 0) {
            this.noticeTime = setTimeout(() => {
                this.template.notice.style.opacity = 0;
                this.events.trigger('notice_hide');
            }, time);
        }
    }

    resize () {
        if (this.controller.thumbnails) {
            this.controller.thumbnails.resize(160, this.video.videoHeight / this.video.videoWidth * 160, this.template.barWrap.offsetWidth);
        }
        this.events.trigger('resize');
    }

    speed (rate) {
        this.video.playbackRate = rate;
        const formatRate = `${Number(rate).toFixed(2)}&times;`;
        this.template.speedButton.innerHTML = formatRate;
        this.notice(`${this.tran('Speed')} ${formatRate}`);
    }

    destroy () {
        instances.splice(instances.indexOf(this), 1);
        this.pause();
        this.controller.destroy();
        this.timer.destroy();
        this.video.src = '';
        this.container.innerHTML = '';
        this.events.trigger('destroy');
    }

    static get version () {
        /* global Y_PLAYER_VERSION */
        return Y_PLAYER_VERSION;
    }
}

export default Player;
