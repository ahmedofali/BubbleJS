/* -----------------------------------------------------------------
 /* Author : Ahmed Ali  - vincentgarreau.com
 /* MIT license: http://opensource.org/licenses/MIT
 /* GitHub : https://github.com/ahmedofali/BubbleJS
 /* How to use? : Check the GitHub README
 /* v1.0.0
 /* -------------------------------------------------------------- */
window.BubblerDom = [];

window.BubblerJS = function(tag_id, params){

    this.default_tag_id = "bubbler-js" ;

    this.canvas_class = "bubbles-js-canvas-el" ;

    this.get_tag_id_name = function ( tag_id ){
        // if user did not pass tag id as string put the default
        if( typeof (tag_id) !== "string" || ! tag_id ){
            tag_id = this.default_tag_id ;
        }
        return tag_id ;
    };

    this.remove_canvas_if_exists = function(){
        var BJS_tag = document.getElementById( this.tag_id ),
            BJS_canvas_class = 'bubbles-js-canvas-el',
            exist_canvas = BJS_tag.getElementsByClassName(this.canvas_class);

        /* remove canvas if exists into the BJS target tag */
        if(exist_canvas.length){
            while(exist_canvas.length > 0){
                BJS_tag.removeChild(exist_canvas[0]);
            }
        }
    };

    this.tag_id = this.get_tag_id_name(tag_id) ;

    this.create_canvas_element = function(){
        var canvas_el = document.createElement('canvas');
        canvas_el.className = this.canvas_class;

        /* set size canvas */
        var BJS_tag = document.getElementById( this.tag_id );
        canvas_el.width = BJS_tag.clientWidth ;
        canvas_el.height = BJS_tag.clientHeight;

        return document.getElementById(this.tag_id).appendChild(canvas_el);
    };

    // remove canvas if user added it in tag_id
    this.remove_canvas_if_exists();

    // create canvas element
    var canvas = this.create_canvas_element();

    /* launch bubbles.js */
    if(canvas != null){
        BubblerDom.push(new BJS( this.tag_id, params ));
    }
};


