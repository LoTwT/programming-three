"use client"

import { mountStats } from "@/utils/mount-stats"
import { useEffect, useRef } from "react"
import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three"

function CircularMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()

    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x607d8b }),
    )
    scene.add(cube)

    const camera = new PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
    )
    camera.position.set(0, 0, 3)
    camera.lookAt(cube.position)

    const renderer = new WebGLRenderer({
      canvas,
    })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const clock = new Clock()

    const { stats, dispose } = mountStats()

    const tick = () => {
      stats.begin()

      const elapsedTime = clock.getElapsedTime()

      cube.position.y = Math.sin(elapsedTime)
      cube.position.x = Math.cos(elapsedTime)
      // camera.lookAt(cube.position)

      renderer.render(scene, camera)
      stats.end()
      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      renderer.dispose()
      dispose()
    }
  }, [])

  return <canvas className="h-full w-full" ref={canvasRef} />
}

export default CircularMotion
