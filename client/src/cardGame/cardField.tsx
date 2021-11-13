import React, {FC, useEffect, useState} from 'react';
import {ICard, IGameStatus, IPlayer} from '../interfaces';
import gameFieldStyles from './gameField.css'

export const GameField = ({
                            data,
                            onAction,
                            onTurn,
                            onEpicFail,
                          }: {
  data: IGameStatus;
  onAction: (card: ICard, actionCard: ICard) => void;
  onTurn: () => void;
  onEpicFail: () => void;
}) => {
  const [selectedCard, setSelectedCard] = useState<ICard>(null);

  return (
    <div>
      <div className={gameFieldStyles.gamefield_top}>
        <Deck count={data.cardsCountInStack} trumpCard={data.trumpCard}/>
        <div className={gameFieldStyles.gamefield_enemies}>
          {
            data.players.map(player=>{
              return <EnemyPlayer enemy={player}/>
            })
          }

        </div>
      </div>
      <Actions
        cardsInAction={data.actionCards}
        onSelect={(card) => {
          setSelectedCard(card)
        }}
      />
      <MyPlayer
        cards={data.playerCards}
        onAction={(card) => {
          onAction(card, selectedCard)
        }}
        onTurn={() => onTurn()}
        onEpicFail={() => onEpicFail()}
      />
    </div>
  );
};

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
  return (
    <div className={gameFieldStyles.gamefield_player}>
      <MyCards cards={cards} onSelect={(card) => {
        onAction(card)
      }}/>
      <div>
        <button onClick={() => onTurn()}>Отбить</button>
        <button onClick={() => onEpicFail()}>Забрать</button>
      </div>
    </div>
  );
};

export const MyCards = ({
                          cards,
                          onSelect,
                        }: {
  cards: Array<ICard>;
  onSelect: (card: ICard) => void;
}) => {
  return (
    <div className={gameFieldStyles.gamefield_hand}>
      {
        cards.map((card, index) => {
          return (
            <div className={gameFieldStyles.gamefield_hand_slot}>
              <div className={gameFieldStyles.gamefield_card}
                   style={{
                     backgroundPosition: `calc(-100% * ${card.value - 1}) calc(-100% * ${card.suit})`,
                     transform: `rotate(${(index - cards.length / 2) * 15}deg)`
                   }}
                   onClick={() => onSelect(card)}>

              </div>
            </div>
          )
        })
      }
    </div>
  );
};

/*export const MyControls = () => {
  return <div>

  </div>
}*/

export const EnemyPlayer = ({enemy}:{enemy:IPlayer}) => {
  return (
    <div className= {gameFieldStyles.gamefield_enemy}>
      <div className={gameFieldStyles.gamefield_enemy_info}>
        <div className={gameFieldStyles.gamefield_enemy_avatar}>
          EN
        </div>
        <div className={gameFieldStyles.gamefield_enemy_nick}>
          {
            enemy.user
          }
        </div>
      </div>
      <div className={gameFieldStyles.gamefield_enemy_hand}>
        {
          new Array(enemy.cardsCount).fill(0).map((_,index)=>{
            return(
              <div className={gameFieldStyles.gamefield_enemy_hand_slot}>
                <div className={`${gameFieldStyles.gamefield_card} ${gameFieldStyles.gamefield_enemy_hand_card}`}
                     style={{transform: `rotate(${(index - enemy.cardsCount / 2) * 10}deg)`}}>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export const Actions = ({
                          cardsInAction,
                          onSelect,
                        }: {
  cardsInAction: Array<{ attack: ICard; defend: ICard }>;
  onSelect: (card: ICard) => void;
}) => {
  return (
    <div className={gameFieldStyles.gamefield_actions}>
      {cardsInAction.map((action) => {
        return (
          <div className={gameFieldStyles.gamefield_action_slot}>
            <div onClick={() => {
              onSelect(action.attack)
            }}
                 style={{backgroundPosition: `calc(-100% * ${action.attack.value - 1}) calc(-100% * ${action.attack.suit})`}}
                 className={`${gameFieldStyles.gamefield_card} ${gameFieldStyles.gamefield_card_attack}`}
            >

            </div>
            {
              action.defend &&
              <div className={`${gameFieldStyles.gamefield_card} ${gameFieldStyles.gamefield_card_defend}`}
                   style={{backgroundPosition: `calc(-100% * ${action.defend.value - 1}) calc(-100% * ${action.defend.suit})`}}>

              </div>
            }
          </div>
        );
      })}
    </div>
  );
};

export const Deck = ({
                       count,
                       trumpCard,
                     }: {
  count: number;
  trumpCard: ICard;
}) => {
  return (
    <div className={gameFieldStyles.gamefield_deck}>
      {
        new Array(count).fill(0).map((_,index)=>{
          return(
            <div className={gameFieldStyles.gamefield_deck_slot}>
              {
                index!==count-1
                  ?<div className={`${gameFieldStyles.gamefield_card} ${ gameFieldStyles.gamefield_card_closed}`}> </div>
                  :<div className={`${gameFieldStyles.gamefield_card} ${ gameFieldStyles.gamefield_card_trump}`}
                  style={{backgroundPosition: `calc(-100% * ${trumpCard.value - 1}) calc(-100% * ${trumpCard.suit})`}}> </div>
              }
            </div>
          )
        })
      }
    </div>
    // <div>
    //   <div>{count.toString()}</div>
    //   <div>{trumpCard.value.toString() + ' ' + trumpCard.suit.toString()}</div>
    // </div>
  );
};
