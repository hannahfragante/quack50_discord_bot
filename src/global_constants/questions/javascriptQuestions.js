module.exports = {
    questions: [
        {
            id: 1,
            question: `Javascript is an _______ language?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `Object-Oriented`,
                b: `Object-Based`,
                c: `Procedural`,
                d: `None of the Above`,
            },
            answer: `a`,
            difficulty: "easy",
            language: `javascript`
        },
        {
            id: 2,
            question: `Which of the following keywords is used to define a variable in Javascript?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `var`,
                b: `let`,
                c: `Both a and b`,
                d: `None of the Above`,
            },
            answer: `c`,
            difficulty: "easy",
            language: `javascript`
        },
        {
            id: 3,
            question: `Which of the following methods is used to access HTML elements using Javascript?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `getElementbtId()`,
                b: `getElementsByClassName()`,
                c: `Both a and b`,
                d: `None of the Above`,
            },
            answer: `c`,
            difficulty: "easy",
            language: `javascript`
        },
        {
            id: 4,
            question: `Upon encountering empty statements, what does the Javascript Interpreter do?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `Throws an Error`,
                b: `Ignores the Statements`,
                c: `Gives a Warning`,
                d: `None of the Above`,
            },
            answer: `b`,
            difficulty: "easy",
            language: `javascript`
        },
        {
            id: 5,
            question: `Which of the following methods can be used to display data in some form using Javascript?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `document.write()`,
                b: `console.log()`,
                c: `window.alert()`,
                d: `All of the Above`,
            },
            answer: `d`,
            difficulty: "easy",
            language: `javascript`
        },
        {
            id: 6,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `
            <script type="text/javascript">
a = 5 + "9";
document.write(a);
</script>`,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `59`,
            difficulty: "medium",
            language: `javascript`
        },
        {
            id: 7,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `<script type="text/javascript" language="javascript">
  
            var a = "Scaler";
            var result = a.substring(2, 4);
            document.write(result);
              
            </script>`,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `20`,
            difficulty: "medium",
            language: `javascript`
        },
        {
            id: 8,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `(function(){
                setTimeout(()=> console.log(1),2000);
                console.log(2);
                setTimeout(()=> console.log(3),0);
                console.log(4);
               })();`,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `2 4 3 1`,
            difficulty: "medium",
            language: `javascript`
        },
        {
            id: 9,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `(function(a){
                return (function(){
                  console.log(a);
                  a = 6;
                })()
               })(21);`,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `21`,
            difficulty: "medium",
            language: `javascript`
        },
        {
            id: 10,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `function solve(arr, rotations){
                if(rotations == 0) return arr;
                for(let i = 0; i < rotations; i++){
                  let element = arr.pop();
                  arr.unshift(element);
                }
                return arr;
               }
               // solve([44, 1, 22, 111], 5);`,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `[111, 44, 1, 22]`,
            difficulty: "medium",
            language: `javascript`
        },
    ],
};
