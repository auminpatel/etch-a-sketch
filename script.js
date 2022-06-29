const CLICK_TYPES = {
  COLOR: 'color',
  RANDOM_COLOR:'randomColor',
  ERASER: 'eraser',
  CLEAR: 'clear'
}

let isMouseDown = false
document.onmousedown = () => (isMouseDown = true)
document.onmouseup = () => (isMouseDown = false)

let currentButtonSelected = CLICK_TYPES.COLOR

const changeGrid = (gridvalue) => {
  const drawContainer = document.querySelector('.drawMainContainer')
  const styleProperty = `repeat(${Number(gridvalue)}, 1fr)`
  drawContainer.style.gridTemplateColumns = styleProperty
  drawContainer.style.gridTemplateRows = styleProperty

  const range = Number(gridvalue) * Number(gridvalue)
  for(i=0;i <range ;i++ )  {
    const gridElement = document.createElement('div')
    gridElement.setAttribute('data-grid-no', i)
    gridElement.setAttribute('draggable', false)
    gridElement.addEventListener('mouseover', changeColor)
    drawContainer.appendChild(gridElement)
  }
}

const changeColor = (e) => {
  let gridColor;
  switch(currentButtonSelected) {
    case CLICK_TYPES.COLOR: {
      const colorInputElement = document.querySelector('.colorPicker')
      console.log(colorInputElement.value)
      gridColor = colorInputElement.value;
      break;
    }
   
    case CLICK_TYPES.RANDOM_COLOR: {
        gridColor =  `#${Math.floor(Math.random()*16777215).toString(16)}`;
        break;
      }
     case CLICK_TYPES.ERASER: {
       gridColor = '#ffffff'
       break;
     } 
  }

  if(isMouseDown){
    e.target.style.backgroundColor = gridColor;
  }
}

const resetGrid = () => {
  const drawContainer = document.querySelector('.drawMainContainer')
  drawContainer.innerHTML = ''
}

const setSliderTextValue = (gridvalue) => {
  const textInput  = document.querySelector(".sliderValue")
  textInput.innerHTML = `Grid Size: ${gridvalue} X ${gridvalue}`
}

const sliderEvents = (gridvalue) => {
  setSliderTextValue(gridvalue)
  resetGrid()
  changeGrid(gridvalue)
}

const setSelectedButton = (button , buttonElement) => {
  const buttons = document.querySelectorAll('.buttonContainer > button')
  if(buttons.length && button.length>0) {
    buttons.forEach(element=> {
     element.classList.remove('selectedButton')
    })
  }
  currentButtonSelected = button
  buttonElement.classList.add('selectedButton')
}


const clearEvent = () => {
  const slider = document.querySelector('.slider')
  sliderEvents(slider.value)
}


const buttonClicksEvent = (string) => {
  const button = document.querySelector(`button[value="${string}"]`);

  button.addEventListener('click', ()=> {
    setSelectedButton(string, button)
    if(string === CLICK_TYPES.CLEAR) {
      clearEvent()
    }
  })
}

const buttonClicks= () => {
  buttonClicksEvent(CLICK_TYPES.COLOR)
  buttonClicksEvent(CLICK_TYPES.RANDOM_COLOR)
  buttonClicksEvent(CLICK_TYPES.ERASER)
  buttonClicksEvent(CLICK_TYPES.CLEAR)
} 

const rangeSlider = (e) => {
  const gridvalue = e.target.value
  sliderEvents(gridvalue)
}

const sliderEvent = () => {
  const slider = document.querySelector('.slider')
  setSliderValue(slider.value)
  changeGrid(slider.value)
  slider.addEventListener('input', rangeSlider)
}

const setInitialSelectButton = () => {
  const button = document.querySelector(`button[value="${CLICK_TYPES.COLOR}"]`);
  setSelectedButton(CLICK_TYPES.COLOR, button)
}

window.onload = function () {
  sliderEvent()
  changeColor()
  buttonClicks()
  setInitialSelectButton()
}