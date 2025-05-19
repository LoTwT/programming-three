"use client"

import React, { useEffect, useRef } from "react"
import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three"
import { mountStats } from "@/utils/mount-stats"

function ThreeClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()

    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({
        color: 0xff0000,
      }),
    )
    scene.add(cube)

    const camera = new PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
    )
    camera.position.set(1, 1, 3)
    camera.lookAt(cube.position)

    const renderer = new WebGLRenderer({
      canvas,
    })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const clock = new Clock()

    const { stats, dispose } = mountStats()

    const tick = () => {
      stats.begin()
      const delta = clock.getDelta()
      cube.rotation.y += 1 * delta

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

  return <canvas className="h-full w-full" ref={canvasRef}></canvas>
}

export default ThreeClock
