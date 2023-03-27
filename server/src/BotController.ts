import { PlayerController } from "./playerController";
import { Card, Durak } from "./cardGame";
import { IGameStatus } from "./socketServerInterface";

export class BotController extends PlayerController {
  constructor(game: Durak, userName: string) {
    super(game, userName, () => {
      const gameStatus = game.getGameStatus(userName);
      const myPlayerIndex = gameStatus.players.findIndex(
        (player) => userName === player.user
      );
      if (
        myPlayerIndex ===
        (gameStatus.currentPlayerIndex + 1) % gameStatus.players.length
      ) {
        this.defendLogic(gameStatus);
        //websocket.defend(actionCard, card);
      } else {
        this.attackLogic(gameStatus);
        //websocket.attack(card);
      }
    });
  }

  defendLogic(gameStatus: IGameStatus) {
    gameStatus.actionCards.map((action) => {
      if (!action.defend) {
        const isDefended = !!gameStatus.playerCards.find((_card) => {
          const card = new Card(_card.value, _card.suit);
          const attackCard = new Card(action.attack.value, action.attack.suit);
          const isCorrect = card.compare(
            attackCard,
            gameStatus.trumpCard.suit,
            14
          );
          if (isCorrect) {
            this.defend(card, attackCard);
            return true;
          }
        });
        if (!isDefended) {
          this.epicFail();
        }
      }
    });
  }

  attackLogic(gameStatus: IGameStatus) {
    const isNotDefended = gameStatus.actionCards.find((action) => {
      return !action.defend;
    });
    const isEmptyActions = !gameStatus.actionCards.length;
    if (isEmptyActions) {
      this.attack(gameStatus.playerCards[0]);
    } else {
      if (!isNotDefended) {
        this.turn();
      }
    }
  }
}
