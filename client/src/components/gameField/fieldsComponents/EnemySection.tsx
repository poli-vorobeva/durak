import {EnemyPlayer} from './EnemyPlayer';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../../../redux/store/store';

import enemyStyles from './fieldComponents.module.css';

export const EnemySection = () => {
  const currentUser = useSelector((state: ISocketData) => state.socketData.currentUser);

  const enemies = useSelector((state: IGameData) => state.gameData.gameStatus.players);
  return (
    <div className={enemyStyles.gamefield_enemies}>
      {enemies.map((enemy) => {
        return enemy.user !== currentUser.userName && <EnemyPlayer enemy={enemy} />;
      })}
    </div>
  );
};
