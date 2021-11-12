import {IUser} from "./socketServerInterface";

export class Card {
    public value: number
    public suit: number

    constructor(value: number, suit: number) {
        this.value = value
        this.suit = suit
    }

    compare(attackCard: Card, trump: number) {
        //*******
        return attackCard.value < this.value
    }
}

export class Player {
    public cards: Array<Card> = []
    public userName: string = ''

    constructor(userName: string) {
        this.userName = userName
    }
}

export class Durak {
    public isStarted: boolean = false
    public cards: Array<Card> = []
    public players: Array<Player> = []
    public trump: number = 0
    public currentPlayerIndex: number = 0
    public cardsInAction: Array<{ attack: Card, defend: Card }> = []
    public trumpCard: Card = null

    constructor() {

    }

    createCards() {
        let cards: Array<Card> = []
        for (let i = 6; i <= 14; i++) {
            for (let j = 0; j <= 3; j++) {
                const card = new Card(i, j)
                cards.push(card)
            }
        }
        for (let i = cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        return cards
    }

    startGame() {
        this.isStarted = true
        this.cards = this.createCards()
        const trumpCard = this.cards.pop()
        this.trumpCard = trumpCard
        this.trump = trumpCard.suit
        this.cards.unshift(trumpCard)
        this.processCards()
    }

    getPlayers() {
        return this.players.length
    }

    joinUser(user: IUser) {
        if (this.isStarted) return
        const player = new Player(user.userName)
        this.players.push(player)
    }

    processCards() {
        this.players.forEach((_, index) => {
            const playerIndex = (this.currentPlayerIndex + index)
            const player = this.players[playerIndex]
            while (player.cards.length < 6 && this.cards.length) {
                player.cards.push(this.cards.pop())
            }
        })
    }

    checkMove() {

    }

    turn() {
        const isAll = this.cardsInAction.every(action => action.defend != null)
        if (isAll) {
            this.cardsInAction = []
        }
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
    }

    epicFail() {
        const looser = this.players[(this.currentPlayerIndex + 1) % this.players.length]
        this.cardsInAction.forEach(action => {
            looser.cards.push(action.attack)
            if (action.defend) {
                looser.cards.push(action.defend)
            }
        })
        this.currentPlayerIndex = (this.currentPlayerIndex + 2) % this.players.length
    }

    attack(player: Player, card: Card) {
        if (!this.cardsInAction.length) {
            if (player === this.players[this.currentPlayerIndex]) {
                player.cards = player.cards.filter(playerCards => {
                    this.cardsInAction.push({attack: card, defend: null})
                })
            }
        }
    }

    defend(player: Player, card: Card, atackCard: Card) {
        if (player === this.players[(this.currentPlayerIndex + 1) % this.players.length]) {
            if (card.compare(atackCard, this.trump)) {
                player.cards = player.cards.filter(playerCard => playerCard !== card)
                const currentAction = this.cardsInAction.find(action => action.attack === atackCard)
                currentAction.defend = card
            }
        }
    }
}
