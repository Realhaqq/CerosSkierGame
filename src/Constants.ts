import { iImage } from "./Interfaces/iImage";

export const GAME_CANVAS = 'skiCanvas';
export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;


export enum KEYS {
    LEFT = 37, // left arrow
    RIGHT = 39, // right arrow
    UP = 38, // up arrow
    DOWN = 40, // down arrow
    SPACE = 32, // space bar
    FAST = 70, // f
    RESTART = 82 // r
}

export const DIRECTIONS = {
    SKIER_CRASH: 0, // skier is crashing
    SKIER_LEFT: 1, // skier is moving left
    SKIER_LEFT_DOWN: 2, // skier is moving left and down
    SKIER_DOWN: 3, // skier is moving down
    SKIER_RIGHT_DOWN: 4, // skier is moving right and down
    SKIER_RIGHT: 5, // skier is moving right
    SKIER_JUMP: 6, // skier is jumping
    SKIER_JUMP_RAMP_BOTTOM: 7, // skier is jumping from the bottom of a ramp
    SKIER_CAUGHT: 6500000 // skier is caught by the rhino
  };

export enum IMAGE_NAMES {
    SKIER_CRASH = 'skierCrash',
    SKIER_LEFT = 'skierLeft',
    SKIER_LEFTDOWN = 'skierLeftDown',
    SKIER_DOWN = 'skierDown',
    SKIER_RIGHTDOWN = 'skierRightDown',
    SKIER_RIGHT = 'skierRight',
    TREE = 'tree',
    TREE_CLUSTER = 'treeCluster',
    ROCK1 = 'rock1',
    ROCK2 = 'rock2',
    RHINO = 'rhino',
    RHINO_RUN1 = 'rhinoRun1',
    RHINO_RUN2 = 'rhinoRun2',
    RHINO_EAT1 = 'rhinoEat1',
    RHINO_EAT2 = 'rhinoEat2',
    RHINO_EAT3 = 'rhinoEat3',
    RHINO_EAT4 = 'rhinoEat4',
    RHINO_CELEBRATE1 = 'rhinoCelebrate1',
    RHINO_CELEBRATE2 = 'rhinoCelebrate2',
    JUMP_RAMP = 'jumpRamp',
    JUMP_RAMP_TOP = 'jumpRampTop',
    JUMP_RAMP_BOTTOM = 'jumpRampBottom',
    JUMP_RAMP_BOTTOM_LEFT = 'jumpRampBottomLeft',
    JUMP_RAMP_BOTTOM_RIGHT = 'jumpRampBottomRight',
    JUMP_RAMP_TOP_LEFT = 'jumpRampTopLeft',
    JUMP_RAMP_TOP_RIGHT = 'jumpRampTopRight',
    JUMP_RAMP_TOP_LEFT_DOWN = 'jumpRampTopLeftDown',
    SKIER_JUMP = 'skierJump'

};

export const SKIER_NAMES = {
    SKIER_CRASH: 'skierCrash', // skier is crashing
    SKIER_LEFT: 'skierLeft', // skier is moving left
    SKIER_LEFTDOWN : 'skierLeftDown', // skier is moving left and down
    SKIER_DOWN: 'skierDown', // skier is moving down
    SKIER_RIGHTDOWN: 'skierRightDown', // skier is moving right and down
    SKIER_RIGHT: 'skierRight', // skier is moving right
    SKIER_JUMP: 'skierJump' // skier is jumping
}


export const SOUNDS = {
    CRASH: 'img/crash.mp3',
    JUMP: 'img/jump.mp3',
    RUN: 'img/bg.mp3',
    RHINO_EAT: 'img/rhinoEat.mp3',
    RHINO_CELEBRATE: 'img/rhinoCelebrate.mp3',
    RHINO_RUN: 'img/rhinoRun.mp3'
}
  
