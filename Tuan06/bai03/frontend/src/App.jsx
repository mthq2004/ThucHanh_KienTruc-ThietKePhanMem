import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [monolith, setMonolith] = useState(null)
  const [serviceBased, setServiceBased] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [m, s] = await Promise.all([
          fetch('http://localhost:8080/api/architecture/monolith').then((r) => r.json()),
          fetch('http://localhost:8080/api/architecture/service-based').then((r) => r.json()),
        ])
        setMonolith(m)
        setServiceBased(s)
      } catch (_err) {
        setMonolith({ error: 'Backend chua chay o cong 8080' })
        setServiceBased({ error: 'Backend chua chay o cong 8080' })
      }
    }

    load()
  }, [])

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px' }}>
      <h1>Bai 03 - Monolith to Service-based</h1>
      <p>Online Food Delivery (3 functions): Ordering, Payment, Delivery</p>

      <section style={{ marginTop: 20 }}>
        <h2>Monolith Snapshot</h2>
        <pre>{JSON.stringify(monolith, null, 2)}</pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Service-based Snapshot</h2>
        <pre>{JSON.stringify(serviceBased, null, 2)}</pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>DB Model</h2>
        <p>Xem SQL schema tai bai03/db/schema.sql</p>
      </section>
    </main>
  )
}

export default App
