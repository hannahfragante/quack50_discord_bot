module.exports = {
    questions: [
        {
            id: 1,
            question: `Who is the father of C language?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `Steve Jobs`,
                b: `James Gosling`,
                c: `Dennis Ritchie`,
                d: `Rasmus Lerdorf`,
            },
            answer: `c`,
            difficulty: "easy",
            language: `c`
        },
        {
            id: 2,
            question: `Which of the following is not a valid C variable name?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `int number;`,
                b: `float rate;`,
                c: `int variable_count;`,
                d: `int $main;`,
            },
            answer: `d`,
            difficulty: "easy",
            language: `c`
        },
        {
            id: 3,
            question: `All keywords in C are in ____________`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `LowerCase letters`,
                b: `UpperCase letters`,
                c: `CamelCase letters`,
                d: `None of the Above`,
            },
            answer: `a`,
            difficulty: "easy",
            language: `c`
        },
        {
            id: 4,
            question: `Which of the following is true for variable names in C?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `They can contain alphanumeric characters as well as special characters`,
                b: `It is not an error to declare a variable to be one of the keywords(like goto, static)`,
                c: `Variable names cannot start with a digit`,
                d: `Variable can be of any length`,
            },
            answer: `c`,
            difficulty: "easy",
            language: `c`
        },
        {
            id: 5,
            question: `Which of the following cannot be a variable name in C?`,
            is_program_question: false,
            program_question: String,
            choices: {
                a: `volatile`,
                b: `true`,
                c: `friend`,
                d: `export`,
            },
            answer: `a`,
            difficulty: "easy",
            language: `c`
        },
        {
            id: 6,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `int main()
            {
                char str[] = "geeksforgeeks";
                char *s1 = str, *s2 = str;	 
                int i;
                
                for(i = 0; i < 7; i++)
                {
                    printf(" %c ", *str);
                    ++s1;	 
                }
                
                for(i = 0; i < 6; i++)
                {
                    printf(" %c ", *s2);
                    ++s2;	 
                }
                
                getchar();
                return 0;
            }
            `,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `g g g g g g g g e e k s f`,
            difficulty: "hard",
            language: `c`
        },
        {
            id: 7,
            question: `What will be the output of the following code snippet?`,
            is_program_question: true,
            program_question: `int main()
            {
                int x, y = 2, z, a;
                if (x = y % 2)
                    z = 2;
                a = 2;
                printf("%d %d ", z, x);
                return 0;
            }
            `,
            choices: {
                free_response: `please type what you think the output will be`,
            },
            answer: `0 0`,
            difficulty: "medium",
            language: `c`
        },
    ],
};
