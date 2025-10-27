let fortuneWheelGame;
let coinSpinAnim;

// window loads event
window.onload = function() {

    // phaser game configuration object
    const currentTheme = window.GAME_CONFIG && window.GAME_CONFIG.theme;
    const hasBackground = currentTheme === 'underwater' || currentTheme === 'china' || currentTheme === 'christmas';
    console.log('Phaser init - Theme:', currentTheme, '| Has background:', hasBackground, '| Transparent:', hasBackground);
    var gameConfig = {    
       type: Phaser.WEBGL,          // render type  
       backgroundColor: hasBackground ? 0x000000 : 0x2c2c2c,   // black for themes with background, dark gray for others
       transparent: hasBackground,
       backgroundAlpha: hasBackground ? 0 : 1,
       scene: [FortuneWheel],       // scenes used by the game  
       audio: 
	   {
			                        // disableWebAudio: true
       },
       scale: {
        width: 1920,                    // game width, in pixels 1850
        height: 1080,                   // game height, in pixels 1077
        mode: Phaser.Scale.ScaleModes.RESIZE,   // SHOW_ALL, RESIZE, FIT, autoCenter: Phaser.Scale.CENTER_BOTH   
      }
    };
   
    fortuneWheelGame = new Phaser.Game(gameConfig);     // game constructor
    window.focus()                                      // pure javascript to give focus to the page/frame 
                                                        // scale  resize();  window.addEventListener("resize", resize, false); - not used
}

// FortuneWheel scene
class FortuneWheel extends Phaser.Scene{
  
    // constructor
    constructor(){
        super("FortuneWheel"); // scene key FortuneWheel
    }

    // method to be executed when the scene preloads
    preload(){

        // loading images
        wheelConfig.sprites.forEach((s)=>{if(s.fileName != null) this.load.image(s.name, wheelConfig.assetPath + "png/" + s.fileName);});
        this.load.spritesheet("coinspin", wheelConfig.assetPath + "png/CoinSheet.png", { frameWidth: 100, frameHeight: 100});

        // set config variables
        this.usePointer = (this.getSpriteData('pointer') != null && this.getSpriteData('pointer').fileName != null);
  
        // loading sounds
        this.load.audio('pointer_hit_clip', ['audio/pointer_hit.ogg', 'audio/pointer_hit.mp3' ]);  // this.load.audio('wheel_spin_clip', 'audio/spin_sound.mp3'); this.load.audio('coins_clip', 'audio/win_coins.wav');
        this.load.audio('win_clip', ['audio/win_sound.ogg','audio/win_sound.mp3']);
        
        // loading bitmap fonts
        wheelConfig.fonts.forEach((f)=>{this.load.bitmapFont(f.fontName, f.filePNG, f.fileXML);});
    }

    // method to be executed once the scene has been created
    create(){
        this.sectorsCount = wheelConfig.sectors.length;
        this.sectorsText = [];
// game dimensions
        this.gameWidth = fortuneWheelGame.config.width;         // this.sys.game.canvas.width; 
        this.gameHeight = fortuneWheelGame.config.height;       // this.sys.game.canvas.height;
        this.centerX = (this.gameWidth / 2) + wheelConfig.centerOffsetX;
        this.centerY =(this.gameHeight / 2) + wheelConfig.centerOffsetY; 
// create wheel
        wheelConfig.createWheel(this);
// add sounds 
        this.pointer_hit_clip = this.sound.add('pointer_hit_clip');  // this.wheel_spin_clip = this.sound.add('wheel_spin_clip'); this.coins_clip = this.sound.add('coins_clip');
        this.win_clip = this.sound.add('win_clip');
// create animations
        coinSpinAnim = this.anims.create({             
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coinspin'),
            frameRate: 16,
            repeat: -1
        });
       
        this.coinParticles = this.add.particles('coinspin');
        
        this.scale.on('resize', function (gameSize) // https://newdocs.phaser.io/docs/3.55.1/Phaser.Scale.Events.RESIZE
        {
            this.renderer.resize(window.innerWidth, window.innerHeight);    // force resize canwas, 
            this.setCamera();
        }, this);

        this.setCamera();

        // the game has just started and we can spin the wheel
        this.canSpin = true;
        this.animPointerComplete = true;
        
        // Initialize spin counter
        this.spinCount = 0;
        
       // this.showCoins();
    }

    setCamera()
    {
        if (fortuneWheelGame.config.scaleMode !== Phaser.Scale.ScaleModes.RESIZE) return;
        var cWidth = this.sys.game.canvas.width;
        var cHeight = this.sys.game.canvas.height;
        this.cameras.resize(cWidth, cHeight);
        var zoomY = cHeight / fortuneWheelGame.config.height;
        var zoomX = cWidth / fortuneWheelGame.config.width;
        this.cameras.main.setZoom(zoomY < zoomX ? zoomY : zoomX);
        var offsetY = float_lerp(540, 0, zoomY);
        var offsetX = float_lerp(960, 0, zoomX);
        this.cameras.main.scrollY = offsetY; 
        this.cameras.main.scrollX = offsetX;
        // console.log('resize window: ' + window.innerWidth+ ' : ' + window.innerHeight)
    }

