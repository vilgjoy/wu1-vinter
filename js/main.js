const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const canvas = document.createElement("canvas")
canvas.setAttribute("id", "bg")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")
const pi2 = 2 * Math.PI
let particles = []
const bodyElement = document.querySelector("body")
bodyElement.appendChild(canvas)

/* Om du vill ändra snöfärgen */
const color = [255, 255, 255]

window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
window.onscroll = () => {
  canvas.setAttribute("style", `top: ${window.scrollY}px`)
}

const step = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((element) => {
    element.draw()
    element.update()
    particles = particles.filter((particle) => !particle.toDelete)
  })

  if (particles.length < 500) {
    spawnParticles(3)
  }

  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)

const Particle = (x, y, color) => {
  let particle = {}
  particle.x = x
  particle.y = y
  particle.dy = 1 + Math.random() * 3
  particle.dx = -1 + Math.random() * 2
  particle.color = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${Math.random()})`
  particle.size = 2 + Math.floor(Math.random() * 2)
  particle.toDelete = false
  particle.draw = function () {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, pi2, false)
    ctx.fillStyle = particle.color
    ctx.fill()
  }
  particle.update = function () {
    particle.y += particle.dy
    particle.x += particle.dx
    if (
      particle.y > canvas.height ||
      particle.x < 0 ||
      particle.x > canvas.width
    ) {
      particle.toDelete = true
    }
  }

  return particle
}

const spawnParticles = (amount) => {
  for (let i = 0; i < amount; i++) {
    particles.push(Particle(randomInt(0, canvas.width), 0, color))
  }
}

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search)
  const name = params.get('name')
  const message = params.get('message')
  return { name, message }
}

const { name, message } = getQueryParams()
console.log(`Name: ${name}, Message: ${message}`)

if (name && message) {
  const nameElement = document.querySelector("#name")
  nameElement.textContent = name
  const messageElement = document.querySelector("#message")
  messageElement.textContent = message
}