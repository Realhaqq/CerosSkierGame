/**
 * The skier is the entity controlled by the player in the game. The skier skis down the hill, can move at different
 * angles, and crashes into obstacles they run into. If caught by the rhino, the skier will get eaten and die.
 */

import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { Canvas } from "../Core/Canvas";
import * as  Utils  from "../Core/Utils";
import { ImageManager } from "../Core/ImageManager";
import { intersectTwoRects, Rect } from "../Core/Utils";
import { ObstacleManager } from "./Obstacles/ObstacleManager";
import {Obstacle} from "./Obstacles/Obstacle";

/**
 * The skier starts running at this speed. Saved in case speed needs to be reset at any point.
 */
const STARTING_SPEED = Constants.STARTING_SPEED;

/**
 * The different states the skier can be in.
 */

enum STATES {
    STATE_SKIING = 'skiing', // Skier is moving down the hill.
    STATE_CRASHED = 'crashed', // Skier has crashed into an obstacle.
    STATE_DEAD = 'dead' // Skier has died.
};

/**
 * The different directions the skier can be facing.
 */
const DIRECTION_LEFT: number = Constants.DIRECTION.DIRECTION_LEFT;
const DIRECTION_LEFT_DOWN: number = Constants.DIRECTION.DIRECTION_LEFT_DOWN;
const DIRECTION_DOWN: number = Constants.DIRECTION.DIRECTION_DOWN;
const DIRECTION_RIGHT_DOWN: number = Constants.DIRECTION.DIRECTION_RIGHT_DOWN;
const DIRECTION_RIGHT: number = Constants.DIRECTION.DIRECTION_RIGHT;
const DIRECTION_JUMP: number = Constants.DIRECTION.DIRECTION_JUMP;

/**
 * Mapping of the image to display for the skier based upon which direction they're facing.
 */
const DIRECTION_IMAGES: {[key: number]: Constants.IMAGE_NAMES} = {
    [DIRECTION_LEFT] : Constants.IMAGE_NAMES.SKIER_LEFT,
    [DIRECTION_LEFT_DOWN] : Constants.IMAGE_NAMES.SKIER_LEFTDOWN,
    [DIRECTION_DOWN] : Constants.IMAGE_NAMES.SKIER_DOWN,
    [DIRECTION_RIGHT_DOWN] : Constants.IMAGE_NAMES.SKIER_RIGHTDOWN,
    [DIRECTION_RIGHT] : Constants.IMAGE_NAMES.SKIER_RIGHT,
    [DIRECTION_JUMP] : Constants.IMAGE_NAMES.SKIER_JUMP
};

export class Skier extends Entity {

    /**
     * The name of the current image being displayed for the skier.
     */
    imageName: Constants.IMAGE_NAMES = Constants.IMAGE_NAMES.SKIER_DOWN;

    /**
     * What state the skier is currently in.
     */
    state: STATES = STATES.STATE_SKIING;

    /**
     * What direction the skier is currently facing.
     */
    direction: number = DIRECTION_DOWN;

    /**
     * How fast the skier is currently moving in the game world.
     */
    speed: number = STARTING_SPEED;

    /**
     * Stored reference to the ObstacleManager
     */
    obstacleManager: ObstacleManager;

    /**
     * Move the skier diagonally right in equal amounts down and to the right. Use the current speed, reduced by the scale
     * 
     */
    assetName = "skierRight";
    
    /**
     * declare a jumping state.
     */
    isJumping = false;
    

    /**
     * declare a jumping timeout.
     */
    skierJumpingTimeout = {};
    
    /**
     * Init the skier.
     */
    constructor(x: number, y: number, imageManager: ImageManager, obstacleManager: ObstacleManager, canvas: Canvas) {
        super(x, y, imageManager, canvas);
        this.skierJumpingTimeout = {};

        this.isJumping = false;
        this.speed = STARTING_SPEED;
        this.obstacleManager = obstacleManager;
    }

    /**
     * Is the skier currently in the crashed state
     */
    isCrashed(): boolean {
        return this.state === STATES.STATE_CRASHED;
    }

    /**
     * Is the skier currently in the skiing state
     */
    isSkiing(): boolean {
        return this.state === STATES.STATE_SKIING;
    }

    /**
     * Is the skier currently in the dead state
     */
    isDead(): boolean {
        return this.state === STATES.STATE_DEAD;
    }

    /**
     * Set the current direction the skier is facing and update the image accordingly
     */
    setDirection(direction: number): void  {
        this.direction = direction;
        this.setDirectionalImage();
    }

