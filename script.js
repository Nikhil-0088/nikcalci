class Calculator {
    constructor(previosTextElement, currentTextElement) {
        this.previosTextElement = previosTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }
    clear() {
        this.current = ''
        this.previos = ''
        this.oration = undefined
    }
    delete() {
        this.current=this.current.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) {
            return
        }
        this.current = this.current.toString() + number.toString()
    }
    chooseOperation(opration) {
        if (this.current === '') {
            return
        }
        if (this.previos !== '') {
            this.compute()
        }
        this.opration = opration
        this.previos = this.current
        this.current = ''


    }
    compute() {
        let computation
        const prev = parseFloat(this.previos)
        const cur = parseFloat(this.current)
        if (isNaN(prev) || isNaN(cur)) {
            return
        }
        switch (this.opration) {
            case '+':
                computation = prev + cur
                break
            case 'x':
                    computation = prev*cur
                    break
            case '÷':
                    computation=prev/cur
                    break
             case '-':
                     computation=prev-cur
                    break
            default:
                break
        }
      this.current=computation
      this.opration=undefined
      this.prev=''
    }
    getDisplayNumber(number){
        const stringNumber=number.toString()
        const integerDigits=parseFloat(number)
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentTextElement.innerText=this.getDisplayNumber(this.current)
        if(this.opration!=null){
            this.previosTextElement.innerText=`${this.getDisplayNumber(this.previos)} ${this.opration}`
        }else{
            this.previosTextElement.innerText=''
        }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-opreation]')
const equalButton = document.querySelector('.equal')
const deleteButton = document.querySelector('.delete')
const acButton = document.querySelector('.allc')
const previosTextElement = document.querySelector('.previous')
const currentTextElement = document.querySelector('.current')


const calculator = new Calculator(previosTextElement, currentTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()

    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()

    })
})
equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})
acButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})
