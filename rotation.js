var vw = window.innerWidth

var isDragging = false
var dragStart = {}
var dragEnd = {}

var xRotation = 60
var yRotation = 0
var zRotation = 45

var $plane = document.getElementById('plane')
var $perspectiveKnob = document.querySelector('#perspective .knob')

/** METHODS **/
function setDragStart(e) {
  dragStart = { x: e.pageX, y: e.pageY }
}

function calculateRotations(e) {
  dragEnd = { x: e.pageX, y: e.pageY }

  var dragDiffX = dragEnd.x - dragStart.x
  var dragDiffY = dragEnd.y - dragStart.y

  xRotation -= dragDiffY / 100
  zRotation -= dragDiffX / 100

  if (xRotation < 0) xRotation = 0
  if (xRotation > 90) xRotation = 89
}

function applyRotations(node, x, y, z) {
  var rotationString = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
  node.style.transform = rotationString
}

function startDrag(e) {
  if (e.path && e.path.indexOf($perspectiveKnob) !== -1) return

  var targetTouches = e.targetTouches ? Array.prototype.slice.apply(e.targetTouches) : null
  if (targetTouches && targetTouches.indexOf($perspectiveKnob) !== -1) return

  // setup move listeners
  document.addEventListener('mousemove', drag)
  document.addEventListener('touchmove', drag)

  setDragStart(e)
}

function endDrag() {

  // tear down move listeners
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('touchmove', drag)
}

function drag(e) {
  e.preventDefault()
  calculateRotations(e)

  // when the browser is ready, apply the new positioning
  window.requestAnimationFrame( function(){
    applyRotations($plane, xRotation, yRotation, zRotation)
  })
}

/** EVENT LISTENERS **/
document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag)

document.addEventListener('mouseup', endDrag)
document.addEventListener('touchend',  endDrag)

/** RUN **/
applyRotations($plane, xRotation, yRotation, zRotation)