    /**
     * Set the skier's image based upon the direction they're facing.
     */
    setDirectionalImage(): void  {
        this.imageName = DIRECTION_IMAGES[this.direction];
    }

    /**
     * Move the skier and check to see if they've hit an obstacle. The skier only moves in the skiing state.
     */
    update(): void  {
        if(this.isSkiing()) {
            this.move();
            this.checkIfHitObstacle(this.obstacleManager, this.imageManager);
        }
    }

    /**
     * Draw the skier if they aren't dead
     */
    draw(): void  {
        if (this.isDead()) {
            return;
        }
        super.draw();
    }

    /**
     * Move the skier based upon the direction they're currently facing. This handles frame update movement.
     */
    move(): void  {
        switch(this.direction) {
            case DIRECTION_LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case DIRECTION_DOWN:
                this.moveSkierDown();
                break;
            case DIRECTION_RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
            case DIRECTION_JUMP:
                    this.jump();
                    break;
            case DIRECTION_LEFT:
            case DIRECTION_RIGHT:
                // Specifically calling out that we don't move the skier each frame if they're facing completely horizontal.
                break;
        }
    }

    /**
     * Move the skier left. Since completely horizontal movement isn't frame based, just move incrementally based upon
     * the starting speed.
     */
    moveSkierLeft(): void  {
        this.position.x -= STARTING_SPEED;
    }

