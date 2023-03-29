import React, {useMemo} from 'react';
import {IPlayer} from '../../../../interfaces';
import enemyStyles from './enemy.module.css';
import {EnemyInfo} from './EnemyInfo';
import {EnemyHand} from './EnemyField';

export const EnemyPlayer = ({enemy}: {enemy: IPlayer}) => {
  const enemyInfo = useMemo(() => <EnemyInfo name={enemy.user}/>, [enemy.user]);
  const enemyHand = useMemo(() => <EnemyHand cardsCount={enemy.cardsCount}/>, [enemy.cardsCount]);
  return (
    <div className={enemyStyles.gamefield_enemy}>
      {enemyInfo}
      {enemyHand}
    </div>
  );
};
