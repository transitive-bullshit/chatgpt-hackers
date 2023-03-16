import random from 'random'
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer
} from 'three'

import { Body } from './Body'

// https://www.shadertoy.com/view/XssSzN
// https://blog.hyuntak.com/metaball

export class MetaballViz {
  _canvas: HTMLCanvasElement
  _renderer: WebGLRenderer
  _scene: Scene
  _camera: OrthographicCamera
  _material: ShaderMaterial

  _metaballs: Body[]
  _metaballsData: Float32Array
  _numMetaballs: number

  _rafHandle?: number | null
  // _mouse?: Vector2

  constructor({
    canvas,
    numMetaballs = 50
  }: {
    canvas: HTMLCanvasElement
    numMetaballs?: number
  }) {
    this._canvas = canvas
    this._numMetaballs = numMetaballs

    const { width, height } = this._canvas

    this._renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: this._canvas
    })
    this._renderer.setSize(width, height)
    this._renderer.setClearColor(0x121212)
    // this._renderer.setPixelRatio(window.devicePixelRatio)

    this._camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this._scene = new Scene()
    const geometry = new PlaneGeometry(2, 2)

    const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

    const fragmentShader = `
uniform vec2 screen;
// uniform vec2 mouse;
uniform vec3 metaballs[${numMetaballs}];

void main(){
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;

  float sum = 0.0;
  for (int i = 0; i < ${numMetaballs}; i++) {
    vec3 metaball = metaballs[i];
    float dx = metaball.x - x;
    float dy = metaball.y - y;
    float radius = metaball.z;

    sum += (radius * radius) / (dx * dx + dy * dy);
    // sum += pow((radius * radius) / (dx * dx + dy * dy), 0.8);
  }

  // if (mouse.x > 0.0 && mouse.y > 0.0) {
  //   float dx = mouse.x - x;
  //   float dy = (screen.y - mouse.y) - y;
  //   float radius = 50.0;
  //   sum -= (radius * radius) / (dx * dx + dy * dy);
  // }

  if (sum >= 0.99) {
    gl_FragColor = vec4(mix(vec3(x / screen.x, y / screen.y, 1.0), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
    return;
  }

  discard;
}
`

    this._metaballs = []
    this._metaballsData = new Float32Array(3 * this._numMetaballs)

    this._resetMetaballs()
    this.update()

    this._material = new ShaderMaterial({
      uniforms: {
        screen: {
          value: new Vector2(width, height)
        },
        // mouse: {
        //   value: new Vector2(0, 0)
        // },
        metaballs: {
          value: this._metaballsData
        }
      },
      vertexShader,
      fragmentShader
      // transparent: true
    })

    const mesh = new Mesh(geometry, this._material)
    this._scene.add(mesh)
  }

  _resetMetaballs() {
    const { width, height } = this._canvas

    const x0 = width / 2
    const y0 = height / 2

    this._metaballs = []
    this._metaballs.push(
      new Body({
        x: x0,
        y: y0,
        r: 500,
        dx: 0,
        dy: 0,
        visible: false
      })
    )

    const r0 = Math.sqrt(width * width + height * height) / 10

    for (let i = 1; i < this._numMetaballs + 1; i++) {
      const theta = ((i - 1) * 2.0 * Math.PI) / this._numMetaballs
      const x = x0 + r0 * Math.cos(theta)
      const y = y0 + r0 * Math.sin(theta)
      const dx = 0
      const dy = 0
      const r = random.float(10, 45)

      // const r = random.float(10, 70) * 0.75
      // const x = random.float(r, width - r)
      // const y = random.float(r, height - r)
      // const dx = random.float(-1.5, 1.5)
      // const dy = random.float(-1.5, 1.5)

      this._metaballs.push(
        new Body({
          x,
          y,
          dx,
          dy,
          r
        })
      )
    }
  }

  destroy() {
    this.pause()
  }

  pause() {
    if (this._rafHandle) {
      cancelAnimationFrame(this._rafHandle)
      this._rafHandle = null
    }
  }

  animate() {
    this.update()
    this.render()

    this._rafHandle = requestAnimationFrame(this.animate.bind(this))
  }

  onResize = () => {
    const { width, height } = this._canvas

    this._resetMetaballs()

    this._renderer.setSize(width, height)
    this._material.uniforms.screen.value = new Vector2(width, height)
  }

  update() {
    const width = this._canvas.width
    const height = this._canvas.height

    // const maxInvDist = 0.0001
    const maxInvDist = 10.0

    // for each body in the system, enact a force on every other body in the system
    // running time O(num_particles ^ 2)
    for (let i = 0; i < this._numMetaballs + 1; i++) {
      const mi = this._metaballs[i]

      for (let j = i + 1; j < this._numMetaballs + 1; j++) {
        const mj = this._metaballs[j]
        let xDif = mj.x - mi.x
        let yDif = mj.y - mi.y
        const invDistSquared = Math.min(
          1.0 / (xDif * xDif + yDif * yDif),
          maxInvDist
        )
        if (xDif === 0 || yDif === 0) {
          continue
        }

        // force is inversely proportional to the distance squared
        xDif *= invDistSquared
        yDif *= invDistSquared

        mi.addAcceleration(xDif * mj.mass, yDif * mj.mass)
        mj.addAcceleration(-xDif * mi.mass, -yDif * mi.mass)
      }

      // if (this._mouse) {
      //   const mj = this._mouse
      //   let xDif = mj.x - mi.x
      //   let yDif = height - mj.y - mi.y
      //   const invDistSquared = 1.0 / (xDif * xDif + yDif * yDif)
      //   if (xDif === 0 || yDif === 0) {
      //     continue
      //   }

      //   xDif *= invDistSquared
      //   yDif *= invDistSquared

      //   mi.addAcceleration(-xDif * 20, -yDif * 20)
      // }
    }

    const maxV = 10
    // let maxDx = 0
    // let maxDy = 0

    for (let i = 1; i < this._numMetaballs + 1; i++) {
      const metaball = this._metaballs[i]
      metaball.update()

      if (metaball.x < metaball.r) {
        metaball.dx = Math.abs(metaball.dx)
      }
      if (metaball.x > width - metaball.r) {
        metaball.dx = -Math.abs(metaball.dx)
      }

      if (metaball.y < metaball.r) {
        metaball.dy = Math.abs(metaball.dy)
      }

      if (metaball.y > height - metaball.r) {
        metaball.dy = -Math.abs(metaball.dy)
      }

      if (metaball.dx > maxV) {
        metaball.dx = maxV
      }

      if (metaball.dx < -maxV) {
        metaball.dx = -maxV
      }

      if (metaball.dy > maxV) {
        metaball.dy = maxV
      }

      if (metaball.dy < -maxV) {
        metaball.dy = -maxV
      }

      // if (Math.abs(metaball.dx) > maxDx) {
      //   maxDx = Math.abs(metaball.dx)
      // }

      // if (Math.abs(metaball.dy) > maxDy) {
      //   maxDy = Math.abs(metaball.dy)
      // }

      const baseIndex = 3 * (i - 1)
      this._metaballsData[baseIndex + 0] = metaball.x
      this._metaballsData[baseIndex + 1] = metaball.y
      this._metaballsData[baseIndex + 2] = metaball.r
    }
  }

  onMouseMove = (event: any) => {
    // const { clientX, clientY } = this.getEventCoordinates(event)
    // this._mouse = new Vector2(clientX, clientY)
    // console.log({ clientX, clientY })
    // this._material.uniforms.mouse.value = new Vector2(clientX, clientY)
  }

  getEventCoordinates(event: any) {
    let clientX = 0
    let clientY = 0

    if (event.type === 'touchmove' || event.type === 'touchstart') {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }

    return { clientX, clientY }
  }

  render() {
    this._material.uniforms.metaballs.value = this._metaballsData
    this._material.uniformsNeedUpdate = true

    this._renderer.render(this._scene, this._camera)
  }
}
