let randomColorGenerator = () => {
    // let hexGenerator = () => {
    //     let randomNumber = Math.round(Math.random() * 255);
    //     if (randomNumber > 99) {
    //         let str = convertToLetter(Math.floor(randomNumber/16));
    //         if (randomNumber % 16 !== 0 && randomNumber % 16 > 9) {
    //             return `${str}${convertToLetter(randomNumber % 16)}`
    //         }else {
    //             return `${str}${randomNumber % 16}`
    //         }
    //     }else {
    //         return `${randomNumber}`
    //     }
    // }

    // let convertToLetter = (number: Number) => {
    //     switch (number) {
    //         case 10:
    //             return `A`
    //         case 11:
    //             return `B`
    //         case 12:
    //             return `C`
    //         case 13:
    //             return `D`
    //         case 14:
    //             return `E`
    //         case 15:
    //             return `F`
            
    //         default:
    //             return `${number}`
    //     }
    // }

    // let red = hexGenerator();
    // let green = hexGenerator();
    // let blue = hexGenerator();

    // return `#${red}${green}${blue}`

    // Generate a random number between 0 and 16777215 (0xFFFFFF in decimal)
    var randomColor = Math.floor(Math.random() * 16777215);

    // Convert the decimal number to a hexadecimal string
    var hexColor = randomColor.toString(16);

    // Add leading zeros if necessary to ensure the string has 6 characters
    while (hexColor.length < 6) {
        hexColor = "0" + hexColor;
    }

    // Add a "#" to the beginning of the string to make it a valid CSS color code
    return "#" + hexColor;
}

export default randomColorGenerator;