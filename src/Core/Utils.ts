/**
 * A set of common utilities used throughout the game.
 */

/**
 * Return a random integer between min and max, inclusive of both.
 */
export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * A simple coordinate class to keep track of two dimensional positions
 */
export class Position {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

/**
 * A simple rectangle class denoted by top/left and bottom/right coordinates
 */
export class Rect {
    left: number = 0;
    top: number = 0;
    right: number = 0;
    bottom: number = 0;

    constructor(left: number, top: number, right: number, bottom: number) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

/**
 * Determine if there is an intersection (overlap) between two rectangles.
 */
export function intersectTwoRects(rect1: Rect, rect2: Rect): boolean {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

/**
 * Return a normalized vector pointing from the start coordinates to the end coordinates
 */
export function getDirectionVector(startX: number, startY: number, endX: number, endY: number): Position {
    let xDistance: number = endX - startX;
    let yDistance: number = endY - startY;

    const distance: number = Math.hypot(xDistance, yDistance);
    if (distance) {
        xDistance /= distance;
        yDistance /= distance;
    }

    return new Position(xDistance, yDistance);
}

// set the timeout for skier jumping state
export function setJumpingTimeOut(callback : any, intervalTime: number) {
    const skieTimeOut = setTimeout(callback, intervalTime);
    return {
        skiTimeOut: skieTimeOut,
        intervalTime: intervalTime,
        createdAt: new Date(),
        callBack: callback
    }
}

// set the timeout for skier jumping state
export function removeJumpingTimeout(time: any): void  {
    let cDate = new Date();
    let diff_ms = cDate.getTime() - time.createdAt.getTime();
    time.intervalTime -= diff_ms;
    clearTimeout(time.skiTimeOut);
}



// play sound
export function playSound(url: string, volume: number): boolean  {
    var audio = new Audio(url);
    if (audio.oncanplay) {
        audio.currentTime = 0;
        audio.volume = 0;
        audio.pause();
        return false;
    } else {
        audio.pause();
        audio.play();
        audio.volume = volume;
        return true;

    }
}