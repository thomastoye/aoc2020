const aToZ = String.fromCharCode(...[...Array('z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1).keys()].map(i => i + 'a'.charCodeAt(0))).split('')

const part1 = async (data) => {
    return data.split('\n\n').map(group => group.split('\n').join('')).map(group => {
        return aToZ.filter(char => group.includes(char)).length
    }).reduce((acc, curr) => acc + curr, 0)
}

const part2 = async (data) => {
    return data.split('\n\n').map(group => group.split('\n')).map(groupAnswers => {
        return aToZ.filter(char => {
            console.log({ char, groupAnswers })
            return groupAnswers.filter(x => x !== '').every(answers => answers.includes(char))
        }).length
    }).reduce((acc, curr) => acc + curr, 0)
}


module.exports = {
    part1, part2
};
