import React from 'react';
import {IPlayer} from '../../../interfaces';
import enemyStyles from './fieldComponents.module.css';

export const EnemyPlayer = ({enemy}: {enemy: IPlayer}) => {
  return (
    <div className={enemyStyles.gamefield_enemy}>
      <div className={enemyStyles.gamefield_enemy_info}>
        <div className={enemyStyles.gamefield_enemy_avatar}>EN</div>
        <div className={enemyStyles.gamefield_enemy_nick}>{enemy.user}</div>
      </div>
      <div className={enemyStyles.gamefield_enemy_hand}>
        {new Array(enemy.cardsCount).fill(0).map((_, index) => {
          return (
            <div className={enemyStyles.gamefield_enemy_hand_slot}>
              <div
                className={`${enemyStyles.gamefield_card} ${enemyStyles.gamefield_enemy_hand_card}`}
                style={{transform: `rotate(${(index - enemy.cardsCount / 2) * 10}deg)`}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
