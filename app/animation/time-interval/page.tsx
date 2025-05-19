"use client"

import { useEffect, useRef } from "react"
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three"
import { mountStats } from "@/utils/mount-stats"

function TimeInterval() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene
    const scene = new Scene()

    // Object
    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({
        color: 0xff0000,
      }),
    )
    scene.add(cube)

    // Camera
    const camera = new PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
    )
    camera.position.set(1, 1, 3)
    camera.lookAt(cube.position)

    // Renderer
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
    })
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    )

    // Stats
    const { stats, dispose } = mountStats()

    // Animation
    let time = Date.now()
    let animationId: number

    const tick = (currentTime: number) => {
      stats.begin()

      const deltaTime = currentTime - time
      time = currentTime

      cube.rotation.y += 0.001 * deltaTime

      renderer.render(scene, camera)
      stats.end()
      animationId = requestAnimationFrame(tick)
    }

    tick(0)

    return () => {
      cancelAnimationFrame(animationId)
      renderer.dispose()
      dispose()
    }
  }, [])

  return <canvas className="h-full w-full" ref={canvasRef}></canvas>
}

export default TimeInterval
