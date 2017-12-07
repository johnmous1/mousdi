var Menu = {
	preload: function() {

		game.load.image('Menu', 'assets/Menu.png');
		game.load.image('lvl', 'assets/play.png');
		

		

	},
	
	create: function() {

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var menupic = game.add.sprite(0, 0, 'Menu');
		

		var click = game.add.button(490 , 320, "lvl", function(){
			game.state.start('lvl');
		});
		click.anchor.set(0.5, 0.5);

		

	}
}