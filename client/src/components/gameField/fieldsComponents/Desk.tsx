import React from 'react';
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
          <div key={index} className={deskStyles.gamefield_deck_slot}>
           <Card isDeskTrump={!(index !== count - 1)} />
          </div>
        );
      })}
    </div>
  );
};
