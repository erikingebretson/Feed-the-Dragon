#Game - Feed the Dragon

##Background:
    Feed the Dragon is a interactive game where the user will need to save thier village by offer food to the hungry dragon. The user can move their player across the board, visiting village structures, in search of food for the dragon. However, if they do not find enough food before the dragon get's angry, the player loses and the village is gone.

    Structures in the village will be randomized in thier location and food supply. Also, the user must alternate between structures in search of food, one visit to a structure will render one food item untill another structure has been visited.

    Each incremental level will incorporate fewer structures, a less patient dragon, as well as other potential challenges awaiting the user.

##Functionality & MVPs
    1. In Feed the Dragon, users will be able to:
        - Start and reset a Game
        - Toggle sound on and off
        - Navigate on the board, move the player around board coordinates to visit fixed structures/elements on the board 
        - Reveal the content of a structure
    2. In addition, this project will include
        - A Popup style how to instructions element
        - README File
        - Possible Next steps:
            - CSS Animations for
                1. Game instantiation: scrolling circle
                2. The Dragon’s patience: load bar
            - Character Engagement 
                1. When a user finds food, the user icon in the legend will make a positive movement
                2. When the dragon is getting impatient, the dragon and character icons in the legend will start to vibrate


##Wireframe - [wireframe](https://wireframe.cc/r2fDcG)

##Technologies, Libraries, API’s
    1. Canvas(potentially SVG) Animations to render Board and players
    2. CSS animations sprinkled in for surprise and delight in user experience
    3. Javascript source files bundled via Webpack

##Implementation Timeline
    1. Weekend:
        - Write Final proposal and create project, starting the required object oriented programming for each class required (board, structure, user, game)
    2. Monday:
        - Wrap up object creation and logic for instantiating a game and the required structures and player
    3. Tuesday:
        - Render pieces and player on board, and any logic updates needed for formatting pieces
        - Thorough QA of player and structures
        - Begin implementation of player controlls
    4. Wednesday:
        - Finalize user controlls and timer logic
        - CSS animations Dragon patience, load wheel, etc.
    5. Thursday:
        Any outstanding functionality updates and finishing touches on styling