export const DIRECTION_OF_SKIER = {
    [DIRECTIONS.SKIER_CRASH]: SKIER_NAMES.SKIER_CRASH,
    [DIRECTIONS.SKIER_LEFT]: SKIER_NAMES.SKIER_LEFT,
    [DIRECTIONS.SKIER_LEFT_DOWN]: SKIER_NAMES.SKIER_LEFTDOWN,
    [DIRECTIONS.SKIER_DOWN]: SKIER_NAMES.SKIER_DOWN,
    [DIRECTIONS.SKIER_RIGHT_DOWN]: SKIER_NAMES.SKIER_RIGHTDOWN,
    [DIRECTIONS.SKIER_RIGHT]: SKIER_NAMES.SKIER_RIGHT,
    [DIRECTIONS.SKIER_JUMP]: SKIER_NAMES.SKIER_JUMP,
    [DIRECTIONS.SKIER_JUMP_RAMP_BOTTOM]: SKIER_NAMES.SKIER_JUMP,
    [DIRECTIONS.SKIER_CAUGHT]: SKIER_NAMES.SKIER_CRASH,
};
  

export const DIRECTION = {
    DIRECTION_LEFT: 0, // skier is moving left
    DIRECTION_LEFT_DOWN: 1, // skier is moving left and down
    DIRECTION_DOWN: 2, // skier is moving down
    DIRECTION_RIGHT_DOWN: 3, // skier is moving right and down
    DIRECTION_RIGHT: 4, // skier is moving right
    DIRECTION_JUMP: 6, // skier is jumping
}

export const IMAGES: iImage[] = [
    { name: IMAGE_NAMES.SKIER_CRASH, url: 'img/skier_crash.png' },
    { name: IMAGE_NAMES.SKIER_LEFT, url: 'img/skier_left.png' },
    { name: IMAGE_NAMES.SKIER_LEFTDOWN, url: 'img/skier_left_down.png' },
    { name: IMAGE_NAMES.SKIER_DOWN, url: 'img/skier_down.png' },
    { name: IMAGE_NAMES.SKIER_RIGHTDOWN, url: 'img/skier_right_down.png' },
    { name: IMAGE_NAMES.SKIER_RIGHT, url: 'img/skier_right.png' },
    { name: IMAGE_NAMES.TREE, url: 'img/tree_1.png' },
    { name: IMAGE_NAMES.TREE_CLUSTER, url: 'img/tree_cluster.png' },
    { name: IMAGE_NAMES.ROCK1, url: 'img/rock_1.png' },
    { name: IMAGE_NAMES.ROCK2, url: 'img/rock_2.png' },
    { name: IMAGE_NAMES.RHINO, url: 'img/rhino_default.png' },
    { name: IMAGE_NAMES.RHINO_RUN1, url: 'img/rhino_run_left.png' },
    { name: IMAGE_NAMES.RHINO_RUN2, url: 'img/rhino_run_left_2.png' },
    { name: IMAGE_NAMES.RHINO_EAT1, url: 'img/rhino_eat_1.png' },
    { name: IMAGE_NAMES.RHINO_EAT2, url: 'img/rhino_eat_2.png' },
    { name: IMAGE_NAMES.RHINO_EAT3, url: 'img/rhino_eat_3.png' },
    { name: IMAGE_NAMES.RHINO_EAT4, url: 'img/rhino_eat_4.png' },
    { name: IMAGE_NAMES.RHINO_CELEBRATE1, url: 'img/rhino_celebrate_1.png' },
    { name: IMAGE_NAMES.RHINO_CELEBRATE2, url: 'img/rhino_celebrate_2.png' },
    // JUMPING
    { name: IMAGE_NAMES.JUMP_RAMP, url: 'img/jump_ramp.png' },
    { name: IMAGE_NAMES.JUMP_RAMP_TOP, url: 'img/skier_jump_3.png' },
    { name: IMAGE_NAMES.JUMP_RAMP_TOP_RIGHT, url: 'img/skier_jump_5.png' },
    { name: IMAGE_NAMES.JUMP_RAMP_BOTTOM, url: 'img/skier_jump_2.png' },
    { name: IMAGE_NAMES.JUMP_RAMP_TOP_LEFT_DOWN, url: 'img/skier_jump_3.png' },
    { name: IMAGE_NAMES.SKIER_JUMP, url: 'img/skier_jump_3.png' }

];

export const ANIMATION_FRAME_SPEED_MS: number = 250; // milliseconds
export const DIAGONAL_SPEED_REDUCER: number = 1.4142; // diagonal speed is reduced by this factor
export const STARTING_SPEED: number = 10; // pixels per second