    /**
     * Move the skier diagonally left in equal amounts down and to the left. Use the current speed, reduced by the scale
     * of a right triangle hypotenuse to ensure consistent traveling speed at an angle.
     */
    moveSkierLeftDown(): void  {
        this.position.x -= this.speed / Constants.DIAGONAL_SPEED_REDUCER;
        this.position.y += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Move the skier down at the speed they're traveling.
     */
    moveSkierDown(): void  {
        this.position.y += this.speed;
    }

    /**
     * Move the skier diagonally right in equal amounts down and to the right. Use the current speed, reduced by the scale
     * of a right triangle hypotenuse to ensure consistent traveling speed at an angle.
     */
    moveSkierRightDown(): void  {
        this.position.x += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
        this.position.y += this.speed / Constants.DIAGONAL_SPEED_REDUCER;
    }

    /**
     * Move the skier right. Since completely horizontal movement isn't frame based, just move incrementally based upon
     * the starting speed.
     */
    moveSkierRight(): void  {
        this.position.x += STARTING_SPEED;
    }

    /**
     * Move the skier up. Since moving up isn't frame based, just move incrementally based upon
     * the starting speed.
     */
    moveSkierUp(): void  {
        this.position.y -= STARTING_SPEED;
    }

    /**
     * Turn the skier left. If they're already completely facing left, move them left. Otherwise, change their direction
     * one step left. If they're in the crashed state, then first recover them from the crash.
     */
    turnLeft(): void  {
        if(this.isCrashed()) {
            this.recoverFromCrash(DIRECTION_LEFT);
        }

        if(this.direction === DIRECTION_LEFT) {
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    /**
     * Turn the skier right. If they're already completely facing right, move them right. Otherwise, change their direction
     * one step right. If they're in the crashed state, then first recover them from the crash.
     */
    turnRight(): void  {
        if(this.isCrashed()) {
            this.recoverFromCrash(DIRECTION_RIGHT);
        }

        if(this.direction === DIRECTION_RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    /**
     * Turn the skier up which basically means if they're facing left or right, then move them up a bit in the game world.
     * If they're in the crashed state, do nothing as you can't move up if you're crashed.
     */
    turnUp(): void  {
        if(this.isCrashed()) {
            return;
        }

        if(this.direction === DIRECTION_LEFT || this.direction === DIRECTION_RIGHT) {
            this.moveSkierUp();
        }
    }

    /**
     * Turn the skier to face straight down. If they're crashed don't do anything to require them to move left or right
     * to escape an obstacle before skiing down again.
     */
    turnDown(): void  {
        if(this.isCrashed()) {
            return;
        }
        this.setDirection(DIRECTION_DOWN);
    }

    // Set the skier's to jumping state
    setSkierJumping(value: any): void  {
        this.isJumping = value;
        this.updateCurrentAsset();
        if(this.isJumping) {
            Utils.playSound(Constants.SOUNDS.JUMP, 0.5);
        }
        this.updateSkierTimeOut();
    }

    // Set the skier's to jumping state
    jump(): void  {
        if (this.direction === DIRECTION_DOWN ||
            this.direction === DIRECTION_LEFT_DOWN ||
            this.direction === DIRECTION_RIGHT_DOWN
        )
            this.setSkierJumping(true);
    }

    // Udpate skier's jumping state (timeout)
    updateSkierTimeOut(): void  {
        if (this.isJumping) {
            this.skierJumpingTimeout = Utils.setJumpingTimeOut(() => { this.setSkierJumping(false) }, 1800);
        } else if (this.skierJumpingTimeout) {
            Utils.removeJumpingTimeout(this.skierJumpingTimeout)
        }
    }

    // Inscrease the skier's speed
    increaseSpeed(speed = 1): void  {
        this.setSkierSpeed(this.speed + speed)
    }

    // set the skier's speed
    setSkierSpeed(value : any): void  {
        this.speed = value;
        this.skierCurrentSpeed();
    }

    // Update the skier's asset
    updateCurrentAsset(): void  {
        if (this.isJumping && this.direction != 0) {
            this.assetName = Constants.DIRECTION_OF_SKIER[6];
            this.imageName = Constants.IMAGE_NAMES.SKIER_JUMP;
            if (this.isJumping) {
                // Set flip the jumping skier
                setTimeout(() => {
                    this.assetName = Constants.DIRECTION_OF_SKIER[7];
                    this.imageName = Constants.IMAGE_NAMES.JUMP_RAMP_BOTTOM;
               },  2000); //wait 2 seconds
                
            } 
        } else {
            this.assetName = Constants.DIRECTION_OF_SKIER[this.direction];
        }
     }


    /**
     * The skier has a bit different bounds '
     * ]calculating than a normal entity to make the collision with obstacles more
     * natural. We want te skier to end up in the obstacle rather than right above it when crashed, so move the bottom
     * boundary up.
     */
    getBounds(): Rect | null {
        const image = this.imageManager.getImage(this.imageName);
        if(!image) {
            return null;
        }

        return new Rect(
            this.position.x - image.width / 2,
            this.position.y - image.height / 2,
            this.position.x + image.width / 2,
            this.position.y - image.height / 4
        );
    }

    /**
     * Go through all the obstacles in the game and see if the skier collides with any of them. If so, crash the skier.
     */
    checkIfHitObstacle(obstacleManager : any, imageManager: any): void  {
        const skierBounds = this.getBounds();
        if(!skierBounds) {
            return;
        }
        const collision = obstacleManager.getObstacles().find((obstacle: Obstacle) => {
            const obstacleAsset = imageManager.getImage(obstacle.imageName);
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );
            return intersectTwoRects(skierBounds, obstacleBounds) ? obstacle.imageName : false;
        });

        if (collision) {
            // Check if the skiet touch the obstacle (jumpRamp)
            if (collision.imageName == "jumpRamp") {
                // Make the skier jump
                this.jump()
            } else if (collision.imageName == "rock2" || collision.imageName == "rock1") {
                // Make the skier jump
                this.jump()
            } else {
                // Crash the skier
                this.crash();
            }
        }
    }

    /**
     * Crash the skier. Set the state to crashed, set the speed to zero cause you can't move when crashed and update the
     * image.
     */
    crash(): void  {
        this.state = STATES.STATE_CRASHED;
        this.speed = 0;
        this.imageName = Constants.IMAGE_NAMES.SKIER_CRASH;
        this.restartAfterCrashed();
    }


    restartAfterCrashed = (): void  => { 
        if (this.isCrashed() && this.state === STATES.STATE_CRASHED && !this.isJumping && this.speed === 0 && this.isDead) {
            // Restart the game
            setTimeout(() => {
                window.location.reload();
           },  5000); //wait 5 seconds
        }
          
    }

    /**
     * Change the skier back to the skiing state, get them moving again at the starting speed and set them facing
     * whichever direction they're recovering to.
     */
    recoverFromCrash(newDirection: number): void  {
        this.state = STATES.STATE_SKIING;
        this.speed = STARTING_SPEED;
        this.setDirection(newDirection);
    }

    /**
     * Kill the skier by putting them into the "dead" state and stopping their movement.
     */
    die(): void  {
        this.state = STATES.STATE_DEAD;
        this.speed = 0;
        
        // Play Sound
        Utils.playSound(Constants.SOUNDS.CRASH, 0.5);
        this.restartAfterCrashed();
    }

    skierCurrentSpeed(): void  {
        let element = document;
        let event = document.createEvent("CustomEvent");
        event.initCustomEvent("skierCurrentSpeed", true, true, {
            speed: this.speed
        });
        element.dispatchEvent(event);
    }
}