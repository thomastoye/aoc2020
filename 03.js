const OPEN = '.'
const TREE = '#'

const evaluate = (matrix, numRight, numDown) => {
    const width = matrix[0].length

    let col = 0

    return matrix.map((line, index) => {
        if (index % numDown !== 0) {
            return 0
        }

        if (line[col] === TREE) {
            col = (col + numRight) % (width)
            return 1
        } else {
            col = (col + numRight) % (width)
            return 0
        }
    }).reduce((sum, x) => sum + x, 0)
}

const part1 = async (data) => {
    const matrix = data.split('\n').filter(x => x).map(line => line.split(''))
    return evaluate(matrix, 3, 1)
}

const part2 = async (data) => {
    const matrix = data.split('\n').filter(x => x).map(line => line.split(''))
    return evaluate(matrix, 1, 1) * evaluate(matrix, 3, 1) * evaluate(matrix, 5, 1) * evaluate(matrix, 7, 1) * evaluate(matrix, 1, 2)
}


module.exports = {
  part1, part2
};


