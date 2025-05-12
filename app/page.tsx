import NextLink from "next/link"

export default function Home() {
  return (
    <main>
      <h2 className="text-3xl">programming-three</h2>
      <section className="mt-4">
        <h3 className="text-2xl">animation</h3>
        <ul className="mt-2 list-inside list-disc text-lg">
          <li>
            <NextLink
              className="hover:underline"
              href="/animation/time-interval"
            >
              time-interval
            </NextLink>
          </li>
          <li>
            <NextLink className="hover:underline" href="/animation/three-clock">
              three-clock
            </NextLink>
          </li>
        </ul>
      </section>
    </main>
  )
}
