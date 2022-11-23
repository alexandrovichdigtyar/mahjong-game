import { GameCardType } from "../../utils/helpers/types"

export type CardPropsType = {
    checkIsVisible: (activeCards: GameCardType[], card: GameCardType) => void,
    card: GameCardType,
    getActiveCards(): GameCardType[],
    onCardClick: (id: number, isHidden: boolean) => void;
}