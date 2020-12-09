class Device {
    constructor(instructions, logging = false) {
        this.logging = logging
        this.acc = 0
        this.memory = instructions
        this.ip = 0
        this.terminated = false
    }

    step() {
        const instruction = this.memory[this.ip]

        if (this.terminated) {
            return
        }

        if (this.ip < 0 || this.ip > this.memory.length) {
            this.log('Terminated with fault')
            this.terminated = 'fault'
            return
        }

        if (this.ip === this.memory.length) {
            this.log('Terminated successfully')
            this.terminated = 'success'
            return
        }

        this.log(`${this.ip.toString().padStart(3, '0')} : ${instruction.operation} ${instruction.operand} (acc: ${this.acc})`)

        switch(instruction.operation) {
            case 'nop':
                this.ip++;
                this.log(` NOP, next instruction: ${this.ip}`)
                break;
            case 'acc':
                this.acc += instruction.operand;
                this.ip++;
                this.log(` ACC, acc is now ${this.acc}, next instruction: ${this.ip}`)
                break;
            case 'jmp':
                this.ip += instruction.operand
                this.log(` JMP to ${this.ip}`)
                break
            default:
                throw new Error(`Unknown instruction ${instruction}`)
        }
    }

    log(input) {
        if (this.logging) {
            console.log(input)
        }
    }
}

const doesDeviceTerminate = (device) => {
    const visitedLocations = new Set()
    while (!visitedLocations.has(device.ip) && !device.terminated) {
        visitedLocations.add(device.ip)
        device.step()
    }

    return { acc: device.acc, terminated: device.terminated }
}

const part1 = async (data) => {
    const instructions = data.split('\n').filter(line => line !== '').map(line => {
        return {
            operation: line.split(' ')[0],
            operand: parseInt(line.split(' ')[1], 10)
        }
    })

    const device = new Device(instructions)

    const visitedLocations = new Set()
    while (!visitedLocations.has(device.ip)) {
        visitedLocations.add(device.ip)
        device.step()
    }

    return device.acc
}

const part2 = async (data) => {
    const instructions = data.split('\n').filter(line => line !== '').map(line => {
        return {
            operation: line.split(' ')[0],
            operand: parseInt(line.split(' ')[1], 10)
        }
    })

    const alternatives = instructions.map((_, idx) => {
        const instruction = instructions[idx]

        if (instruction.operation === 'acc') {
            return null
        }

        const replacedInstruction = instruction.operation === 'jmp' ? {
            ...instruction,
            operation: 'nop',
        } : {
            ...instruction,
            operation: 'jmp',
        }

        return [
            ...instructions.slice(0, idx),
            replacedInstruction,
            ...instructions.slice(idx + 1)
        ]
    }).filter(alt => alt != null)

    return alternatives.map((alt) => doesDeviceTerminate(new Device(alt))).find(res => res.terminated).acc
}


module.exports = {
    part1, part2
};
