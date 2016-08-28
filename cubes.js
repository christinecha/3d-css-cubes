var $grid = document.getElementById('grid')
var $cubes = document.getElementById('cubes')
var $cubeModel = document.querySelector('.cube')
var $colorize = document.getElementById('colorize')
var $colorPreview = document.getElementById('color-preview')

var color = '#ffaa22'
var widthInSpaces = 10
var heightInSpaces = 10
var totalSpaces = widthInSpaces * heightInSpaces


/** METHODS **/
function addSpace(index) {
  var $space = document.createElement('div')
  $space.classList.add('space')

  var x = index === 0 ? 0 : (index % widthInSpaces) * 50
  var y = index === 0 ? 0 : Math.floor(index / widthInSpaces) * 50

  $space.style.left = x + 'px'
  $space.style.top = y + 'px'

  $grid.appendChild($space)

  $space.addEventListener('click', addCube)
}

function addCube(e) {
  var target = e.target
  var layer = 0
  var cubeTranslation = 'translate3d(0, 0, 0)'

  if (e.target.classList.contains('face')) {
    target = e.target.parentNode
    layer = parseInt(target.getAttribute('data-layer')) + 1
    cubeTranslation = `translate3d(0, 0, ${(layer) * 50}px)`
  }

  var $cube = $cubeModel.cloneNode(true)
  var $face1 = $cube.querySelector('.face-1')

  $cube.classList.remove('is--hidden')
  $cube.setAttribute('data-layer', layer)
  $cube.style.left = target.style.left
  $cube.style.top = target.style.top
  $cube.style.transform = cubeTranslation

  $face1.addEventListener('click', addCube)

  colorizeCube($cube)

  $cubes.appendChild($cube)
}

function colorizeCube($cube) {
  var $faces = Array.from($cube.querySelectorAll('.face'))
  $faces.forEach(function($face, i) {
    $face.style.backgroundColor = getColorNeighbor(color, i)
  })
}

function getRandomColor() {
  var chars = '0123456789abcdef'.split('')
  var hex = '#'

  for (var n = 0; n < 6; n++) {
    var rand = Math.round(Math.random() * chars.length - 1)
    hex += chars[rand]
  }

  return hex
}

function getColorNeighbor(hex, n) {
  var chars = '0123456789abcdef'.split('')
  var hexArr = hex.replace('#', '').split('')

  var big = (n % 3) * 2
  var small = (n % 2) === 0 ? big + 1 : big - 1
  if (small === -1) small = 5

  var neighborBig = hexArr[big] === 'f' ? 'e' : chars[chars.indexOf(hexArr[big]) + 1]
  var neighborSmall = hexArr[big] === 'f' ? 'e' : chars[chars.indexOf(hexArr[big]) + 1]

  hexArr[big] = neighborBig
  hexArr[small] = neighborSmall

  return '#' + hexArr.join('')
}

/** EVENT LISTENERS **/
$colorize.addEventListener('click', function() {
  color = getRandomColor()
  $colorPreview.style.backgroundColor = color
})


/** RUN **/
var spaceIndex = 0

while (spaceIndex < totalSpaces) {
  addSpace(spaceIndex)
  spaceIndex ++
}
