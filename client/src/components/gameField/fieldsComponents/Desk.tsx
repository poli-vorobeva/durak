import React from 'react';
import gameFieldStyles from './fieldComponents.module.css';
import {ICard} from '../../../interfaces';

export const Deck = ({count, trumpCard}: {count: number; trumpCard: ICard}) => {
  return (
    <div className={gameFieldStyles.gamefield_deck}>
      {new Array(count).fill(0).map((_, index) => {
        return (
          <div className={gameFieldStyles.gamefield_deck_slot}>
            {index !== count - 1 ? (
              <div
                className={`${gameFieldStyles.gamefield_card} ${gameFieldStyles.gamefield_card_closed}`}
              >
                {' '}
              </div>
            ) : (
              <div
                className={`${gameFieldStyles.gamefield_card} ${gameFieldStyles.gamefield_card_trump}`}
                style={{
                  backgroundPosition: `calc(-100% * ${trumpCard.value - 1}) calc(-100% * ${
                    trumpCard.suit
                  })`,
                }}
              >
                {' '}
              </div>
            )}
          </div>
        );
      })}
    </div>
    // <div>
    //   <div>{count.toString()}</div>
    //   <div>{trumpCard.value.toString() + ' ' + trumpCard.suit.toString()}</div>
    // </div>
  );
};
