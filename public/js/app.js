/**
 * The top-level controller for the whole page. This component is responsible
 * for loading other controllers and views.
 */
class App {
	constructor() {
		console.log('court', this.court("Jules", 3, "Adam Betty Frank Mike"));
		// expect 60
		
		console.log('court', this.court("Zane", 1, "Mark Hank Ana Vivian"));
		// expect 150
		
		console.log('court', this.court("Zane", 10, "Mark Hank Ana Vivian"));
		// expect 30
		
		console.log('court2', this.court2("Jules", 3, "Adam Betty Frank Mike"));
		// expect 60
		
		console.log('court2', this.court("Zane", 10, "Mark Hank Ana Vivian"));
		// expect 30
		
		console.log('court2', this.court2("Zane", 1, "Mark Hank Ana Vivian"));
		// expect 150
		
		// test the first version of this count function
		this.testPerformance(this.court.bind(this, "Jules", 10, "Adam Betty Frank Mike"), 'court A');
		this.testPerformance(this.court.bind(this, "Jules", 3, "Adam Betty Frank Mike"), 'court B');
		this.testPerformance(this.court.bind(this, "Zane", 1, "Mark Hank Ana Vivian"), 'court C');
		this.testPerformance(this.court.bind(this, "Zane", 10, "Mark Hank Ana Vivian Joe James Tina Mahira Colum Brennan Sienna Alex George John Steve Nick Mike Ben Luke Anakin Ob-Wan"), 'court D');
		
		// test the second version of the count function
		this.testPerformance(this.court2.bind(this, "Jules", 10, "Adam Betty Frank Mike"), 'court2 A');
		this.testPerformance(this.court2.bind(this, "Jules", 3, "Adam Betty Frank Mike"), 'court2 B');
		this.testPerformance(this.court2.bind(this, "Zane", 1, "Mark Hank Ana Vivian"), 'court2 C');
		this.testPerformance(this.court2.bind(this, "Zane", 10, "Mark Hank Ana Vivian Joe James Tina Mahira Colum Brennan Sienna Alex George John Steve Nick Mike Ben Luke Anakin Ob-Wan"), 'court2 D');
	}
	
	/**
	 * given an array of functions, execute them left to right, passing the 
	 * returned value from each to the next function, then return the final 
	 * result
	 *
	 * @param {Array} an array of functions
	 * @return {*} the result
	 */
	chain(functions) {
	  return function (...args) {
		return functions.reduce((acc, fn) => [fn(...acc)], args)[0];
	  };
	}
	
	/**
	 * given two strings, return an array of them both made all lowercase
	 *
	 * @param {String} first string to make lowercase
	 * @param {String} second string to make lowercase
	 * @return {Array} the array
	 */
	makelower(name, others) {
	  return [name.toLowerCase(), others.toLowerCase()];
	}
	
	/**
	 * given two strings, return an array containing the first string, and an 
	 * array created by splitting the second string
	 *
	 * @param {String} string to pass along to the next function
	 * @param {String} string to split into an array
	 * @return {Array} array containing string and array
	 */
	makearray(args) {
	  return [args[0], args[1].split(" ")];
	}
	
	/**
	 * given an array and a value, return the array with the value pushed into it
	 *
	 * @param {Array} array to sort
	 * @param {String} string to push into the array
	 * @return {Array} the array
	 */
	populatearray(args) {
	  args[1].push(args[0]);
	  return args[1];
	}
	
	/**
	 * given an array and a value, return the array with the value pushed into it
	 *
	 * @param {Array} array to sort
	 * @param {String} string to push into the array
	 * @return {Array} the array
	 */
	populatearray2(args) {
	  args[1].push(args[0]);
	  return [args[1], args[0]];
	}
	
	/**
	 * given an array and a value, return both with the array sorted
	 *
	 * @param {Array} array to sort
	 * @param {String} string to pass along
	 * @return {Array} the array
	 */
	sortarray(args) {
	  return [args[0].sort(), args[1]];
	}
	
	/**
	 * given an array and a value, return the index of that value
	 *
	 * @param {Array} array to search
	 * @param {String} string to look for in array values
	 * @return {Number} the index of the string in the array or -1
	 */
	getindex(args) {
	  return args[0].indexOf(args[1]);
	}
	
	/**
	 * given a function, execute that function while running console.time()
	 *
	 * @param {Function} function to test
	 * @param {String} function to test
	 */
	testPerformance(fn, timername) {
	  console.time(timername);
	  fn();
	  console.timeEnd(timername);
	}
	
	/**
	 * calculates how long the wait will be for a certain person's turn
	 *
	 * @param {String} name - name of the person waiting
	 * @param {Number} judges - number of judges working today - must be integer
	 * @param {String} others - names of other people waiting, space-separated
	 * @return {Number} endtime - time in minutes til name's hearing ends
	 */
	court(name, judges, others) {
	  const geteveryone = this.chain([this.makelower, this.makearray, this.populatearray]);
	  const everyone = geteveryone(name, others);
	  if (everyone.length <= judges.length) {
		return 30;
	  }
	  const getlength = this.chain([this.sortarray, this.getindex]);
	  const length = getlength([everyone, name.toLowerCase()]);
	
	  return Math.ceil((length + 1) / judges) * 30;
	}
	
	/**
	 * calculates how long the wait will be for a certain person's turn
	 *
	 * @param {String} name - name of the person waiting
	 * @param {Number} judges - number of judges working today - must be integer
	 * @param {String} others - names of other people waiting, space-separated
	 * @return {Number} endtime - time in minutes til name's hearing ends
	 */
	court2(name, judges, others) {
	  const getlength = this.chain([this.makelower, this.makearray, this.populatearray2, this.sortarray, this.getindex]);
	  const length = getlength(name, others);
	
	  return Math.ceil((length + 1) / judges) * 30;
	}
}

(function() {
	window.App = new App();
})();