var BJS = function( tag_id, settings ){

    /**
     * User Submitted Settings
     */
    this.settings = settings ;

    /**
     * Finall Settings after merging user | default settings
     * @type {null}
     */
    this.final_configuration = null ;

    /**
     * get default settings
     * @returns {{settings: {number: {value: number}, color: {value: string}, opacity: {value: number, random: boolean, anim: {enable: boolean, speed: number, opacity_min: number}}, size: {value: number, random: boolean, anim: {enable: boolean, speed: number, size_min: number}}, line_linked: {enable: boolean, distance: number, color: string, opacity: number, width: number}, move: {enable: boolean, speed: number}}}}
     */
    this.get_default_settings = function() {
        return {
            "settings": {
                "number": {
                    "value": 33,
                },
                "color": {
                    "value": "#ffffff"
                },
                "size": {
                    "value": 11.83721462448409,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "size_max": 20
                    }
                },
                "move": {
                    "enable": true,
                    "speed_min": 0.5,
                    "speed_max": 5
                }
            }
        };
    };

    /**
     * Inject Helpers
     * @type {Helpers}
     */
    this.Helpers = new Helpers();

    /**
     * Created Bubbles
     * @type {Array}
     */
    this.bubbles = [] ;

    this.get_color = function(){

        // if user pass object
        if( typeof( BJS.canvas.colors ) == "object" )
        {
            return BJS.canvas.colors[ Math.floor( Math.random() * this.final_configuration.settings.color.value.length ) ] ;
        }
        // if user did not pass string return default one
        else if( typeof( BJS.canvas.colors ) !== "string" )
        {
            return this.get_default_settings().settings.color.value ;
        }

        return BJS.canvas.colors ;
    };

    this.init = function (){
        // reset bubbles called start || resize
        this.bubbles = [] ;

        for( var i = 0 ; i < this.final_configuration.settings.number.value ; i++ )
        {
            var radius = this.get_size();

            var max_size = BJS.canvas.settings.size.anim.size_max ;
            // make sure bubble space do not go out of the frame
            var x = Math.random() * ( BJS.canvas.el.width - radius * 2 ) + radius;
            var y = Math.random() * ( BJS.canvas.el.height - radius * 2 ) + radius;

            // velocity settings
            var dx = this.Helpers.get_random_number( BJS.canvas.settings.move.speed_min , BJS.canvas.settings.move.speed_max ) ;
            var dy = this.Helpers.get_random_number( BJS.canvas.settings.move.speed_min , BJS.canvas.settings.move.speed_max ) ;

            this.bubbles.push( new Bubble( x, y, dx, dy, radius , this.get_color(), .5 , BJS.canvas.settings.size.anim.speed ) ) ;
        }
    };

    this.addEventListeners = function (){

    };

    this.animationManager = function(){
        requestAnimationFrame( this.animationManager.bind( this ) );

        BJS.canvas.context.clearRect( 0 , 0 , BJS.canvas.el.width , BJS.canvas.el.height );

        this.bubbles.forEach( function( bubble ){
            bubble.update();
        });
    };


    this.set_size = function ( size ){
        if ( size.random == true ){
            BJS.canvas.size = null ;
        }else{
            BJS.canvas.size = size.value ;
        }
    };

    this.get_size = function(){
        if( BJS.canvas.size == null ){
            return Math.floor( ( Math.random() * BJS.canvas.settings.size.anim.size_min ) + BJS.canvas.settings.size.anim.size_min ) ;
        }
        return BJS.canvas.size ;
    };


    this.start = function(){
        // merge user config with default config
        this.final_configuration = this.Helpers.deepExtend( this.get_default_settings() , this.settings ) ;

        BJS.canvas = {};
        BJS.canvas.el = document.querySelector('#'+tag_id+' > .bubbles-js-canvas-el');
        BJS.canvas.context = BJS.canvas.el.getContext("2d");
        BJS.canvas.settings = this.final_configuration.settings;
        BJS.canvas.colors = this.final_configuration.settings.color.value ;

        this.set_size( this.final_configuration.settings.size );

        // add interactivity
        this.addEventListeners();

        // create bubbles instances
        this.init();

        // create animation recursive loop
        this.animationManager();
    };

    // start Bubblerjs
    this.start();
};

/**
 * @param x
 * @param y
 * @param dx
 * @param dy
 * @param radius
 * @param minRadius
 * @param color
 * @param opacity
 * @constructor
 */
var Bubble = function( x, y, dx, dy, radius, color, opacity ,size_speed ){
    this.x = x ;
    this.y = y ;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius ;
    this.color = color ;
    this.opacity = opacity ;
    this.size_speed = size_speed;

};

// for memory problems we need this function to be shared between all instances of the class Bubble
Bubble.prototype.draw = function(){
    BJS.canvas.context.beginPath();
    BJS.canvas.context.arc( this.x , this.y ,this.radius, 0 ,Math.PI * 2 ,false ) ;
    BJS.canvas.context.fillStyle = this.color ;
    BJS.canvas.context.fill();
};

Bubble.prototype.update_radius = function(){
    if( BJS.canvas.settings.size.anim.enable == true ){
        if( this.radius > BJS.canvas.settings.size.anim.size_max || this.radius < BJS.canvas.settings.size.anim.size_min ){
            this.size_speed = -this.size_speed ;
        }

        this.radius += this.size_speed ;
    }
}

Bubble.prototype.update_position = function(){
    if( BJS.canvas.settings.move.enable == true ){
        if(
            this.x + this.radius >= BJS.canvas.el.width || this.x - this.radius <= 0
        ){
            this.dx = -this.dx;
        }

        if(
            this.y + this.radius >= BJS.canvas.el.height || this.y - this.radius <= 0
        ){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}

Bubble.prototype.update = function(){
    this.update_position();
    this.update_radius();
    this.draw();
};


var Helpers = function(){

    this.deepExtend = function(destination, source) {
        for (var property in source) {
            // check if the source property is object
            if ( source[property] && source[property].constructor &&  source[property].constructor === Object )
            {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            }
            else
            {
                destination[property] = source[property];
            }
        }
        return destination;
    };

    this.get_random_number = function ( min , max ){
        return Math.floor( Math.random() * ( max - min ) + min ) ;
    }
};