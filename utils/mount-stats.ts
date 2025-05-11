import Stats from "stats.js"

export function mountStats() {
  const stats = new Stats()
  stats.dom.style.top = "10px"
  stats.dom.style.left = "10px"

  document.body.appendChild(stats.dom)

  const dispose = () => {
    document.body.removeChild(stats.dom)
  }

  return { stats, dispose }
}
