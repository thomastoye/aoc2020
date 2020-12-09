const PART_1_SOLUTION = 731031916

const isNumberExpressibleAsSumOfOthers = (num, set) => {
    return [ ...set.entries() ].find(([a]) => {
        return set.has(num - a) // && (num - a) !== a
    }) || false
}

const part1 = input => {
    const lines = input.split('\n').filter(line => line !== '').map(line => parseInt(line, 10))

    return lines.find((num, idx) => {
        if (idx < 50) {
            return false // preamble
        }

        return !isNumberExpressibleAsSumOfOthers(num, new Set(lines.slice(0, idx)))
    })
}

const part2 = input => {
    const lines = input.split('\n').filter(line => line !== '').map(line => parseInt(line, 10))

    return lines.map((a, idx) => {
        let acc = a
        let runningIdx = idx

        while (acc < PART_1_SOLUTION) {
            runningIdx++
            acc += lines[runningIdx]

            if (acc === PART_1_SOLUTION) {
                const range = lines.slice(idx, runningIdx + 1)
                return Math.min(...range) + Math.max(...range)
            }
        }

        return false
    }).find(el => el)
}

module.exports = {
  part1, part2
};

