import {ICard} from '../../../interfaces';
import {MyCards} from './MyCards';
import * as React from 'react';
import myStyles from './fieldComponents.module.css';

export const MyPlayer = ({
  cards,
  onAction,
  onTurn,
  onEpicFail,
}: {
  cards: Array<ICard>;
  onAction: (card: ICard) => void;
  onTurn: () => void;
  onEpicFail: () => void;
}) => {
  console.log(cards, '#$$');
  return (
    <div className={myStyles.gamefield_player}>
      <MyCards
        cards={cards}
        onSelect={(card) => {
          onAction(card);
        }}
      />
      <div>
        <button onClick={() => onTurn()}>Отбить</button>
        <button onClick={() => onEpicFail()}>Забрать</button>
      </div>
    </div>
  );
};
