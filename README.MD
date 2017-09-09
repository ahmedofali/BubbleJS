### A lightweight JavaScript library for creating Bubbles
------------------------------
### `Usage`

Load bubbles.js and configure the particles:

### `TODO`
- Adding Opacity and Animation for It
- Adding Linked Lines between Bubbles 
- Adding Event Listeners ["resize","mouse_move","click"]
 
### `CodePen Demo`
 https://codepen.io/ahmed-abbas/pen/JygYXE
 
### `Docs`
 https://ahmedofali.github.io/BubbleJS/

 
**index.html**
```html
<div id="bubbler-js"></div>

<script src="bubbler.js"></script>
```

**bubbler.json**
```javascript
{
  "settings": {
    "number": {
      "value": 80
    },
    "color": {
      "value": "#ffffff"
    }
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 80,
        "size_min": 0.1
      }
    },
    "move": {
      "enable": true,
      "speed": 12
    }
  }
}
```

-------------------------------
