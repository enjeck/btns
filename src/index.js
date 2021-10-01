import "./styles.css";
import jQuery from "jquery";
const $ = jQuery.noConflict();

$(function () {
  setTimeout(displayHTML, 100);
});

function displayHTML() {
  $(".btn").on("click", function (e) {
    $(".code-area").css("transform", "translateY(0%)");
    e.preventDefault();
    let outer = $(this).prop("outerHTML");
    $(".html-code").text(outer);
  });
}

// Declare selector variable and stylesheet constant (using 2nd stylesheet from the array)
let myClass = "";
const myStylesheet = $.makeArray(document.styleSheets[0].cssRules).filter(
  ({ selectorText }) => selectorText && selectorText.includes(myClass)
);

$(function () {
  $(".btn").on("click", function () {
    $(".css-code").empty();
    let thisButton = $(this);
    let classes = thisButton.attr("class").split(" ");
    classes.forEach(function (item1, index, array) {
      // Create class selector
      item1 = "." + item1;
      myClass = item1;
      //console.log(thisButton);
      showCss(item1, myStylesheet);
    });
  });
});

function getSelectorCss(selector, stylesheet) {
  // myClass - the class of which CSS we want to grab
  // myStylesheet - Array from the selected stylesheet that matches myClass
  // item - item in the myStylesheet array
  // mySelector - selector from item
  // index - index of the item in the myStylesheet array

  let theSel = [];
  let theCss = [];

  stylesheet.forEach(function (item, index, array) {
    var mySelector = item.selectorText;
    var selectorRegex = new RegExp(
      selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "(?:[:\\s].*)?$"
    ); //regex rule to match the given class and all variations (:before, :hover etc)
    var matchingSelector = mySelector.match(selectorRegex); // Find those selectors that match 'selector' (contains it in some form)
    var finalSelector = "";

    // If mySelector matches:

    if (matchingSelector !== null) {
      //If mySelector contains commas, split it into an array
      let selectorLoopResult = ""; // the ultimate selector used for final result

      //console.log(mySelector);
      //console.log(thisButton);

      if (mySelector.match(/,/)) {
        //if mySelector has commas:
        let mySelectorArray = mySelector.split(","); //split into array where commas separate items
        mySelectorArray.forEach(function (itemP, indexP) {
          //cycle through the array
          let regexSelector = new RegExp(selector + ".*");
          finalSelector = itemP.match(regexSelector);
          if (finalSelector !== null) {
            selectorLoopResult = finalSelector[0];

            return selectorLoopResult;
          } else {
            return;
          }
        });
      } else {
        selectorLoopResult = matchingSelector[0];
      }

      let itemCss = item.cssText;
      itemCss = itemCss.substring(itemCss.indexOf("{"));
      itemCss = itemCss.replace(/[{}]/g, "");
      let theSelectorIndex = theSel.indexOf(selectorLoopResult);

      //If selector already in the array, find its corresponding CSS
      // and add to that rule instead of duplicating the same selector rule
      if (theSelectorIndex === -1) {
        theSel.push(selectorLoopResult);
        theCss.push(itemCss);
      } else {
        itemCss = itemCss.substring(1);
        let newCssRule = theCss[theSelectorIndex] + itemCss;
        theCss[theSelectorIndex] = newCssRule;
      }
    }
  });
  return [theSel, theCss];
}

function showCss(selector, stylesheet) {
  let buttonStyles = getSelectorCss(selector, stylesheet);
  buttonStyles[0].forEach(function (item, index, array) {
    $(".css-code").append(buttonStyles[0][index] + " {");
    $(".css-code").append("<br>");
    let string = buttonStyles[1][index];
    let cssArray = string.split(/;/);

    cssArray = cleanArray(cssArray);

    cssArray.forEach(function (item, index, array) {
      item += ";";
      $(".css-code").append(" " + item + "<br>");
    });
    $(".css-code").append("} <br>");
    $(".css-code").append(" ");
    $(".css-code").append("<br>");
  });
}

//removes white space element and duplicates.
function cleanArray(array) {
  let array2 = [];
  //arraySplit = [];

  if (array[array.length - 1] === " ") {
    array.pop();
  }

  while (array.length > 0) {
    let cssItem = array[array.length - 1];
    array2.push(cssItem);
    array.pop();
  }

  return array2.reverse();
}

/* Close code area */
$(function () {
  $(".close-icon").on("click", function () {
    $(".code-area").css("transform", "translateY(110%)");
  });
});

$(function () {
  let tooltip = document.getElementById("htmlTooltip");
  $("#copy-html").on("click", function () {
    let copiedText = $(".html-code").text();
    document.getElementById("cliphold").value = copiedText;
    let copyText = document.getElementById("cliphold");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    tooltip.innerHTML = "Copied: HTML";
  });
  $("#copy-html").on("mouseleave", function() {
    tooltip.innerHTML = "Copy to clipboard";
  })
});

$(function () {
  let tooltip = document.getElementById("cssTooltip");
  $("#copy-css").on("click", function () {
    let copiedText = $(".css-code").text();
    document.getElementById("cliphold").value = copiedText;
    let copyText = document.getElementById("cliphold");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    tooltip.innerHTML = "Copied: CSS";
  });
  $("#copy-css").on("mouseleave", function() {
    tooltip.innerHTML = "Copy to clipboard";
  })
});
