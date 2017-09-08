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

}