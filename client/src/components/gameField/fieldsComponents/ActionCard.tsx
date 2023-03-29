import actionStyles from './fieldComponents.module.css';
import * as React from 'react';
interface IActionCardsProps {
  value: number;
  suit: number;
  action: string;
  clickHandler?: () => void;
}
const cardPositionStyle = (value: number, suit: number) => ({
  backgroundPosition: `calc(-100% * ${value - 1}) calc(-100% * ${suit})`,
});
export const ActionCard = ({
  clickHandler,
  action,
  value,
  suit,
}: IActionCardsProps) => {
  const cardPositionClassName = (action: string) => {
    const cardClassName =
      action === 'attack' ? actionStyles.gamefield_card_attack : actionStyles.gamefield_card_defend;
    return `${actionStyles.gamefield_card} ${cardClassName}`;
  };

  return (
    <div
      onClick={!!clickHandler ? clickHandler:null}
      style={cardPositionStyle(value, suit)}
      className={cardPositionClassName(action)}
    />
  );
};
