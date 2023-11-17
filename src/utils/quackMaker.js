module.exports = () => {
    let random = Math.ceil(Math.random() * 7);
    let quacks = [];

    for (let i = 0; i < random; i++) {
        let quack = "quack";
        let letterCaseRandom = Math.ceil(Math.random() * 50);
        let punctuationRandom = Math.ceil(Math.random() * 1000);

        if (letterCaseRandom % 2 == 0) {
            quack = quack.toUpperCase();
        }

        if (punctuationRandom % 10 == 0) {
            quack = quack + "!";
        } else if (punctuationRandom % 4 == 1) {
            quack = quack + "?";
        } else if (punctuationRandom % 4 == 2) {
            quack = quack + ".";
        }

        quacks.push(quack);
    }

    return quacks.join(" ");
};
