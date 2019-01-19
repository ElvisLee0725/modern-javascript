const createTipper = (tipPercent) => {
    return (amount) => {
        return amount * tipPercent
    }
}

const tip20 = createTipper(.2)
const tip = tip20(100)
console.log(tip)