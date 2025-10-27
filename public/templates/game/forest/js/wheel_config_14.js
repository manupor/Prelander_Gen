// 14 sectors forest

var wheelConfig = {
    assetPath : 'forest/',        // relative path to asset folder
    centerOffsetX: 0,           // wheel offset from canvas center X
    centerOffsetY: -160,        // wheel offset from canvas center Y
    prizeTextTint : 0xFFFFFF,
    sectorsTextTint : 0x2c2c2c,
    winSectorsTextTint : 0xffffff,

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
            isBigWin : false
        },
		{
            win:700,
            text: '$700',
            isBigWin : false
        },
        {
            win: 800,
            text: '$800',
            isBigWin : false
        },
		{
            win:900,
            text: '$900',
            isBigWin : false
        },
        {
            win: 1000,
            text: '$1000',
            isBigWin : false
        },
		{
            win:1100,
            text: '$1100',
            isBigWin : false
        },
        {
            win: 1200,
            text: '$1200',
            isBigWin : false
        },
		{
            win:1300,
            text: '$1300',
            isBigWin : false
        },
        {
            win: 1400,
            text: '$1400',
            isBigWin : true
        }
    ],

    sprites: [
		{
            fileName: null,   // filename or null
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
            fileName: 'CenterPin.png',
            name: 'centerpin',
        },
        {
            fileName: 'Wheel_14.png',
            name: 'wheel',
        },
        {
            fileName: 'WheelBorder.png',
            name: 'wheelborder',
        },
        {
            fileName: null,
            name: 'pointerborder',
        },
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
        scene.wheelborder = addSprite('wheelborder', 0, 60, depth);

        scene.wCont = scene.add.container(scene.centerX, scene.centerY + 92); 

        scene.wheel = addSprite("wheel", 0 - scene.wCont.x, 92 - scene.wCont.y, depth)?.setOrigin(0.5, 0.5).setAngle(0);
        // scene.lightsector = addSprite('lightsector', 0, 0, depth)?.setAlpha(0)?.setOrigin(0.5, 0.95);

        // setup spin button
        scene.spinbutton = addSprite('spinbutton', 0, 630, depth); 
        scene.spinbutton.on('pointerdown', scene.spinDown, scene);
        scene.spinbutton.on('pointerup', scene.spinUp, scene);
        scene.spinbutton.on('pointerover', scene.spinOver, scene);
        scene.spinbutton.on('pointerout', scene.spinOut, scene);
        scene.spinbutton.setInteractive();

        scene.pointer = addSprite('pointer', 0, -248, depth).setOrigin(0.5, 0.3);
        scene.centerpin = addSprite('centerpin', 0, 115, depth);
        // scene.pointerBorder = addSprite('pointerborder', 0, -0, depth);

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
            scene.sectorsText[i] = scene.add.bitmapText(posX,  posY, 'gameFont_1', wheelConfig.sectors[i].text, 38, 1).setOrigin(0, 0.5);
            scene.sectorsText[i].tint = wheelConfig.sectorsTextTint;
            scene.sectorsText[i].angle = (-sectAngle * i - piD2) * 180/Math.PI;
            scene.wCont.add(scene.sectorsText[i]);
        }
    },

    sectorWinAnim: function(scene)
    {
        scene.sectorsText[scene.rand_sector].setAlpha(1).setTint(this.winSectorsTextTint);
        scene.sectorsText[scene.rand_sector].setFont('gameFont_2');
        scene.animTextSector();
    },

    cancelsectorWinAnim: function(scene){
        if(scene.sectorTextTween != null)
        {
            scene.sectorTextTween.stop();
            scene.sectorsText[scene.rand_sector].setAlpha(1).setTint(this.sectorsTextTint);
            scene.sectorsText[scene.rand_sector].setFont('gameFont_1');
        }
    },
}





   

