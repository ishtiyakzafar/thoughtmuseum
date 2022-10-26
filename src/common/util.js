function toPrice(number) {
    if (!number)
        return number
    return Number((number).toFixed(2)).toLocaleString()
}

export default {
    toPrice
}