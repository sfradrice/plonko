// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {

  if (msg.type === 'colorize-page') {
    
    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    let rgbValues = hexToRgb(msg.colorStr);

    if (msg.allPages) {
      const pages = figma.root.findAll(node => node.type === "PAGE")
      for (let i = 0; i < pages.length; i ++) {
        figma.root.children[i].backgrounds = [{type: 'SOLID', color: {r: rgbValues.r / 255, g: rgbValues.g / 255, b: rgbValues.b / 255}}];
      }
    } else {
      let currentPage = figma.currentPage;
      currentPage.backgrounds = [{type: 'SOLID', color: {r: rgbValues.r / 255, g: rgbValues.g / 255, b: rgbValues.b / 255}}];
    }  
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
