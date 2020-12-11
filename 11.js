const FLOOR = '.'
const EMPTY_CHAIR = 'L'
const OCCUPIED_CHAIR = '#'

// Poor man's hash
const gridIsStable = (previousGrid, grid) => JSON.stringify(previousGrid) === JSON.stringify(grid)

const getNeighbours = (grid, rowIdx, colIdx) => {
    const rowAbove = grid[rowIdx - 1]
    const rowBelow = grid[rowIdx + 1]

    return [
        rowAbove ? rowAbove[colIdx - 1] : null,
        rowAbove ? rowAbove[colIdx] : null,
        rowAbove ? rowAbove[colIdx + 1] : null,
        grid[rowIdx][colIdx - 1],
        grid[rowIdx][colIdx + 1],
        rowBelow ? rowBelow[colIdx - 1]: null,
        rowBelow ? rowBelow[colIdx] : null,
        rowBelow ? rowBelow[colIdx + 1] : null,
    ].filter(el => el != null)
}

const getVisibleChairs = (grid, rowIdx, colIdx) => {
    const directionVectors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ]

    return directionVectors.map((vector) => {
        let [x, y] = [ rowIdx + vector[0], colIdx + vector[1] ]
        while (grid[x] != null && grid[x][y] != null && ![EMPTY_CHAIR, OCCUPIED_CHAIR].includes(grid[x][y])) {
            [x, y] = [ x + vector[0], y + vector[1] ]
        }

        
        if (grid[x] == null || grid[x][y] == null) {
            return null
        }

        return grid[x][y]
    }).filter(el => el != null)
}

const part1 = input => {
    let previousGrid = null
    let grid = input.split('\n').filter(line => line !== '').map(line => line.split(''))

    while (!gridIsStable(previousGrid, grid)) {
        previousGrid = grid

        grid = grid.map((row, rowIdx) => row.map((cell, colIdx) => {
            const neighbours = getNeighbours(grid, rowIdx, colIdx)
            
            if (cell === EMPTY_CHAIR && neighbours.filter(neigh => neigh === OCCUPIED_CHAIR).length === 0) {
                return OCCUPIED_CHAIR
            }

            if (cell === OCCUPIED_CHAIR && neighbours.filter(neigh => neigh === OCCUPIED_CHAIR).length >= 4) {
                return EMPTY_CHAIR
            }

            return cell
        }))

    }

    return grid.flat().filter(spot => spot === OCCUPIED_CHAIR).length
}

const part2 = input => {
    let previousGrid = null
    let grid = input.split('\n').filter(line => line !== '').map(line => line.split(''))

    while (!gridIsStable(previousGrid, grid)) {
        previousGrid = grid

        grid = grid.map((row, rowIdx) => row.map((cell, colIdx) => {
            const neighbours = getVisibleChairs(grid, rowIdx, colIdx)
            
            if (cell === EMPTY_CHAIR && neighbours.filter(neigh => neigh === OCCUPIED_CHAIR).length === 0) {
                return OCCUPIED_CHAIR
            }

            if (cell === OCCUPIED_CHAIR && neighbours.filter(neigh => neigh === OCCUPIED_CHAIR).length >= 5) {
                return EMPTY_CHAIR
            }

            return cell
        }))

    }

    return grid.flat().filter(spot => spot === OCCUPIED_CHAIR).length
}

module.exports = {
    part1, part2
};

