import '../scss/index.scss';
import Player from './player';

/* global Y_PLAYER_VERSION GIT_HASH */
console.log(`${'\n'} %c Y-Player v${Y_PLAYER_VERSION} ${GIT_HASH} %c https://player.y-english.org ${'\n'}${'\n'}`, 'color: #54C8FF; background: #2185D0; padding:5px 0;', 'background: #54C8FF; padding:5px 0;');

export default Player;
