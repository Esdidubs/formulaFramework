;(function(global, $) {
    
    // 'new' an object
    var Formula = function(formName, num1, num2, num3, num4) {
        return new Formula.init(formName, num1, num2, num3, num4);   
    }
    
    // hidden within the scope of the IIFE and never directly accessible
    var supportedFormulas = ['areaSquare', 'areaRectangle', 'areaTriangle', 'areaTriangle2', 'areaRhombus',
                            'areaTrapezoid', 'areaCircle', 'areaSphere', 'areaCube', 'areaCylinder', 
                            'volumeCube', 'volumeParallelepiped', 'volumeRegularPrism', 'volumeCylinder', 'volumeSphere', 
                            'exponent', 'exponentMultiply', 'exponentDivide', 'powerOfPower', 'distanceBetweenPoints',
                            'midPoint', 'pythagorean', 'quadratic' ];
    
    // formulaName: {number of inputs, placeholder of inputs, the formula function, whether it needs units, name of units}
    var formulaSetup = {
        areaSquare: {
            numVars: 1,
            varNames: ['length'],
            solution: function(len){
                return len * len;
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaRectangle: {
            numVars: 2,
            varNames: ['length', 'width'],
            solution: function(len, wid){
                return len * wid;
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaTriangle: {
            numVars: 2,
            varNames: ['base', 'height'],
            solution: function(base, hgt){
                return base * hgt / 2;
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaTriangle2: {
            numVars: 3,
            varNames: ['side 1', 'side 2', 'side 3'],
            solution: function(side1, side2, side3){
                let sides = (side1 + side2 + side3) / 2;
                console.log(sides);
	            return Math.sqrt(sides * (sides - side1) * (sides - side2) * (sides - side3));
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaRhombus: {
            numVars: 2,
            varNames: ['diagonal 1', 'diagonal 2'],
            solution: function(diag1, diag2){
                return diag1 * diag2 / 2;
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaTrapezoid: {
            numVars: 3,
            varNames: ['side 1', 'side 2', 'height'],
            solution: function(side1, side2, hgt){
                return (side1 + side2) / 2 * hgt;
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaCircle: {
            numVars: 1,
            varNames: ['radius'],
            solution: function(rad){
                return rad * rad + '&Pi;';
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaSphere: {
            numVars: 1,
            varNames: ['radius'],
            solution: function(rad){
                return 4 * rad * rad + '&Pi;';
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaCube: {
            numVars: 1,
            varNames: ['side length'],
            solution: function(side){
                return 6 * side * side;
            },
            unitBool: true,
            unit: `units&#178;`
        },
        areaCylinder: {
            numVars: 2,
            varNames: ['radius', 'height'],
            solution: function(rad, hgt){
                return 2 * rad * hgt + '&Pi;';
            },
            unitBool: true,
            unit: `units&#178;`
        },
        volumeCube: {
            numVars: 1,
            varNames: ['side length'],
            solution: function(volume){
                return side * side * side;
            },
            unitBool: true,
            unit: `units&#179;`
        },
        volumeParallelepiped: {
            numVars: 3,
            varNames: ['length', 'width', 'height'],
            solution: function(len, wid, hgt){
                return len * wid * hgt;
            },
            unitBool: true,
            unit: `units&#179;`
        },
        volumeRegularPrism: {
            numVars: 2,
            varNames: ['base', 'height'],
            solution: function(base, hgt){
                return base * hgt;
            },
            unitBool: true,
            unit: `units&#179;`
        },
        volumeCylinder: {
            numVars: 2,
            varNames: ['radius', 'height'],
            solution: function(rad, hgt){
                return rad * rad * hgt + '&Pi;';
            },
            unitBool: true,
            unit: `units&#179;`
        },        
        volumeSphere: {
            numVars: 1,
            varNames: ['radius'],
            solution: function(rad){
                return 4 / 3 * rad * rad * rad + '&Pi;';
            },
            unitBool: true,
            unit: `units&#179;`
        },
        exponent: {
            numVars: 2,
            varNames: ['base number', 'exponent'],
            solution: function(num, exp){
                return Math.pow(num, exp);
            }
        },
        exponentMultiply: {
            numVars: 2,
            varNames: ['exponent 1', 'exponent 2'],
            solution: function(exp1, exp2){
                return exp1 + exp2;
            },
            unitBool: true,
            unit: `X`
        },    
        exponentDivide: {
            numVars: 2,
            varNames: ['exponent 1', 'exponent 2'],
            solution: function(exp1, exp2){
                return exp1 - exp2;
            },
            unitBool: true,
            unit: `X`
        },    
        powerOfPower: {
            numVars: 2,
            varNames: ['exponent 1', 'exponent 2'],
            solution: function(exp1, exp2){
                return exp1 * exp2;
            },
            unitBool: true,
            unit: `X`
        },
        distanceBetweenPoints: {
            numVars: 4,
            varNames: ['x1', 'x2', 'y1', 'y2'],
            solution: function(x1, x2, y1, y2){
                return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            }
        },
        midPoint: {
            numVars: 4,
            varNames: ['x1', 'x2', 'y1', 'y2'],
            solution: function(x1, x2, y1, y2){
                let xMid = (x1 + x2) / 2;
	            let yMid = (y1 + y2) / 2;
                return xMid + ', ' + yMid;
            }
        },
        pythagorean: {
            numVars: 3,
            varNames: ['a', 'b', 'c'],
            solution: function(a, b, c){
                var ans;
                if (a === 0) {
                    ans = Math.sqrt(c * c - b * b);
                } else if (b === 0) {
                    ans = Math.sqrt(c * c - a * a);
                } else if (c === 0) {
                    ans = Math.sqrt(a * a + b * b);
                } else {
                    ans = "ERROR: ONLY PROVIDE 2, NOT 3"
                }
                return ans;
            }
        },
        quadratic: {
            numVars: 3,
            varNames: ['a', 'b', 'c'],
            solution: function(a, b, c){
                let ans1 = (-1 * b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
                let ans2 = (-1 * b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
                return ans1 + ", " + ans2;
            }
        }        
        
    }     
    
    
    // prototype that holds methods (to save memory space); 'this' refers to the calling object at execution time
    Formula.prototype = {

        // provides the variable names needed to run the calculation
        formulaSetup: function(){
            var currentFormula = [];
            for(var i = 0; i<formulaSetup[this.formName].numVars; i++){
                currentFormula.push(formulaSetup[this.formName].varNames[i]);
            }
            return currentFormula;
        },

        // runs the calculation with the given details.
        formulaSolve: function(num1, num2, num3, num4) {
            var answer = formulaSetup[this.formName].solution(num1, num2, num3, num4);
            return answer;
        },

        // provides the units following the calculation
        displayUnits: function(){
            if(formulaSetup[this.formName].unitBool){
                return formulaSetup[this.formName].unit;
            } else{
                return ``;
            }
        },
        
        // check that is a valid formName
        validate: function() {            
            // references the externally inaccessible 'supportedFormulas' within the closure
             if (supportedFormulas.indexOf(this.formName)  === -1) {
                throw "Invalid formula";   
             }
        },    
       
        // here in case a user wants to directly change the formula                  
        setForm: function(form) {
            
            // set the formName
            this.formName = form;
        
            // validate
            this.validate();
            
            // make chainable
            return this;
        },
        
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Formula.init = function(formName, num1, num2, num3, num4) {
        
        var self = this;
        self.formName = formName || '';
        self.num1 = num1 || '';
        self.num2 = num2 || '';
        self.num3 = num3 || '';
        self.num4 = num4 || '';
        
        self.validate();
        
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Formula.init.prototype = Formula.prototype;
    
    // attach our Formula to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Formula = global.F$ = Formula;
    
}(window, jQuery));