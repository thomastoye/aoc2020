const part1 = async (data) => {
    return data.split('\n').filter(line => line !== '').map(line => {
        const splitBySpaces = line.split(' ')

        return {
            min: parseInt(splitBySpaces[0].split('-')[0], 10),
            max: parseInt(splitBySpaces[0].split('-')[1], 10),
            pass: splitBySpaces[2],
            character: splitBySpaces[1][0],
            line
        }
    }).filter(({ min, max, pass, character, line }) => {
        const count = [...pass.matchAll(new RegExp(character, 'g'))].length
        const isGood = count >= min && count <= max
        return isGood
    }).length
}

const part2 = async (data) => {
    return data.split('\n').filter(line => line !== '').map(line => {
        const splitBySpaces = line.split(' ')

        return {
            index1: parseInt(splitBySpaces[0].split('-')[0], 10),
            index2: parseInt(splitBySpaces[0].split('-')[1], 10),
            pass: splitBySpaces[2],
            character: splitBySpaces[1][0],
            line
        }
    }).filter(({ index1, index2, pass, character, line }) => {
        const isGood = ((pass[index1 - 1] === character) ^ (pass[index2 - 1] === character)) === 1

        return isGood
    }).length
}


module.exports = {
  part1, part2
};

