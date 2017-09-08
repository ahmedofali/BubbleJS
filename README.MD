### A lightweight JavaScript library for creating Bubbles
------------------------------
### `Usage`

Load bubbles.js and configure the particles:

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
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 80,
        "size_min": 0.1
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 12
    }
  }
}
```

-------------------------------
