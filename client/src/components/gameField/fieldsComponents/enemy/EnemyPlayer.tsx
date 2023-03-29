import React, {useMemo} from 'react';
import {IPlayer} from '../../../../interfaces';
import enemyStyles from './enemy.module.css';
import {EnemyInfo} from './EnemyInfo';
import {EnemyHand} from './EnemyField';

export const EnemyPlayer = ({enemy}: {enemy: IPlayer}):JSX.Element => {
  const enemyInfo = useMemo<JSX.Element>(() => <EnemyInfo name={enemy.user}/>, [enemy.user]);
  const enemyHand = useMemo<JSX.Element>(() => <EnemyHand cardsCount={enemy.cardsCount}/>, [enemy.cardsCount]);
  return (
    <div className={enemyStyles.gamefield_enemy}>
      {enemyInfo}
      {enemyHand}
    </div>
  );
};
