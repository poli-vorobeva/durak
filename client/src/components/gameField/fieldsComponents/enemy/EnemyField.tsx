import {EnemyCard} from './EnemyCard';
import enemyStyles from './enemy.module.css';
import * as React from 'react';

export const EnemyHand = ({cardsCount}:{cardsCount:number}):JSX.Element=>{
  return(
    <div className={enemyStyles.gamefield_enemy_hand}>
      {new Array(cardsCount).fill(0).map((_, index) => {
        return <EnemyCard key={index} idx={index} cardsCount={cardsCount} />;
      })}
    </div>
  )
}