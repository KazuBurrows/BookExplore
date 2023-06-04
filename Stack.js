


class Stack {
  // constructor
  constructor()
  {
    this.stack = [];
    this.blocked = false;

  }



  /**
   * Add a 'book' in 'Stack'
   *    [0, 1] add 2 -> [0, 1, 2]
   * @param {Object} book
   */
  add(book) {

    this.stack.push(book);
    this.releaseBlock();

  }



  /**
   * Remove a 'book' from 'Stack'
   *    [0, 1, 2]   '2' will be removed from 'Stack'
   */
  remove() {
    this.stack.pop();
    // this.stack.shift();
    this.releaseBlock();

  }



  /**
   * Retrieve first 'book' from stack
   *    [0, 1, 2]   '2' will be first in 'Stack'
   * @returns {object} 'book'
   */
  get() {
    let stack_size = this.stack.length;

    if (stack_size <= 0) {
      return null;
    }
    

    return this.stack[stack_size - 1];
    // return this.stack[0];
  }



  /**
   * An async function will request a block on 'Stack'
   * @returns {boolean} Boolean will comfirm permission to async function to use or not use stack
   */
  requestBlock() {
    if (!this.blocked) {
      this.blocked = true;

      return true;          /**Request approved */
    }

    return false;           /**Request denied */
  }



  /**
   * Stop blocking 'stack'
   * private function
   */
  releaseBlock() {
    this.blocked = false;
    
  }



  /**
   * 
   * @returns {boolean}
   */
  isEmpty() {
    if (this.stack.length <= 0) {
      return true;

    } else {
      return false;

    }

  }



  /**
   * Console.log() everything in stack
   */
  printStack() {
    console.log("Current stack: ", this.stack);
    console.log("Blocking: ", this.blocked);


  }

  

  /**
   * Returns the size of current stack
   * @returns {integer}
   */
  printStackSize() {
    try {
      console.log("Current stack size: ", this.stack.length);
      console.log("Blocking: ", this.blocked);

    } catch {
      console.log("Current stack size: ", 0);
      console.log("Blocking: ", this.blocked);
    }


  }


}




exports.Stack = Stack;