import {Card, Durak} from "./cardGame";
import {ICard} from "./socketServerInterface";

export class PlayerController {
  private game: Durak;
  private userName: string;
  private gameStatusHandler: () => void;

  constructor(game: Durak, userName: string,onGameStatus?:()=>void) {
    this.game = game
    this.userName = userName
    this.gameStatusHandler = () => {
      onGameStatus && onGameStatus()
    }
    this.game.onGameStatus.add(this.gameStatusHandler)
  }

  attack(_card: ICard) {
    const player = this.game.getPlayerByName(this.userName)
    const playerCard = player.cards.find((card) =>
      card.isEqual(_card)
    );
    this.game.attack(player, playerCard)
  }

  defend(card: Card, attackCard: Card) {
    this.game.defend(this.game.getPlayerByName(this.userName), card, attackCard)
  }

  epicFail() {
    this.game.epicFail(this.userName)
  }

  turn() {
    this.game.turn(this.userName)
  }

  destroy() {
    this.game.onGameStatus.remove(this.gameStatusHandler)
  }
}
