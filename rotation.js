var vw = window.innerWidth

var isDragging = false
var dragStart = {}
var dragEnd = {}

var xRotation = 60
var yRotation = 0
var zRotation = 45

var $plane = document.getElementById('plane')

/** METHODS **/
function setDragStart(e) {
  dragStart = { x: e.pageX, y: e.pageY }
}

function calculateRotations(e) {
  console.log(e)
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

/** EVENT LISTENERS **/
document.addEventListener('mousedown', function(e) {
  isDragging = true
  setDragStart(e)
})

document.addEventListener('touchstart', function(e) {
  isDragging = true
  setDragStart(e)
})

document.addEventListener('mouseup', function(e) {
  isDragging = false
})

document.addEventListener('touchend', function(e) {
  isDragging = false
})

document.addEventListener('touchmove', function(e) {
  if (!isDragging) return
  calculateRotations(e)
  applyRotations($plane, xRotation, yRotation, zRotation)
})

/** RUN **/
applyRotations($plane, xRotation, yRotation, zRotation)
