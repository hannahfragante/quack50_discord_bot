module.exports = {
    questions: [
        {
            id: 1,
            question: `What is the output of the following program :`,
            is_program_question: true,
            program_question: `
            def myfunc(a):
                a = a + 2
                a = a * 2
            return a
        
            print myfunc(2)
            `,
            choices: {
                a: `8`,
                b: `16`,
                c: `Indentation Error`,
                d: `Runtime Error`,
            },
            answer: `c`,
            difficulty: "easy",
            language: `python`
        },
        {
            id: 2,
            question: `What is the output of the expression :`,
            is_program_question: true,
            program_question: `
            print(3*1**3)
            `,
            choices: {
                a: `27`,
                b: `9`,
                c: `3`,
                d: `1`,
            },
            answer: `c`,
            difficulty: "easy",
            language: `python`
        },
        {
            id: 3,
            question: `What is the output of the following program : `,
            is_program_question: true,
            program_question: `
            print '{0:.2}'.format(1.0 / 3)
            `,
            choices: {
                a: `0.333333`,
                b: `0.33`,
                c: `0.333333:-2`,
                d: `Error`,
            },
            answer: `b`,
            difficulty: "easy",
            language: `python`
        },
        {
            id: 4,
            question: `What is the output of the following program : `,
            is_program_question: true,
            program_question: `
            i = 0
            while i < 3: 
                print i 
                i += 1
            else: 
                print 0
            `,
            choices: {
                a: `0 1 2 3 0`,
                b: `0 1 2 0`,
                c: `0 1 2`,
                d: `Error`,
            },
            answer: `b`,
            difficulty: "easy",
            language: `python`
        },
        {
            id: 5,
            question: `What is the output of the following program : `,
            is_program_question: true,
            program_question: `print 'cd'.partition('cd')`,
            choices: {
                a: `('cd')`,
                b: `('')`,
                c: `('cd',",")`,
                d: `(",'cd',")`,
            },
            answer: `d`,
            difficulty: "easy",
            language: `python`
        },
    ],
};
