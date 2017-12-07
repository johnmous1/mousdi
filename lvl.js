var lvl={
    function preload() {
    
    this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
          
            this.load.spritesheet('koopa','assets/Koopa_Troopa.png',19,24);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
			this.load.tilemap('level', 'assets/2016174.json', null,
            Phaser.Tilemap.TILED_JSON);
             this.load.spritesheet('Bonus', 'assets/bonus.png', 16, 16);
            this.load.audio('soundtrack', ['sound/mario.mp3']);
            this.load.audio('dies', ['sound/die.wav']);
            this.load.audio('coin', ['sound/coin.wav']);
            this.load.audio('jump', ['sound/jump.wav']);
            this.load.audio('kill', ['sound/kick.wav']);
  }

function create(){
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)
    game.stage.backgroundColor = '#5c94fc';
    map = game.add.tilemap('level');
	map.addTilesetImage('tiles', 'tiles');
	map.setCollisionBetween(3, 12, true, 'solid');
    map.createLayer('background');
			layer = map.createLayer('solid');
			layer.resizeWorld();
			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');
            
            bonus = game.add.group();
			bonus.enableBody = true;
			map.createFromTiles(2, null, 'Bonus', 'bonus', bonus);
			bonus.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			bonus.callAll('animations.play', 'animations', 'spin');
             
			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);
            ///////////////////////////////////////
            koopa = game.add.group();
			koopa.enableBody = true;
			map.createFromTiles(22, null, 'koopa', 'stuff', koopa);
			koopa.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					3, true);
			koopa.callAll('animations.play', 'animations', 'walk');
			koopa.setAll('body.bounce.x', 1);
			koopa.setAll('body.velocity.x', -20);
			koopa.setAll('body.gravity.y', 500);
            
    player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
           // player.amimations.add('dead',[6],1);
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;
			game.camera.follow(player);
			cursors = game.input.keyboard.createCursorKeys();
             music.play();
}
function update() {
			game.physics.arcade.collide(player, layer);
            game.physics.arcade.collide(koopa, layer);
            game.physics.arcade.collide(goombas, layer);
            game.physics.arcade.overlap(player, koopa, koopaOverlap);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
            game.physics.arcade.overlap(player, bonus, BonusOverlap);
			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}
				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
                    jumps.play();
					player.animations.stop();
				}
				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
                        
				}
			}
		}


}