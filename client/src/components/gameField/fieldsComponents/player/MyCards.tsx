import React from 'react';
import { ICard } from '../../../../interfaces';
import deskStyles from '../fieldComponents.module.css';
import { MyPlayerCard } from './MyPlayerCard';

interface IMyCardsProps {
  cards: Array<ICard>;
  onSelect: (card: ICard) => void;
}

export const MyCards = ({
                          cards, onSelect,
                        }: IMyCardsProps): JSX.Element => {
  return (
    <div className={deskStyles.gamefield_hand}>
      {cards.map((card, index) => {
        return <MyPlayerCard index={index} cardsLength={cards.length} card={card} onSelect={onSelect}/>;
      })}
    </div>
  );
};
