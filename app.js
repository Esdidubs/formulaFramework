// the global variable we'll use when accessing the framework
var f;

// user changes the formula through the dropdown
$('#selection').on('change', function() {
    event.preventDefault();

    // create a new Formula object using the current selected formula
    f = F$($('#selection').val());

    // creates blank variable so we can have fresh HTML each time
    var currentFormula=``;

    // loops through the formula variable names and creates an input box for each
    for(var i = 0; i < f.formulaSetup().length; i++){
        currentFormula += `<input type='number' id='num${i+1}' name='num${i+1}' placeholder='${f.formulaSetup()[i]}'>`;
    }

    // adds the solve button after all of the inputs have been created
    currentFormula += `<button id="solve" class="formulaSubmitBtn">Solve</button>`;

    // displays the input boxes for the given formula
    $('#variables').replaceWith(` 
    <div id="variables">${currentFormula}</div>`);
});


// user clicks on the solve button (set on main because #solve doesn't exist during page creation)
$('main').on('click', '#solve', function() {
    
    // passes all existing variables to formulaSolve() and returns the answer
    // if exponent formulas, we want the unit part first
    if($('#selection').val()==='exponentMultiply' || $('#selection').val() === 'exponentDivide'  || $('#selection').val() === 'powerOfPower'){
        $('#myAnswer').html(`The answer is: ${f.displayUnits()}<sup>${f.formulaSolve(Number($('#num1').val()), 
        Number($('#num2').val()), Number($('#num3').val()), Number($('#num4').val()))}</sup>`);
    } else {
        $('#myAnswer').html(`The answer is: ${f.formulaSolve(Number($('#num1').val()), 
        Number($('#num2').val()), Number($('#num3').val()), Number($('#num4').val()))} ${f.displayUnits()}`);
    }
    
});

