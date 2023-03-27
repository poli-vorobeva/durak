import React from 'react';
import {ICard} from '../../../interfaces';
import actionStyles from './fieldComponents.module.css';
import {useSelector} from 'react-redux';
import {IGameData} from '../../../redux/store/store';
import {ActionCard} from './ActionCard';

export const Actions = ({onSelect}: {onSelect: (card: ICard) => void}) => {
  const cardsInAction = useSelector((state: IGameData) => state.gameData.actionCards);

  return (
    <div className={actionStyles.gamefield_actions}>
      {cardsInAction.map((action) => {
        return (
          <div className={actionStyles.gamefield_action_slot}>
            <ActionCard
              clickHandler={() => {
                onSelect(action.attack);
              }}
              value={action.attack.value}
              action={'attack'}
              suit={action.attack.suit}
            />
            {action.defend && (
              <ActionCard value={action.defend.value} action={'defend'} suit={action.defend.suit} />
            )}
          </div>
        );
      })}
    </div>
  );
};