    update(time, delta) // https://newdocs.phaser.io/docs/3.52.0/focus/Phaser.Scene-update
    {   
     //  console.log('elapsed time: ' + this.game.time.totalElapsedSeconds());
       if(!this.canSpin)
       {
           if(this.usePointer && this.animPointerComplete && this.wheelSpeed > 0.1)
           {
               this.pointerTweenDuration = 360/this.wheelSpeed/this.sectorsCount;
               this.animPointer();
           }
       }
    }

    // function to spin the wheel
    spinWheel(){

        var oldTime;    // spin tween elapsed time 
        var oldValue;   // spin tween last value  

        // can we spin the wheel?
        if(this.canSpin){

            wheelConfig.cancelsectorWinAnim(this);

            if(this.coinsEmitter!=null)
            {
                this.coinsEmitter.stop();
            }

            this.win_clip.stop(); // this.wheel_spin_clip.setLoop(true); this.wheel_spin_clip.play();

            // resetting text field
            this.prizeText.setText("wait ...");

            // the wheel will spin round for some times. 
            var rounds = Phaser.Math.Between(wheelConfig.wheelRounds.min, wheelConfig.wheelRounds.max);

            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            this.rand_sector = Phaser.Math.Between(0, wheelConfig.sectors.length - 1);
            var rand_degrees = this.rand_sector * 360/wheelConfig.sectors.length;

            // then will rotate back by a random amount of degrees
            var backDegrees = Phaser.Math.Between(wheelConfig.backSpin.min, wheelConfig.backSpin.max);

            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;

            // animation tweeen for the spin
            this.tweens.add({              
                targets: [this.wCont],                                  // adding the wheel to tween targets               
                angle: 360 * rounds + rand_degrees + backDegrees,       // angle destination           
                duration: Phaser.Math.Between(wheelConfig.rotationTimeRange.min, wheelConfig.rotationTimeRange.max),    // tween duration             
                ease: "Cubic.easeOut",                          // tween easing               
                callbackScope: this,                            // callback scope           
                onComplete: function(tween){                    // function to be executed once the tween has been completed
                    this.showCoins();                 
                    this.tweens.add({                           // another tween to rotate a bit in the opposite direction
                        targets: [this.wCont],
                        angle: this.wCont.angle - backDegrees,
                        duration: Phaser.Math.Between(wheelConfig.rotationTimeRange.min, wheelConfig.rotationTimeRange.max) / 8,
                        ease: "Cubic.easeIn",
                        callbackScope: this,
                        onComplete: function(tween_1){
                            this.prizeText.setText(wheelConfig.sectors[this.rand_sector].text);  // displaying prize text  
                            
                            // Increment spin counter
                            this.spinCount++;
                            console.log('Spin #' + this.spinCount + ' complete');
                            
                            // Update spin counter display
                            if (typeof window.updateSpinCounter === 'function') {
                                window.updateSpinCounter(this.spinCount);
                            }
                            
                            // Check if this is the 3rd spin - show winner modal
                            if (this.spinCount >= 3) {
                                console.log('3rd spin reached! Showing winner modal...');
                                
                                // Delay to let win animation complete
                                this.time.delayedCall(2000, () => {
                                    if (typeof window.showWinnerModal === 'function') {
                                        window.showWinnerModal(wheelConfig.sectors[this.rand_sector].text);
                                    }
                                }, [], this);
                            } else {
                                this.canSpin = true;  // player can spin again
                            }
                            
                            wheelConfig.sectorWinAnim(this);  // this.wheel_spin_clip.stop();
                            this.win_clip.play();
                        }
                    })
                },
                onUpdate : function(tween)
                {
                    var dValue= tween.getValue([0]) - oldValue;
                    var dTime = tween.elapsed - oldTime;
                    this.wheelSpeed = (dTime!=null) ? dValue/dTime : 0;
                    oldTime = tween.elapsed;
                    oldValue = tween.getValue([0]);  // console.log('tween progress: ' + tween.progress + '; delta value: ' + dValue  + '; delta time: '+ dTime + 'speed: ' + wheelSpeed);
                }
            });
        }
    }

    animPointer()
    {
        var dir = (wheelConfig.animPointerDir && wheelConfig.animPointerDir < 0) ? -1 : 1;
        this.animPointerComplete = false;
        this.tweens.add({
            targets: [this.pointer],
            angle: -15 * dir,
            duration: this.pointerTweenDuration * 5/6,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function(tween)
            {
                this.pointer_hit_clip.play();
                this.tweens.add({
                    targets: [this.pointer],
                    angle: this.pointer.angle + 15 * dir,
                    duration: this.pointerTweenDuration * 1/6,
                    ease: "Cubic.easeIn",
                    callbackScope: this,
                    onComplete: function(tween)
                    {
                        this.animPointerComplete = true;
                    }
                })
            },
           
        });
    }

