
/* 
 * Documenting Functions:
 *
 * I prefer to use javadoc style for documenting my code. It lets you 
 * include the documentation for functions and methods right at their 
 * declaration.
 * 
 * There's lots of different ways to handle this, so the only important
 * thing to remember is to pick a style and stick with it.
 * 
 *  http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html
 */

/*
 * Function Naming Conventions:
 *
 * I like to use a naming convention similar to that used in Objective-C.
 * Each variable in a function should be referenced by a part of the 
 * function's name. So, for this example, we can break this function's name 
 * up like so:
 *
 * createElement -> elementType
 * WithClass -> cssClass
 * WithText -> innerText
 *
 * Using this naming convention for your functions and methods will help 
 * your code be more self-documenting.
 *
 * DISCLAIMER: I do not ALWAYS use this naming convention. Sometimes,
 * if I feel that a simpler name for a function is all that is needed,
 * that's all I'll use. Example in this pen - the createFlash function.
 * I felt that name was descriptive enough by itself, without referencing
 * the variable names in the function name.
 */

/* 
 * IFFEs - Immediately Invoked Function Expressions. We wrap our code in
 * these ( (function() {}).call(this) ) to make sure that our variables 
 * are declared in a local scope.
 *
 * If you need to provide functionality to an external script, then you
 * need to use the Javascript Module Pattern.
 * 
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 */
      
(function() {
  /* 
   * You should alwasy declare your variables at the top of the scope
   * because it ensures that you don't run into any unexpected errors
   * that occur due to variable hoisting.
   *
   * http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
   */
  var createElementWithClassWithText, createFlash, removeFlash;

  createElementWithClassWithText = function(elementType, cssClass, innerText) {

    /*
     * createElementWithClassWIthText 
     * (String, String, String) -> HTMLElement
     * 
     * Returns an HTML element with the supplied class and text node.
     *
     * @parem elementType The type of element to construct.
     * 
     * @param cssClass A string, either a single CSS class, or a space-
     * delimited list of classes.
     * 
     * @param innerText The text that the element should contain.
     *
     * @return The constructed HTML element with all attributes and text 
     * nodes set.
     */
    
    var el;
    el = document.createElement(elementType);
    el.className = cssClass;
    el.innerText = innerText;
    return el;
  };


  createFlash = function(title, message, type) {
    
    /*
     * createFlash
     * (String, String, String) -> HTMLEleemnt
     *
     * Helper function for creating flash objects. Creates and assembles
     * a flash with the specified title and message. Can vary the type
     * of flash to be created as well.
     *
     * @param title The text to be used in the flash-*-title element.
     *
     * @param message The text to be used in the flash-*-message element.
     *
     * @param type The type of flash to construct. (alert or info)
     *
     * @return The constructed and assembled flash HTML element.
     */
    
    var flashCloseIcon, flashContainer, flashMessage, flashTitle;
    switch (type) {
      case 'alert':
        flashContainer = createElementWithClassWithText('div', 'flash-alert-container', '');
        flashTitle = createElementWithClassWithText('h1', 'flash-alert-title', title);
        flashMessage = createElementWithClassWithText('p', 'flash-alert-message', message);
        flashCloseIcon = createElementWithClassWithText('div', 'flash-alert-close-icon js-close-icon', '');
        break;
      case 'info':
        flashContainer = createElementWithClassWithText('div', 'flash-info-container', '');
        flashTitle = createElementWithClassWithText('h1', 'flash-info-title', title);
        flashMessage = createElementWithClassWithText('p', 'flash-info-message', message);
        flashCloseIcon = createElementWithClassWithText('div', 'flash-info-close-icon js-close-icon', '');
        flashContainer.appendChild(flashTitle);
        break;
    }
    flashContainer.appendChild(flashTitle);
    flashContainer.appendChild(flashMessage);
    flashCloseIcon.onclick = removeFlash;
    flashContainer.appendChild(flashCloseIcon);
    return flashContainer;
  };
  
  removeFlash = function() {
    
    /*
     * removeFlash
     * (Void) -> Void
     *
     * Removes a flash object from the DOM.
     *
     * @param Void This function takes no arguments.
     *
     * @return Void This function returns no value.
     */
    
    var flash;
    flash = this.parentNode;
    $(flash).fadeOut(250, function() {
      flash.parentNode.removeChild(flash);
    });
  };
  
  /*
   * Event Handlers:
   * 
   * I usually keep the documentation for event handlers pretty simple. 
   * Generally, they're fairly self-documenting, so you don't always have 
   * to be as robust with your commenting. Also, they all have the same 
   * function signature, so there's not always a need to include javadoc 
   * style comments with them.
   */

  $('.js-create-flash').click(function(e) {
    var flash;
    flash = createFlash('Example Flash', 'This is an example flash.', Math.random() > 0.5 ? 'info' : 'alert');
    flash.setAttribute('style', 'display: none;');
    $('#flashes-container').append(flash);
    $(flash).fadeIn(250);
  });
  
  $('.js-close-icon').click(removeFlash);

}).call(this);