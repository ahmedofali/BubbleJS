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
                "opacity": {
                    "value": 0.06313181133058181,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1
                    }
                },
                "size": {
                    "value": 11.83721462448409,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6
                }
            }
        };
    }

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
            var x = Math.random() * ( BJS.canvas.el.width - radius * 2 ) + radius ;
            var y = Math.random() * ( BJS.canvas.el.height - radius * 2 ) + radius ;
            var dx = ( Math.random() - 0.5 ) * 4 ;
            var dy = ( Math.random() - 0.5 ) * 4 ;

            this.bubbles.push( new Bubble( x, y, 5, 5, radius , 20, this.get_color(), .5) ) ;
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
            return ( Math.random() * 20 ) + 1  ;
        }
        return BJS.canvas.size ;
    };

    this.start = function(){
        // merge user config with default config
        this.final_configuration = this.Helpers.deepExtend( this.get_default_settings() , this.settings ) ;

        BJS.canvas = {};

        BJS.canvas.el = document.querySelector('#'+tag_id+' > .bubbles-js-canvas-el');

        BJS.canvas.context = BJS.canvas.el.getContext("2d");

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
var Bubble = function( x, y, dx, dy, radius, minRadius, color, opacity ){
    this.x = x ;
    this.y = y ;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius ;
    this.minRadius = minRadius ;
    this.color = color ;
    this.opacity = opacity ;


};

// for memory problems we need this function to be shared between all instances of the class Bubble
Bubble.prototype.draw = function(){
    BJS.canvas.context.beginPath();
    BJS.canvas.context.arc( this.x , this.y ,this.radius, 0 ,Math.PI * 2 ,false ) ;
    BJS.canvas.context.fillStyle = this.color ;
    BJS.canvas.context.fill();
};

Bubble.prototype.update = function(){

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

};