// 6 sectors christmas

var wheelConfig = {
    assetPath : 'christmas/',
    centerOffsetX: 0,
    centerOffsetY: -160,
    prizeTextTint : 0xFFFFFF,
    sectorsTextTint : 0xFFFFFF,
    
    fonts: [
        {
            fontName: 'gameFont_1',
            filePNG:  'fonts/roboto_72_1.png',
            fileXML:  'fonts/roboto_72_1.xml'
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
            fileName: 'LightSector_6.png',
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
            fileName: 'Wheel_6.png', //5
            name: 'wheel',
        },
        {
            fileName: 'WheelBorder.png',
            name: 'wheelborder',
        },
        {
            fileName: 'PointerBorder.png',
            name: 'pointerborder',
        },
        {
            fileName: 'Lamp.png',
            name: 'lamp_off',
        },
        {
            fileName: 'LampOn.png',
            name: 'lamp_on',
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
        // scene.background = addSprite('background', 0, 0, depth)?.setScale(1.5);
        scene.wheelborder = addSprite('wheelborder', 0, 70, depth);

        scene.wCont = scene.add.container(scene.centerX, scene.centerY + 69); 

        scene.wheel = addSprite("wheel", 0 - scene.wCont.x, 69 - scene.wCont.y, depth)?.setOrigin(0.5, 0.5).setAngle(0);
        scene.lightsector = addSprite('lightsector', 0, 69, depth)?.setAlpha(0)?.setOrigin(0.5, 0.94);

        // setup spin button
        scene.spinbutton = addSprite('spinbutton', 0, 630, depth); 
        scene.spinbutton.on('pointerdown', scene.spinDown, scene);
        scene.spinbutton.on('pointerup', scene.spinUp, scene);
        scene.spinbutton.on('pointerover', scene.spinOver, scene);
        scene.spinbutton.on('pointerout', scene.spinOut, scene);
        scene.spinbutton.setInteractive();

        scene.pointer = addSprite('pointer', 0, -230, depth).setOrigin(0.5, 0.2);
        scene.centerpin = addSprite('centerpin', 0, 98, depth);


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
        this.createLamps(scene);
        scene.pointerBorder = addSprite('pointerborder', 0, -230, depth); // over lamps
    },

    sectorWinAnim: function(scene)
    {
       scene.animLightSector();
       scene.lampsBlink(true);
    },

    cancelsectorWinAnim: function(scene){
        if(scene.lightTween != null)
        {
            scene.lightTween.stop();
            scene.lightsector.setAlpha(0);
        }
        scene.lampsBlink(false);
    },

    createLamps: function(scene){
        var lCount = 9; var lOffset = 335; var dY = 70; 
        scene.lampsArray = []; 
        var angle = Math.PI * 2 / (lCount + 1);
        var piD2 = Math.PI / 2;

        for(var i = 1; i < lCount + 1; i++)
        {
            var _angle = -angle * i - piD2;
            var _cos = Math.cos (_angle);
            var _sin = Math.sin (_angle)

            var posX = lOffset * _cos;
            var posY = lOffset * _sin;
            scene.lamp = new Lamp (scene, posX, posY + dY);
            scene.lamp.off();
            scene.lampsArray.push(scene.lamp);
        }
    },
}





   

