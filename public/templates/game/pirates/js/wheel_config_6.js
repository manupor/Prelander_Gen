// 6 sectors pirates

var wheelConfig = {
    assetPath : 'pirates/',
    centerOffsetX: 0,
    centerOffsetY: -160,
    prizeTextTint : 0xFFFFFF,
    sectorsTextTint : 0x2c2c2c,
    winSectorsTextTint : 0xffffff,
    animPointerDir : -1,

    fonts: [
        {
            fontName: 'gameFont_1',
            filePNG:  'fonts/roboto_72_1.png',
            fileXML:  'fonts/roboto_72_1.xml'
        },
        {
            fontName: 'gameFont_2',
            filePNG:  'fonts/roboto_72_2.png',
            fileXML:  'fonts/roboto_72_2.xml'
        },
    ],

    // sectors config
    sectors: [
        {
            win: 100,
            text: '$100',
            isBigWin : false
        },
        {
            win: 200,
            text: '$200',
            isBigWin : false
        },
        {
            win: 300,
            text: '$300',
            isBigWin : false
        },
        {
            win: 400,
            text: '$400',
            isBigWin : false
        },
        {
            win:500,
            text: '$500',
            isBigWin : false
        },
        {
            win: 600,
            text: '$600',
            isBigWin : true
        }
    ],

    sprites: [
		{
            fileName: 'background pirates.jpg',   // background image
            name: 'background',
        },
        {
            fileName: 'SpinButton.png',
            name: 'spinbutton',
        },
        {
            fileName: 'SpinButtonHover.png',
            name: 'spinbutton_hover',
        },
        {
            fileName: null,
            name: 'lightsector',
        },
        {
            fileName: 'Pointer.png',
            name: 'pointer',
        },
        {
            fileName: null,
            name: 'centerpin',
        },
        {
            fileName: 'Wheel_6.png',
            name: 'wheel',
        },
        {
            fileName: 'WheelBorder.png',
            name: 'wheelborder',
        },
        {
            fileName: 'PointerBlast.png',
            name: 'pointerblast',
        }
    ],

    // wheel spin duration range, in milliseconds
    rotationTimeRange: {
        min: 3000,
        max: 4000
    },

    // wheel rounds before it stops
    wheelRounds: {
        min: 3,
        max: 4
    },

    // degrees the wheel will rotate in the opposite direction before it stops
    backSpin: {
        min: 1,
        max: 4
    },
    
    // win light sector tween duration
    lightTweenDuration : 500,

    createWheel: function(scene) {
        let depth = 0;

        function addSprite (spriteName, posX, posY, _depth)
        {
          var _sprite =  scene.addSpriteLocPos(spriteName, posX, posY); 
          _sprite.setDepth(_depth); 
          return _sprite;
        }
        
        // add sprites
        // Background full size - extra large to cover all screen
        scene.background = scene.add.sprite(scene.centerX, scene.centerY, 'background');
        scene.background.setDisplaySize(2400, 1400);  // Larger than canvas to ensure full coverage
        scene.background.setDepth(depth-1);
        
        scene.wheelborder = addSprite('wheelborder', 0, 1+50, depth);

        scene.wCont = scene.add.container(scene.centerX, scene.centerY +50); 

        scene.wheel = addSprite("wheel", 0 - scene.wCont.x, 50 - scene.wCont.y, depth)?.setOrigin(0.5, 0.5).setAngle(0);
        
        // Add golden glow effect to wheel
        if (scene.wheel && scene.wheel.postFX) {
            scene.wheel.postFX.addGlow(0xFFD700, 4, 0, false, 0.1, 24);
        }
        
        // scene.lightsector = addSprite('lightsector', 0, 0, depth)?.setAlpha(0)?.setOrigin(0.5, 0.95);

        // setup spin button
        scene.spinbutton = addSprite('spinbutton', 0, 630, depth); 
        scene.spinbutton.on('pointerdown', scene.spinDown, scene);
        scene.spinbutton.on('pointerup', scene.spinUp, scene);
        scene.spinbutton.on('pointerover', scene.spinOver, scene);
        scene.spinbutton.on('pointerout', scene.spinOut, scene);
        scene.spinbutton.setInteractive();

        scene.pointer = addSprite('pointer', 0, -10+50, depth).setOrigin(0.5, 0.35);
        // scene.centerpin = addSprite('centerpin', 0, 30, depth);
        scene.pointerBorder = addSprite('pointerblast', 0, -100+50, depth).setVisible(false);

        // adding the text field
        scene.prizeText = scene.add.bitmapText(scene.centerX, scene.centerY + 520, 'gameFont_1', 'SPIN THE WHEEL', 48, 1).setOrigin(0.5);
        scene.prizeText.tint = wheelConfig.prizeTextTint;

        // create wheel with sectors
        scene.wCont.add(scene.wheel);
        scene.wCont.angle = 0;

        var offsetSectText = 120;
        var sectAngle = Math.PI * 2 / scene.sectorsCount;
        var piD2 = Math.PI / 2;
        for(var i = 0; i < scene.sectorsCount; i++)
        {
            var posX = offsetSectText * Math.cos (-sectAngle * i - piD2);
            var posY = offsetSectText * Math.sin (-sectAngle * i - piD2);
            scene.sectorsText[i] = scene.add.bitmapText(posX,  posY, 'gameFont_1', wheelConfig.sectors[i].text, 36, 1).setOrigin(0, 0.5);
            scene.sectorsText[i].tint = wheelConfig.sectorsTextTint;
            scene.sectorsText[i].angle = (-sectAngle * i - piD2) * 180/Math.PI;
            scene.wCont.add(scene.sectorsText[i]);
        }
    },

    sectorWinAnim: function(scene)
    {
        scene.pointerBorder.setVisible(true);
        scene.sectorsText[scene.rand_sector].setAlpha(1).setTint(this.winSectorsTextTint);
        scene.sectorsText[scene.rand_sector].setFont('gameFont_2');
        scene.animTextSector();
    },

    cancelsectorWinAnim: function(scene){
        scene.pointerBorder.setVisible(false);
        if(scene.sectorTextTween != null)
        {
            scene.sectorTextTween.stop();
            scene.sectorsText[scene.rand_sector].setAlpha(1).setTint(this.sectorsTextTint);
            scene.sectorsText[scene.rand_sector].setFont('gameFont_1');
        }
    }
}





   

