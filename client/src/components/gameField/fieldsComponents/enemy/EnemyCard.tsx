import * as React from 'react';
import enemyStyles from './enemy.module.css';

export const EnemyCard = ({idx, cardsCount}: {idx: number; cardsCount: number}) => {
  return (
    <div className={enemyStyles.gamefield_enemy_hand_slot}>
      <div
        className={`${enemyStyles.gamefield_card} ${enemyStyles.gamefield_enemy_hand_card}`}
        style={{transform: `rotate(${(idx - cardsCount / 2) * 10}deg)`}}
      />
    </div>
  );
};