    animLightSector()
    {
        var loopsCount = 0;     // lightTween loops counter
        this.lightTween =  this.tweens.add({
            targets: this.lightsector,
            alphaTopLeft: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomRight: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            yoyo: true,
            loop: 5,
            callbackScope: this,
            onLoop: function(tween)
            {
                  loopsCount++;
                  if(loopsCount == 2)               // stop coins emitter
                  {                     
                      this.coinsEmitter.stop();     // this.coins_clip.play();
                  }
            },
           
        });
    }

    animTextSector()
    {
        var loopsCount = 0;     //tween loops counter
        this.sectorTextTween =  this.tweens.add({
            targets: this.sectorsText[this.rand_sector],
            alphaTopLeft: { value: 0, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaTopRight: { value: 0, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomRight: { value: 0, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            alphaBottomLeft: { value: 0, duration: wheelConfig.lightTweenDuration, ease: 'Power1' },
            yoyo: true,
            loop: 5,
            callbackScope: this,
            onLoop: function(tween)
            {
                  loopsCount++;
                  if(loopsCount == 2)               // stop coins emitter
                  {                     
                      this.coinsEmitter.stop();     // this.coins_clip.play();
                  }
            },           
        });
    }

    showCoins()
    {
        this.coinsEmitter = this.coinParticles.createEmitter({
            x: this.centerX,
            y: -150,
            frame: 0,
            quantity: 3,
            frequency: 200,
            angle: { min: -30, max: 30 },
            speedX:  { min: -200, max: 200 },
            speedY: { min: -100, max: -200 },
            scale: { min: 0.4, max: 0.5},
            gravityY: 400,
            lifespan: { min: 10000, max: 15000 },
            particleClass: AnimatedParticle
        });
/*
        const circle = new Phaser.Geom.Circle(0, -400, 500);
        this.coinsEmitter.setEmitZone({
            type: 'edge',
            source: circle,
            quantity: 50,
            stepRate: 0
        });
*/
    }

    spinUp() {
        this.spinbutton.setTexture('spinbutton'); // console.log('button up', arguments);
        this.spinWheel();
    }

    spinDown() {   
        if (this.canSpin) this.spinbutton.setTexture('spinbutton_hover'); // console.log('button down', arguments);
    }

    spinOver() {
        //  console.log('button over');
    }

    spinOut() {  
         this.spinbutton.setTexture('spinbutton'); // console.log('button out');
    }

    // adding a sprite by name with a given offset and origin (from wheel_config_.js file)
    addSprite(name)
    {
      var spriteData = this.getSpriteData(name);
      if(spriteData == null || spriteData.fileName === null) return null;
      return  this.add.sprite(this.centerX + spriteData.offsetX, this.centerY + spriteData.offsetY, name).setOrigin(spriteData.originX, spriteData.originY);
    } 

    addSpriteLocPos(name, posX, posY)
    {
        return  this.add.sprite(this.centerX + posX, this.centerY + posY, name);
    } 

    // return import data of the sprite from the wheel_config_.js file
    getSpriteData(spriteName)
    {
        for(var si = 0; si < wheelConfig.sprites.length; si++)
        {
            if(wheelConfig.sprites[si].name === spriteName) return wheelConfig.sprites[si];
        }
        return null;
    }

    lampsBlink(blink)
    {
        if(this.lampsArray)
        {
            if(blink && !this.lampsIntervalID )
            {
                this._lampsOn = false;
                this.lampsIntervalID = setInterval(()=>
                {
                this.lampsArray.forEach((l)=>{l.setOn(this._lampsOn);});
                this._lampsOn = !this._lampsOn;
                }, 1000);
            }
            else if(!blink && this.lampsIntervalID)
            {
                clearInterval(this.lampsIntervalID);
                this.lampsArray.forEach((l)=>{l.setOn(true);});
                this.lampsIntervalID = null;
            }
        }    
    }
}

function float_lerp(val1, val2, amount)
{
    amount = amount < 0.0 ? 0.0 : amount;
    amount = amount > 1.0 ? 1.0 : amount;
    return val1 + (val2 - val1) * amount;
};


class Lamp
{
    constructor (scene, offsetX, offsetY)
    {
        this.scene = scene;
        this.lamp = scene.addSpriteLocPos('lamp_off', offsetX, offsetY);  
    }

    on()
    {
        this.lamp.setTexture('lamp_on'); 
    }

    off()
    {
        this.lamp.setTexture('lamp_off'); 
    }

    setOn(lampOn)
    {
        this.lamp.setTexture(lampOn ? 'lamp_on' : 'lamp_off'); 
    }
}