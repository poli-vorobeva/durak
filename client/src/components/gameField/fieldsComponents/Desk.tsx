import React, {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {IGameData} from '../../../redux/store/store';
import deskStyles from './fieldComponents.module.css';
import {Card} from './Card';
export const Deck = () => {
  const count = useSelector((state: IGameData) => state.gameData.cardsCountInStack);

  return (
    <div className={deskStyles.gamefield_deck}>
      {new Array(count).fill(0).map((_, index) => {
        return (
          <div className={deskStyles.gamefield_deck_slot}>
            {index !== count - 1 ? <Card isDeskTrump={false} /> : <Card isDeskTrump={true} />}
          </div>
        );
      })}
    </div>
  );

  // <div>
  //   <div>{count.toString()}</div>
  //   <div>{trumpCard.value.toString() + ' ' + trumpCard.suit.toString()}</div>
  // </div>
};
