export interface StackType {
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
    bColor: string,
}

export interface QueueType {
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
    bColor: string,
}

export interface StacksArray extends Array<StackType>{}

export interface QueueArray extends Array<QueueType> {}