import {ICard} from '../../../interfaces';
import {MyCards} from './MyCards';
import * as React from 'react';
import myStyles from './fieldComponents.module.css';
import {useSelector} from 'react-redux';
import {IGameData} from '../../../redux/store/store';

export const MyPlayer = ({
  onAction,
  onTurn,
  onEpicFail,
}: {
  onAction: (card: ICard) => void;
  onTurn: () => void;
  onEpicFail: () => void;
}) => {
  const cards = useSelector((state: IGameData) => state.gameData.playerCards);
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
