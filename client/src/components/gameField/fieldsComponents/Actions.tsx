import React from 'react';
import {ICard} from '../../../interfaces';
import actionStyles from './fieldComponents.module.css';
import {useSelector} from 'react-redux';
import {IGameData} from '../../../redux/store/store';

export const Actions = ({onSelect}: {onSelect: (card: ICard) => void}) => {
  console.log('actionsCard');
  const cardsInAction = useSelector((state: IGameData) => state.gameData.actionCards);

  return (
    <div className={actionStyles.gamefield_actions}>
      {cardsInAction.map((action) => {
        return (
          <div className={actionStyles.gamefield_action_slot}>
            <div
              onClick={() => {
                onSelect(action.attack);
              }}
              style={{
                backgroundPosition: `calc(-100% * ${action.attack.value - 1}) calc(-100% * ${
                  action.attack.suit
                })`,
              }}
              className={`${actionStyles.gamefield_card} ${actionStyles.gamefield_card_attack}`}
            />
            {action.defend && (
              <div
                className={`${actionStyles.gamefield_card} ${actionStyles.gamefield_card_defend}`}
                style={{
                  backgroundPosition: `calc(-100% * ${action.defend.value - 1}) calc(-100% * ${
                    action.defend.suit
                  })`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
