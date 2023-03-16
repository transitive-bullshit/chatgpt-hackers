// scaling factor that affects the mass of the bodies, effectively scaling the
// overall gravity strength of the system
const GRAVITY_SPEED = 900
const MAX_GRAVITY_SPEED = 1000

export class Body {
  // position
  x: number
  y: number

  // velocity vector <dx, dy>
  dx: number
  dy: number

  // affects this body's gravitational pull w.r.t. other bodies
  mass: number
  r: number

  visible: boolean

  constructor({
    x,
    y,
    dx = 0,
    dy = 0,
    r,
    visible = true
  }: {
    x: number
    y: number
    r: number
    dx?: number
    dy?: number
    visible?: boolean
  }) {
    this.x = x
    this.y = y

    this.dx = dx
    this.dy = dy

    this.r = r
    this.mass = (2 * this.r) / (MAX_GRAVITY_SPEED - GRAVITY_SPEED)
    this.visible = visible
  }

  addAcceleration(accelX: number, accelY: number) {
    this.dx += accelX
    this.dy += accelY
  }

  update() {
    if (!this.visible) {
      return
    }

    this.x += this.dx
    this.y += this.dy
  }

  // returns whether or not this body intersects the given body (currently unused)
  intersects(body: Body): boolean {
    const radius = this.r
    const rad = body.r
    const xDif = body.x - this.x
    const yDif = body.y - this.y
    const dist = Math.sqrt(xDif * xDif + yDif * yDif)

    // reject if dist btwn circles is greater than their radii combined
    if (dist > radius + rad) {
      return false
    }

    // reject if one circle is inside of the other
    return dist >= Math.abs(rad - radius)
  }
}
