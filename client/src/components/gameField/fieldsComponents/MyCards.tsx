import React from 'react';
import {ICard} from '../../../interfaces';
import deskStyles from './fieldComponents.module.css';

export const MyCards = ({
  cards,
  onSelect,
}: {
  cards: Array<ICard>;
  onSelect: (card: ICard) => void;
}) => {
  return (
    <div className={deskStyles.gamefield_hand}>
      {cards.map((card, index) => {
        return (
          <div key={index} className={deskStyles.gamefield_hand_slot}>
            <div
              className={deskStyles.gamefield_card}
              style={{
                backgroundPosition: `calc(-100% * ${card.value - 1}) calc(-100% * ${card.suit})`,
                transform: `rotate(${(index - cards.length / 2) * 15}deg)`,
              }}
              onClick={() => onSelect(card)}
            />
          </div>
        );
      })}
    </div>
  );
};
