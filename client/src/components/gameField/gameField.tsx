import React, {useMemo, useState} from 'react';
import gameFieldStyles from './gameField.module.css';
import {Deck} from './fieldsComponents/Desk';
import {ICard, IGameStatus, IPlayer} from '../../interfaces';
import {MyCards} from './fieldsComponents/MyCards';
import {Actions} from './fieldsComponents/Actions';
import {EnemyPlayer} from './fieldsComponents/EnemyPlayer';
import {MyPlayer} from './fieldsComponents/MyPlayer';
import {useSelector} from 'react-redux';
import {IGameData, ISocketData} from '../../redux/store/store';
import {EnemySection} from './fieldsComponents/EnemySection';

interface IGameFieldProps {
  onAction: (card: ICard, actionCard: ICard) => void;
  onTurn: () => void;
  onEpicFail: () => void;
}
export const GameField = ({onAction, onTurn, onEpicFail}: IGameFieldProps) => {
  const [selectedCard, setSelectedCard] = useState<ICard>(null);
  console.log('GAMEFILE----rrr');
  const count = useSelector((state: IGameData) => state.gameData.count);
  const memoDesk = useMemo(() => {
    return <Deck />;
  }, [count]);
  return (
    <div>
      <div className={gameFieldStyles.gamefield_top}>
        {memoDesk}
        <EnemySection />
      </div>
      <Actions
        onSelect={(card) => {
          setSelectedCard(card);
        }}
      />
      <MyPlayer
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
