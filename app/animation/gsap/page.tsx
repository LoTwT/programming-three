"use client"

import { mountStats } from "@/utils/mount-stats"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three"

function Gsap() {
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

    gsap.fromTo(
      cube.position,
      {
        x: -1.5,
      },
      {
        x: 1.5,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      },
    )

    const { stats, dispose } = mountStats()

    const tick = () => {
      stats.begin()

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

export default Gsap
