class Setting {
    constructor (player) {
        this.player = player;

        this.player.template.mask.addEventListener('click', () => {
            this.hide();
        });
        this.player.template.settingButton.addEventListener('click', () => {
            this.show();
        });

        // speed
        this.player.template.speed.addEventListener('click', () => {
            this.player.template.settingBox.classList.add('y-player-setting-box-narrow');
            this.player.template.settingBox.classList.add('y-player-setting-box-speed');
        });
        for (let i = 0; i < this.player.template.speedItem.length; i++) {
            this.player.template.speedItem[i].addEventListener('click', () => {
                this.player.speed(this.player.template.speedItem[i].dataset.speed);
                this.hide();
            });
        }
    }

    hide () {
        this.player.template.settingBox.classList.remove('y-player-setting-box-open');
        this.player.template.mask.classList.remove('y-player-mask-show');
        setTimeout(() => {
            this.player.template.settingBox.classList.remove('y-player-setting-box-narrow');
            this.player.template.settingBox.classList.remove('y-player-setting-box-speed');
        }, 300);

        this.player.controller.disableAutoHide = false;
    }

    show () {
        this.player.template.settingBox.classList.add('y-player-setting-box-open');
        this.player.template.mask.classList.add('y-player-mask-show');

        this.player.controller.disableAutoHide = true;
    }
}

export default Setting;
