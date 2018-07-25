/**
 * @freesewing/plugin-theme | v0.3.0
 * A freesewing plugin that provides a default theme
 * (c) 2018 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */
"use strict";
var style =
    'path,circle,rect{fill:none;stroke:none}path{stroke:#000;stroke-opacity:1;stroke-width:.3;stroke-linecap:round;stroke-linejoin:round}path.fabric{stroke-width:.6;stroke:#653f95}path.lining{stroke-width:.6;stroke:#0275d8}path.interfacing{stroke-width:.6;stroke:#d9534f}path.canvas{stroke-width:.6;stroke:#5cb85c}path.various{stroke-width:.6;stroke:#5bc0de}path.sa{stroke-dasharray:.4,.8}path.help{stroke-width:.2;stroke-dasharray:15,1.5,1,1.5}path.hint{stroke-width:.2;stroke-dasharray:.4,.8}text{font-size:5px;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;fill:#000;text-anchor:start;font-weight:200}.text-xs{font-size:3px}.text-sm{font-size:4px}.text-lg{font-size:7px}.text-xl{font-size:9px}.text-center{text-anchor:middle}.stroke-xs{stroke-width:.1}.stroke-sm{stroke-width:.2}.stroke-lg{stroke-width:.6}.stroke-xl{stroke-width:1}.stroke-xxl{stroke-width:2}.dashed{stroke-dasharray:1,1.5}.lashed{stroke-dasharray:6,6}.dotted{stroke-dasharray:.4,.8}.hidden{stroke:none;fill:none}',
  snippets =
    '<g id="notch"><circle cy="0" cx="0" r="1.4" class="fill-mark" /><circle cy="0" cx="0" r="2.8" class="stroke-mark stroke-xl" /></g>',
  version = "0.3.0",
  index = {
    hooks: {
      preRenderSvg: function(t) {
        (this.style += style),
          (this.defs += snippets + logo),
          this.attributes.add("freesewing:plugin-theme", version),
          t();
      }
    }
  };
module.exports = index;