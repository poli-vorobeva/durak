import React, {useEffect, useMemo} from 'react';
import gameFieldStyles from './fieldComponents.module.css';
import {ICard} from '../../../interfaces';
import {useSelector} from 'react-redux';
import {IGameData} from '../../../redux/store/store';
import deskStyles from './fieldComponents.module.css';
export const Deck = () => {
  console.log('DESK');
  const count = useSelector((state: IGameData) => state.gameData.count);
  const trumpCard = useSelector((state: IGameData) => state.gameData.trumpCard);
  const memoDesk = useMemo(() => {
    return (
      <div className={deskStyles.gamefield_deck}>
        {new Array(count).fill(0).map((_, index) => {
          return (
            <div className={deskStyles.gamefield_deck_slot}>
              {index !== count - 1 ? (
                <div className={`${deskStyles.gamefield_card} ${deskStyles.gamefield_card_closed}`}>
                  {' '}
                </div>
              ) : (
                <div
                  className={`${deskStyles.gamefield_card} ${deskStyles.gamefield_card_trump}`}
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
    );
  }, [count]);
  return memoDesk;

  // <div>
  //   <div>{count.toString()}</div>
  //   <div>{trumpCard.value.toString() + ' ' + trumpCard.suit.toString()}</div>
  // </div>
};
