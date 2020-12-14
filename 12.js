const part1 = (input) => {
  const lines = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      return {
        action: line[0],
        actionValue: parseInt(line.slice(1), 10),
      }
    })

  const {east, north} =  lines.reduce(
    (acc, { action, actionValue }) => {
      switch (action) {
        case 'R':
          return { ...acc, direction: (acc.direction + actionValue) % 360 }
        case 'L':
          return { ...acc, direction: (acc.direction - actionValue) % 360 }
        case 'N':
          return { ...acc, north: acc.north + actionValue }
        case 'S':
          return { ...acc, north: acc.north - actionValue }
        case 'E':
          return { ...acc, east: acc.east + actionValue }
        case 'W':
          return { ...acc, east: acc.east - actionValue }
        case 'F':
          return {
            ...acc,
            east: acc.east + Math.sin((acc.direction/180) * Math.PI) * actionValue,
            north: acc.north + Math.cos((acc.direction/180) * Math.PI) * actionValue,
          }
      }
    },
    {
      direction: 90, // East
      east: 0,
      north: 0,
    }
  )

  return Math.round(Math.abs(east) + Math.abs(north))
}

const cartToPolar = (x, y) => {
  return {
    dist: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
    theta: Math.atan2(y, x)
  }
}

const polarToCart = (theta, dist) => {
  return {
    x: dist * Math.cos(theta),
    y: dist * Math.sin(theta)
  }
}

const rotatePointAroundOrigin = (x, y, degrees) => {
  const { dist, theta } = cartToPolar(x, y)

  const newTheta = theta + (degrees / 180) * Math.PI

  return {
    x: Math.round(polarToCart(newTheta, dist).x),
    y: Math.round(polarToCart(newTheta, dist).y),
  }
}

const part2 = (input) => {

  const lines = input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      return {
        action: line[0],
        actionValue: parseInt(line.slice(1), 10),
      }
    })

  const {shipEast, shipNorth} =  lines.reduce(
    (acc, { action, actionValue }) => {
      console.log({ acc })
      console.log({action, actionValue})
      switch (action) {
        case 'R':
          // Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
          return {
            ...acc,
            waypointEast: rotatePointAroundOrigin(acc.waypointNorth, acc.waypointEast, actionValue).y,
            waypointNorth: rotatePointAroundOrigin(acc.waypointNorth, acc.waypointEast, actionValue).x,
          }
        case 'L':
          // Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
          return {
            ...acc,
            waypointEast: rotatePointAroundOrigin(acc.waypointNorth, acc.waypointEast, -actionValue).y,
            waypointNorth: rotatePointAroundOrigin(acc.waypointNorth, acc.waypointEast, -actionValue).x,
          }
        case 'N':
          return { ...acc, waypointNorth: acc.waypointNorth + actionValue }
        case 'S':
          return { ...acc, waypointNorth: acc.waypointNorth - actionValue }
        case 'E':
          return { ...acc, waypointEast: acc.waypointEast + actionValue }
        case 'W':
          return { ...acc, waypointEast: acc.waypointEast - actionValue }
        case 'F':
          // Action F means to move forward to the waypoint a number of times equal to the given value.

          return {
            ...acc,
            shipEast: acc.shipEast + acc.waypointEast * actionValue,
            shipNorth: acc.shipNorth + acc.waypointNorth * actionValue,
          }
      }
    },
    {
      shipEast: 0,
      shipNorth: 0,
      waypointEast: 10,
      waypointNorth: 1,
    }
  )

  return Math.abs(shipEast) + Math.abs(shipNorth)
}

module.exports = {
  part1,
  part2,
}
