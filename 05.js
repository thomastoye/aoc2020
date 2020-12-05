const binarySpacePartitionToRowAndCol = (bsp) => {
    const rowPart = bsp.slice(0, 7)
    const colPart = bsp.slice(7)

    const row = rowPart.split('').reduce((acc, frontOrBack, idx) => {
        return acc + (frontOrBack === 'B' ? 1 : 0) * Math.pow(2, 6 - idx)
    }, 0)

    const col = colPart.split('').reduce((acc, leftOrRight, idx) => {
        return acc + (leftOrRight === 'R' ? 1 : 0) * Math.pow(2, 2 - idx)
    }, 0)

    return {row, col}
}

const binarySpacePartitionToSeatId = (bsp) => {
    const { row, col } = binarySpacePartitionToRowAndCol(bsp)

    return row * 8 + col
}

const part1 = async (data) => {
    return data.split('\n').map(binarySpacePartitionToSeatId).reduce((prev, curr) => prev > curr ? prev : curr, 0)
}

const part2 = async (data) => {
    const seatIds = new Set(data.split('\n').map(binarySpacePartitionToSeatId))

    return [...Array(938).keys()].find((value) => {
        if (value < 100) {
            return false
        }

        return !seatIds.has(value)
    })
}


module.exports = {
  part1, part2
};
