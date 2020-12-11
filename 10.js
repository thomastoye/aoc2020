const mem = require('mem')

const part1 = input => {
    const lines = input.split('\n').filter(line => line !== '').map(line => parseInt(line, 10)).sort((a, b) => a - b)

    const deviceJoltageAdapter = Math.max(...lines) + 3;
    const reduced = [...lines, deviceJoltageAdapter].reduce((acc, curr) => {
        return {
            prev: curr,
            num1diff: acc.num1diff + (curr - acc.prev === 1 ? 1 : 0),
            num3diff: acc.num3diff + (curr - acc.prev === 3 ? 1 : 0),
        }
    }, {
        prev: 0,
        num1diff: 0,
        num3diff: 0,
    })

    return reduced.num1diff * reduced.num3diff
}

const part2 = input => {
    const lines = input.split('\n').filter(line => line !== '').map(line => parseInt(line, 10))
    const deviceJoltageAdapter = Math.max(...lines) + 3;

    const recurse = mem((currentJoltage, allAdapters) => {
        const possibleJoltages = allAdapters.filter(joltage => joltage > currentJoltage && joltage <= currentJoltage + 3)

        if (currentJoltage === deviceJoltageAdapter) {
            return 1
        }

        if (possibleJoltages.length === 0) {
            return 0
        }

        return res = possibleJoltages.reduce((acc, poss) => {
            return acc + recurse(poss, allAdapters)
        }, 0)
    })

    return recurse(0, [...lines, deviceJoltageAdapter])
}

module.exports = {
    part1, part2
};

