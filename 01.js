const part1 = data =>
  new Promise(resolve => {
    const start = data.split('\n').filter(x => x !== '').map(n => parseInt(n, 10)).filter(n => n <= 2020)

    const matching = start.map(a => {
      const needle = start.find(b => a + b === 2020)
      if (needle == null) {
        return null
      }
      return [ a, needle ]
    }).find(x => x)

    resolve(matching[0] * matching[1])
  });

const part2 = data =>
  new Promise(resolve => {
    const start = data.split('\n').filter(x => x !== '').map(n => parseInt(n, 10)).filter(n => n <= 2020)
    const res = start.flatMap(a => {
      return start.flatMap(b => {
        if (a + b > 2020) {
          return null
        }

        return start.map(c => {
          if (a + b + c === 2020) {
            return a * b * c
          }
          return null
        }).filter(x => x)
      }).filter(x => x)
    })

    resolve(res)

    const matching = start.map(a => {
      const needle = start.find(b => a + b === 2020)
      if (needle == null) {
        return null
      }
      return [ a, needle ]
    }).find(x => x)

    resolve(matching[0] * matching[1])
  });


module.exports = {
  part1, part2
};

