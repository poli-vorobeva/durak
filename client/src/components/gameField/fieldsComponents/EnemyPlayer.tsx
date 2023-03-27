import React, {useMemo} from 'react';
import {IPlayer} from '../../../interfaces';
import enemyStyles from './fieldComponents.module.css';
import {EnemyCard} from './EnemyCard';

export const EnemyPlayer = ({enemy}: {enemy: IPlayer}) => {
  const enemyName = useMemo(() => {
    return (
      <div className={enemyStyles.gamefield_enemy_info}>
        <div className={enemyStyles.gamefield_enemy_avatar}>Avatar</div>
        <div className={enemyStyles.gamefield_enemy_nick}>{enemy.user}</div>
      </div>
    );
  }, [enemy.user]);
  const enemyCards = useMemo(() => {
    return (
      <div className={enemyStyles.gamefield_enemy_hand}>
        {new Array(enemy.cardsCount).fill(0).map((_, index) => {
          return <EnemyCard idx={index} cardsCount={enemy.cardsCount} />;
        })}
      </div>
    );
  }, [enemy.cardsCount]);
  return (
    <div className={enemyStyles.gamefield_enemy}>
      {enemyName}
      {enemyCards}
    </div>
  );
};
