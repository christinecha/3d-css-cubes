var $planeWrapper = document.getElementById('plane-wrapper')
var $perspective = document.getElementById('perspective')
var $slider = $perspective.querySelector('.slider')
var $knob = $perspective.querySelector('.knob')

var perspective = 600
var minPerspective = 200
var maxPerspective = 1200
var lastX = 0
var newX = 0

function handleMouseDown(e) {
  console.log('moo')
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('touchmove', handleMouseMove)
}

function handleMouseUp(e) {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('touchmove', handleMouseMove)
}

function handleMouseMove(e) {
  e.preventDefault()

  // when the browser is ready, draw the next frame
  window.requestAnimationFrame( function(){
    var sliderRect = $slider.getBoundingClientRect()
    newX = e.pageX - sliderRect.left

    if (newX > sliderRect.width) newX = sliderRect.width
    if (newX < 0) newX = 0

    $knob.style.left = newX + 'px'

    perspective = (newX / sliderRect.width) * (maxPerspective - minPerspective) + 200
    $planeWrapper.style.perspective = perspective + 'px'
  })
}

$knob.addEventListener('mousedown', handleMouseDown)
$knob.addEventListener('touchstart', handleMouseDown)

document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchend', handleMouseUp)

$knob.style.left = (perspective - 200) / (maxPerspective - minPerspective) * $slider.getBoundingClientRect().width + 'px'
