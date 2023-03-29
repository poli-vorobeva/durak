import deskStyles from '../fieldComponents.module.css';
import * as React from 'react';
import { ICard } from '../../../../interfaces';

interface IMyCardProps {
  index: number,
  cardsLength: number,
  card: ICard,
  onSelect: (card: ICard) => void
}

export const MyPlayerCard = ({ index, card, cardsLength, onSelect }: IMyCardProps): JSX.Element => {
  const cardStyle = {
    backgroundPosition: `calc(-100% * ${card.value - 1}) calc(-100% * ${card.suit})`,
    transform: `rotate(${(index - cardsLength / 2) * 15}deg)`,
  };
  return (
    <div className={deskStyles.gamefield_hand_slot}>
      <div
        className={deskStyles.gamefield_card}
        style={cardStyle}
        onClick={() => onSelect(card)}
      />
    </div>
  );
};