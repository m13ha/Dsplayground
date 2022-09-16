export interface StackType {
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string
}

export interface StacksArray extends Array<StackType>{}