import '../css/index.scss';
import YPlayer from './player';

/* global Y_PLAYER_VERSION GIT_HASH */
console.log(`${'\n'} %c Y-Player v${Y_PLAYER_VERSION} ${GIT_HASH} %c https://player.y-english.org ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');

export default YPlayer;
