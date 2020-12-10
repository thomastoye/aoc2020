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

    const recurse = (notUsedYet, currentJoltage) => {
        if (currentJoltage === deviceJoltageAdapter) {
            return [ deviceJoltageAdapter ]
        }

        const possibilities = notUsedYet.filter(num => num - currentJoltage >= 0 && num - currentJoltage < 4)

        if (possibilities.length === 0) {
            return []
        }

        console.log({ possibilities, currentJoltage })
        
        const result = possibilities.flatMap(poss => recurse(notUsedYet.filter(n => n > poss), poss)).map(res => (res))
        console.log(`I return ${JSON.stringify(result)}`)

        return result
    }

    return recurse([...lines, deviceJoltageAdapter], 0)
}

module.exports = {
  part1, part2
};

