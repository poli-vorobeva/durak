// TODO: class StartGame
// TODO: class Validation
// TODO: refactor gameStatus
// TODO: enum for boolean
// TODO: кейс for userDisconnect
// TODO: change naming
// TODO: rooms for diferent games

import { ICard, IGameStatus, IUser } from "./socketServerInterface";
import Signal from "./Singal";

export class Durak {
  public isStarted: boolean = false;
  public maxCardPower: number = 0;
  public cards: Array<Card> = [];
  public players: Array<Player> = [];
  public currentPlayerIndex: number = 0;
  public trump: number = 0;
  public cardsInAction: Array<{ attack: Card; defend: Card }> = [];
  public trumpCard: Card = null;
  public onFinish: () => void;
  public onGameStatus: Signal<void> = new Signal();

  constructor() {}

  createCards() {
    let cards: Array<Card> = [];
    for (let i = 6; i < this.maxCardPower; i++) {
      for (let j = 0; j <= 3; j++) {
        const card = new Card(i, j);
        cards.push(card);
      }
    }

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }

    return cards;
  }

  startGame() {
    this.isStarted = true;
    this.maxCardPower = 14;
    this.cards = this.createCards();
    const trumpCard = this.cards.pop();
    this.trumpCard = trumpCard;
    this.trump = trumpCard.suit;
    this.cards.unshift(trumpCard);
    this.processCards();
    this.onGameStatus.emit(null);
  }

  joinUser(user: IUser) {
    if (this.isStarted) return;
    const player = new Player(user.userName);
    this.players.push(player);
  }

  processCards() {
    this.players.forEach((_, index) => {
      const playerIndex =
        (this.currentPlayerIndex + index) % this.players.length;
      const player = this.players[playerIndex];

      while (player.cards.length < 6 && this.cards.length) {
        player.cards.push(this.cards.pop());
      }
    });

    const winners = this.players.filter((player) => !player.cards.length);
    console.log(winners);

    if (winners.length === this.players.length - 1) {
      this.finishGame();
    }
    if (winners.length === this.players.length) {
      this.finishGame();
    }
  }

  turn(userName: string) {
    const player = this.getPlayerByName(userName);
    if (player !== this.getCurrentPlayer()) return;

    const isAll = this.cardsInAction.every((action) => action.defend != null);
    if (isAll) {
      this.cardsInAction = [];

      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;

      this.processCards();
    }
    this.onGameStatus.emit(null);
  }

  epicFail(userName: string) {
    const looser = this.getDefender();

    const player = this.getPlayerByName(userName);
    if (player !== looser) return;

    this.cardsInAction.forEach((action) => {
      looser.cards.push(action.attack);
      if (action.defend) {
        looser.cards.push(action.defend);
      }
    });
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 2) % this.players.length;

    this.cardsInAction = [];
    this.processCards();
    this.onGameStatus.emit(null);
  }

  takeCardFrom(player: Player, card: Card) {
    return player.cards.filter((playerCard) => !playerCard.isEqual(card));
  }

  setCardToAction(player: Player, card: Card) {
    player.cards = this.takeCardFrom(player, card);
    this.cardsInAction.push({ attack: card, defend: null });
  }

  attack(player: Player, card: Card) {
    if (!this.cardsInAction.length && player === this.getCurrentPlayer()) {
      this.setCardToAction(player, card);
    } else {
      const isFound = !!this.cardsInAction.find(
        (action) =>
          card.value === action.attack.value ||
          card.value === action.defend?.value
      );
      if (isFound && player !== this.getDefender()) {
        this.setCardToAction(player, card);
      }
    }
    this.onGameStatus.emit(null);
  }

  defend(player: Player, card: Card, attackCard: Card) {
    if (player === this.getDefender()) {
      if (card.compare(attackCard, this.trump, this.maxCardPower)) {
        player.cards = this.takeCardFrom(player, card);

        const currentAction = this.cardsInAction.find((action) =>
          action.attack.isEqual(attackCard)
        );
        currentAction.defend = card;
      }
    }
    this.onGameStatus.emit(null);
  }

  getGameStatus(userName: string) {
    const player = this.getPlayerByName(userName);
    // console.log(player, "-------+++++++++++++++++++THISpalys");
    const gameStatus: IGameStatus = {
      players: this.players.map((player) => {
        // console.log(player, "---!!!!", player.cards, "!!!!!!!!!~~~~~~~~~");
        return {
          user: player.userName,
          cardsCount: player.cards.length,
        };
      }),
      cardsCountInStack: this.cards.length,
      trumpCard: this.trumpCard,
      playerCards: player.cards,
      actionCards: this.cardsInAction.map((action) => {
        return {
          attack: action.attack,
          defend: action.defend,
        };
      }),
      currentPlayerIndex: this.currentPlayerIndex,
    };
    return gameStatus;
  }

  insertPlayerCard() {}

  getPlayers() {
    return this.players.length;
  }

  getDefender() {
    return this.players[(this.currentPlayerIndex + 1) % this.players.length];
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getPlayerByName(name: string) {
    return this.players.find((player) => {
      return player.userName === name;
    });
  }

  finishGame() {
    this.players = [];
    this.isStarted = false;
    this.onFinish();
    this.cardsInAction = [];
  }

  disconnectPlayer() {
    this.isStarted = false;
    this.players = [];

    this.cardsInAction = [];
  }
}

class Player {
  public userName: string = "";
  public cards: Array<Card> = [];

  constructor(userName: string) {
    this.userName = userName;
  }
}

export class Card {
  public value: number;
  public suit: number;

  constructor(value: number, suit: number) {
    this.value = value;
    this.suit = suit;
  }

  compare(attackCard: Card, trump: number, maxCardPower: number) {
    if (attackCard.suit != this.suit && this.suit != trump) return false;
    return (
      attackCard.getTotal(trump, maxCardPower) <
      this.getTotal(trump, maxCardPower)
    );
  }

  isEqual(card: ICard) {
    return this.value === card.value && this.suit === card.suit;
  }

  getTotal(trump: number, maxCardPower: number) {
    return this.value + (this.suit == trump ? maxCardPower : 0);
  }
}
