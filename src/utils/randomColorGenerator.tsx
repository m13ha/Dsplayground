let randomColorGenerator = () => {
    let hexGenerator = () => {
        let randomNumber = Math.round(Math.random() * 255);
        if (randomNumber > 99) {
            let str = convertToLetter(Math.floor(randomNumber/16));
            if (randomNumber % 16 !== 0 && randomNumber % 16 > 9) {
                return `${str}${convertToLetter(randomNumber % 16)}`
            }else {
                return `${str}${randomNumber % 16}`
            }
        }else {
            return `${randomNumber}`
        }
    }

    let convertToLetter = (number: Number) => {
        switch (number) {
            case 10:
                return `A`
            case 11:
                return `B`
            case 12:
                return `C`
            case 13:
                return `D`
            case 14:
                return `E`
            case 15:
                return `F`
            
            default:
                return `${number}`
        }
    }

    let red = hexGenerator();
    let green = hexGenerator();
    let blue = hexGenerator();

    return `#${red}${green}${blue}`
}

export default randomColorGenerator;