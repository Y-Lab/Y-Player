import utils from './utils';

class User {
    constructor (player) {
        this.storageName = {
            volume: 'y-player-volume'
        };
        this.default = {
            volume: Object.prototype.hasOwnProperty.call(player.options, 'volume') ? player.options.volume : 0.5
        };
        this.data = {};

        this.init();
    }

    init () {
        for (const item in this.storageName) {
            const name = this.storageName[item];
            this.data[item] = parseFloat(utils.storage.get(name) || this.default[item]);
        }
    }

    get (key) {
        return this.data[key];
    }

    set (key, value) {
        this.data[key] = value;
        utils.storage.set(this.storageName[key], value);
    }
}

export default User;
