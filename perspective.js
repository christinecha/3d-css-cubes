var $planeWrapper = document.getElementById('plane-wrapper')
var $perspective = document.getElementById('perspective')
var $slider = $perspective.querySelector('.slider')
var $knob = $perspective.querySelector('.knob')

var perspective = 600
var minPerspective = 200
var maxPerspective = 1200
var isDraggingSlider = false
var lastX = 0
var newX = 0

function handleMouseDown(e) {
  isDraggingSlider = true
}

function handleMouseUp(e) {
  if (!isDraggingSlider) return
  isDraggingSlider = false
}

function handleMouseMove(e) {
  if (!isDraggingSlider) return

  var sliderRect = $slider.getBoundingClientRect()
  newX = e.pageX - sliderRect.left

  if (newX > sliderRect.width) newX = sliderRect.width
  if (newX < 0) newX = 0

  $knob.style.left = newX + 'px'

  perspective = (newX / sliderRect.width) * (maxPerspective - minPerspective) + 200
  $planeWrapper.style.perspective = perspective + 'px'
}

$knob.addEventListener('mousedown', handleMouseDown)
$knob.addEventListener('touchstart', handleMouseDown)

document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchend', handleMouseUp)

document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('touchmove', handleMouseMove)

$knob.style.left = (perspective - 200) / (maxPerspective - minPerspective) * $slider.getBoundingClientRect().width + 'px'
