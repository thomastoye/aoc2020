const mem = require('mem')

// We could do a BFS here - start with the bags that can contain shiny gold bags and work our way up

const canContainShinyGoldBag = (bagName, bagMap, ignoredBags) => {
    if (bagMap.get(bagName).find(contents => contents.bagName === 'shiny gold bag')) {
        return true
    }

    return bagMap.get(bagName).find(contents => !ignoredBags.includes(contents.bagName) && canContainShinyGoldBag(contents.bagName, bagMap, [ ...ignoredBags, bagName ]))
}

const createBagMap = (data) => new Map(data.split('\n').filter(x => x !== '').map(line => {
    const split = line.split('contain');

    return [
        split[0].trim().replace(/s$/, ''),
        split[1].split(',').map(bag => bag.replace(/\./g, '').trim()).filter(bag => bag !== 'no other bags').map(bag => {
            return {
                number: parseInt(bag.split(' ')[0], 10),
                bagName: bag.split(' ').slice(1).join(' ').replace(/s$/, '')
            }
        })
    ]
}))

const getNumberOfBagsInsideBag = (bag, bagMap, depth = 0) => {
    const prefix = ' '.repeat(depth)
    const bagsInside = bagMap.get(bag)
    const numberOfBags = bagsInside.map(content => 1 + content.number * (getNumberOfBagsInsideBag(content.bagName, bagMap, depth + 1) || 1)).reduce((acc, curr) => acc + curr, 0)

    console.log(`${prefix}In ${bag}, there's ${numberOfBags} bags. ${bagsInside.map(bag => bag.number + ' x ' + bag.bagName).join(', ')}`)

    return numberOfBags
}

const recurse = (bagName, bagMap) => {
    const bagsInsideBag = bagMap.get(bagName)

    // Not needed but clearer
    if (bagsInsideBag.length === 0) {
        return 0
    }

    return bagsInsideBag.map(bagInside => bagInside.number * (recurse(bagInside.bagName, bagMap) + 1)).reduce((acc, curr) => acc+curr, 0)
}


const part1 = async (data) => {
    const bagMap = createBagMap(data)

    return [...bagMap.keys()].filter(key => canContainShinyGoldBag(key, bagMap, [])).length
}

// 9337  => too low
// 13035 => too high
const part2 = async (data) => {
    const bagMap = createBagMap(data)

    return recurse('shiny gold bag', bagMap)


    return getNumberOfBagsInsideBag('shiny gold bag', bagMap) - 1
}


module.exports = {
    part1, part2
};
