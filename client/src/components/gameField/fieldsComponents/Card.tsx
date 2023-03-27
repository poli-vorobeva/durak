import deskStyles from './fieldComponents.module.css';
import {useSelector} from 'react-redux';
import {IGameData} from '../../../redux/store/store';
import React from 'react';

export const Card = ({isDeskTrump}: {isDeskTrump: boolean}) => {
  const trumpClass = isDeskTrump
    ? `${deskStyles.gamefield_card_trump}`
    : `${deskStyles.gamefield_card_closed}`;

  const className = `${deskStyles.gamefield_card} ` + trumpClass;
  const trumpCard = useSelector((state: IGameData) => state.gameData.trumpCard);
  const cardStyles = isDeskTrump
    ? {
        backgroundPosition: `calc(-100% * ${trumpCard.value - 1}) calc(-100% * ${trumpCard.suit})`,
      }
    : {};
  return <div className={className} style={cardStyles} />;
};
