window.onload = function() {
    
    var game = new Phaser.Game(400, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render : render });

function preload() {

    game.load.image('player', 'assets/player.png');
    game.load.image('ennemy', 'assets/ennemy.png');
}
    
    var player;
    var cursors;
    var ennemy;
    var cursors;
    
    var score = 0;
    var scoreText;
    var instructions;
    var gameover;
    
    function generateEnnemy () {
        
        // Generate ennemy's random position
        var ennemyX = game.rnd.realInRange(0, 400);
        var ennemyY = game.rnd.realInRange(0, 400);
        ennemy = game.add.sprite(ennemyX, ennemyY, 'ennemy');
        
        // Set the scale of the ennemy to a random value
        var scale = game.rnd.realInRange(0.3, 0.8);
        ennemy.scale.setTo(scale, scale);
        game.physics.arcade.enable(ennemy);
        
        // Adding some vertical velocity to the ennemy 
        ennemy.body.velocity.x = game.rnd.integerInRange(300, 800);
        
        // Adding bounce with bounds to the ennemy 
        ennemy.body.collideWorldBounds=true;
        ennemy.body.bounce.setTo(1, 1);
        return ennemy;
    }
    
    function resetPlayer() {
        // Reset player's position
        player.body.velocity.y = 10;
        player.body.x = game.width/2;
        player.body.y = game.height/1.3; 
    } 
    
    function gameOver () {
        // Print Game Over Stuff
        gameover = game.add.text(game.width/2, game.height/2, 
        "Game over you score :\n "+ score,{
            font:"bold 25px Arial", 
            fill: "#acacac", 
            align: "center"
        });
        gameover.anchor.setTo(0.5, 0.5);
        game.time.events.add(1000, gameover.destroy, gameover);   
        // Score reset
        score = 0;
        scoreText.text = "Score: "+score;	
        
    }
    
    function killEnnemy(player, ennemy) {

        resetPlayer();
        
        // Removes the ennemy from the screen
        ennemy.kill();

        // ++ score and update the scoreText
        score++;
        scoreText.text = "Score: "+score;	

        // Generate a new ennemy
        generateEnnemy();
    }

    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add player sprite's
        player = game.add.sprite(game.width/2, game.height/1.3, 'player');
        
        // Enable physics for player
        game.physics.arcade.enable(player);
        player.body.velocity.y = 10;
        
        // Our controls
        cursors = game.input.keyboard.createCursorKeys();
        
        // Generate ennemy's random position
        ennemyX = game.rnd.realInRange(0, 400);
        ennemyY = game.rnd.realInRange(30, 400);
        ennemy = game.add.sprite(ennemyX, ennemyY, 'ennemy');
        
        // Set the scale of the ennemy to a random value
        var rand = game.rnd.realInRange(0.3, 0.8);
        ennemy.scale.setTo(rand, rand);
        game.physics.arcade.enable(ennemy);
        
        // Adding some vertical velocity to the ennemy 
        ennemy.body.velocity.x = game.rnd.integerInRange(150, 300);
        
        // Adding bounce with bounds to the ennemy 
        ennemy.body.collideWorldBounds=true;
        ennemy.body.bounce.setTo(1, 1);
        
        // Display the score 
        scoreText = game.add.text(10,10,"Score: 0",{
            font:"bold 16px Arial",
            fill: "#acacac"
            });
        
        // Display game instructions
        instructions = game.add.text(game.width/2, game.height/2, 
        "Use up key to fire, \n Have fun !",{
            font:"bold 25px Arial", 
            fill: "#acacac", 
            align: "center"
        });
        instructions.anchor.setTo(0.5, 0.5);
        game.time.events.add(1000, instructions.destroy, instructions);    
    }


function update() {
    // Check if there is a collision between player and ennemy
    game.physics.arcade.overlap(player, ennemy, killEnnemy, null, this);
    //  Killing the ennemy :p
    if (cursors.up.isDown) {
        player.body.velocity.y = -800;
    }
    if (player.y < 0) {
        resetPlayer();
        gameOver();  
    } else if (player.y > game.height) {
        gameOver();   
    }
}
    
function render() {

    }
}

