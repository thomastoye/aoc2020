const part1 = async (data) => {
    const passports = data.split('\n\n').filter(x => x).map(line => Object.fromEntries(line.split('\n').join(' ').split(' ').map((keyValue) => keyValue.split(':'))))


    return passports.filter(passport => {
        return passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid //&& passport.cid
    }).length
}

const validatePassport = (passport) => {
    if (!(passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid)) {
        return 'not all fields set'
    }

    const byr = parseInt(passport.byr, 10)
    const iyr = parseInt(passport.iyr, 10)
    const eyr = parseInt(passport.eyr, 10)
    if (isNaN(byr) || byr < 1920 || byr > 2002) {
        return 'byr incorrect'
    }
    if (isNaN(iyr) || iyr < 2010 || iyr > 2020) {
        return 'iyr incorrect'
    }
    if (isNaN(eyr) || eyr < 2020 || eyr > 2030) {
        return 'eyr incorrect'
    }

    if (passport.hgt && passport.hgt.endsWith('in')) {
        const height = parseInt(passport.hgt.slice(0, -2), 10)
        if (isNaN(height) || height < 59 || height > 76) {
            return 'hgt incorrect'
        }
    } else if (passport.hgt && passport.hgt.endsWith('cm')) {
        const height = parseInt(passport.hgt.slice(0, -2), 10)
        if (isNaN(height) || height < 150 || height > 193) {
            return 'hgt incorrect'
        }
    } else {
        return 'hgt incerroct'
    }

    if (!/^\#[0-9a-f]{6}$/.test(passport.hcl)) {
        return 'hcl incorect'
    }

    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) {
        return 'ecl incorrect'
    }

    if (!/^[0-9]{9}$/.test(passport.pid)) {
        return 'pid incorrect'
    }

    return true
}

const part2 = async (data) => {
    const passports = data.split('\n\n').filter(x => x).map(line => Object.fromEntries(line.split('\n').join(' ').split(' ').map((keyValue) => keyValue.split(':')).filter(([key, value]) => key !== '')))

    return passports.filter(passport => {
        return validatePassport(passport) === true
    }).length
}


module.exports = {
  part1, part2
};
