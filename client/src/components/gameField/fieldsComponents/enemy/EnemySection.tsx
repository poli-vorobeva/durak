import * as React from 'react';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../../../../redux/store/store';
import enemyStyles from './enemy.module.css';
import {EnemyPlayer} from './EnemyPlayer';

export const EnemySection = ():JSX.Element => {
  const currentUser = useSelector((state: ISocketData) => state.socketData.currentUser);
  const enemies = useSelector((state: IGameData) => state.gameData.players);
  return (
    <div className={enemyStyles.gamefield_enemies}>
      {enemies.map((enemy,indx) => {
        return enemy.user !== currentUser.userName && <EnemyPlayer key={enemy.user+indx} enemy={enemy} />;
      })}
    </div>
  );
};
