import React, {useState} from 'react';
import gameFieldStyles from './gameField.module.css';
import {Deck} from './fieldsComponents/Desk';
import {ICard, IGameStatus, IPlayer} from '../../interfaces';
import {MyCards} from './fieldsComponents/MyCards';
import {Actions} from './fieldsComponents/Actions';
import {EnemyPlayer} from './fieldsComponents/EnemyPlayer';
import {MyPlayer} from './fieldsComponents/MyPlayer';

interface IGameFieldProps {
  data: IGameStatus;
  onAction: (card: ICard, actionCard: ICard) => void;
  onTurn: () => void;
  onEpicFail: () => void;
}
export const GameField = ({data, onAction, onTurn, onEpicFail}: IGameFieldProps) => {
  const [selectedCard, setSelectedCard] = useState<ICard>(null);

  return (
    <div>
      <div className={gameFieldStyles.gamefield_top}>
        <Deck count={data.cardsCountInStack} trumpCard={data.trumpCard} />
        <div className={gameFieldStyles.gamefield_enemies}>
          {data.players.map((player) => {
            return <EnemyPlayer enemy={player} />;
          })}
        </div>
      </div>
      <Actions
        cardsInAction={data.actionCards}
        onSelect={(card) => {
          setSelectedCard(card);
        }}
      />
      <MyPlayer
        cards={data.playerCards}
        onAction={(card) => {
          onAction(card, selectedCard);
        }}
        onTurn={() => onTurn()}
        onEpicFail={() => onEpicFail()}
      />
    </div>
  );
};

/*export const MyControls = () => {
  return <div>

  </div>
}*/
