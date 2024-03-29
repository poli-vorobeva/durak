import React from 'react';
import enemyStyles from './enemy.module.css';

export const EnemyInfo=({name}:{name:string}):JSX.Element=>{
  console.log("NMAinfo",name)
  return(
    <div className={enemyStyles.gamefield_enemy_info}>
      <div className={enemyStyles.gamefield_enemy_avatar}>Avatar</div>
      <div className={enemyStyles.gamefield_enemy_nick}>{name}</div>
    </div>
  )
}