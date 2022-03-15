import * as Constants from "../src/Constants";
import { Skier } from "../src/Entities/Skier";
import { ImageManager } from "../src/Core/ImageManager";
import { ObstacleManager } from "../src/Entities/Obstacles/ObstacleManager";
import { Canvas } from "../src/Core/Canvas";

describe(`Skier Test`, () =>  {
    let skier: Skier;
    
    let canvas = new Canvas(Constants.GAME_CANVAS, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
    const imageManager = new ImageManager();
    const obstacleManager = new ObstacleManager(imageManager, canvas);
    obstacleManager.placeInitialObstacles();


    beforeEach(() => {
        skier = new Skier(0, 0, imageManager, obstacleManager, canvas);
    });

    it(`Skier should be initialized`, () => {
        expect(skier).toBeDefined();
        expect(skier.position).toBe(Constants.STARTING_SPEED);
        expect(skier.speed).toBe(Constants.STARTING_SPEED);
        expect(skier.imageManager).toBe(imageManager);
        expect(skier.obstacleManager).toBe(obstacleManager);
        expect(skier.canvas).toBe(canvas);
        
    });
    
    it(`Play sound the game`, () => {         
        expect(playSound()).toBe(true);
    })


    it(`Skier starting speed`, () => {         
        expect(Number(Constants.STARTING_SPEED)).toBe(10);
    })


    it(`Allow Skier to jump?`, () => {         
        expect(skier.isJumping).toBe(true);
    })

    function playSound() {
        const url = '../../assets/sounds/skierCrash.mp3';
        const volume = 0.5;
        const audio = new Audio(url);
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

  

})