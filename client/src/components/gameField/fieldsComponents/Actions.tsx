import React from 'react';
import {ICard} from '../../../interfaces';
import actionStyles from './fieldComponents.module.css';

export const Actions = ({
  cardsInAction,
  onSelect,
}: {
  cardsInAction: Array<{attack: ICard; defend: ICard}>;
  onSelect: (card: ICard) => void;
}) => {
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
            ></div>
            {action.defend && (
              <div
                className={`${actionStyles.gamefield_card} ${actionStyles.gamefield_card_defend}`}
                style={{
                  backgroundPosition: `calc(-100% * ${action.defend.value - 1}) calc(-100% * ${
                    action.defend.suit
                  })`,
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
