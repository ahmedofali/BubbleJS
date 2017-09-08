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
        canvas_el.style.width = "100%";
        canvas_el.style.height = "100%";

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

    this.settings = settings ;

    this.final_configuration = null ;

    this.get_default_settings = function() {
        return {
            "settings": {
                "number": {
                    "value": 33,
                },
                "color": {
                    "value": [ "#225378" , "#1695A3" , "#ACF0F2" , "#F3FFE2" , "#EB7F00" ]
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

    this.Helpers = new Helpers();

    this.init = function (){

    }

    this.addEventListeners = function (){

    }

    this.animationManager = function(){

    }

    this.start = function(){
        // merge user config with default config
        this.final_configuration = this.Helpers.deepExtend( this.get_default_settings() , this.settings ) ;

        // add interactivity
        this.addEventListeners();

        // create bubbles instances
        this.init();

        // create animation recursive loop
        this.animationManager();
    }

    // start Bubblerjs
    this.start();
}


var Bubble = function( x, y, dx, dy, radius, minRadius, color, opacity ){
    this.x = x ;
    this.y = y ;
    this.dx = dx ;
    this.dy = dy ;
    this.radius = radius ;
    this.minRadius = minRadius ;
    this.color = color ;
    this.opacity = opacity ;


}

// for memory problems we need this function to be shared between all instances of the class Bubble
Bubble.prototype.draw = function(){
    
}

Bubble.prototype.update = function(){

}


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

}