
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:8082/api/office'

async function fetchOffices() {
  const response = await fetch(`${API_URL}/all`)

  if (!response.ok) {
    throw new Error('Failed to load offices')
  }

  return response.json()
}

function Office() {
  const [name, setName] = useState('')
  const [officeNumber, setOfficeNumber] = useState('')
  const [offices, setOffices] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchOffices()
      .then((data) => {
        if (isMounted) {
          setOffices(data)
          setError('')
        }
      })
      .catch((requestError) => {
        console.error('Error loading offices:', requestError)
        if (isMounted) {
          setError('Could not load offices from the backend')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function loadOffices() {
    try {
      const data = await fetchOffices()
      setOffices(data)
      setError('')
    } catch (requestError) {
      console.error('Error loading offices:', requestError)
      setError('Could not load offices from the backend')
    } finally {
      setLoading(false)
    }
  }

  async function saveOffice(event) {
    event.preventDefault()

    if (name.trim() === '' || officeNumber.trim() === '') {
      alert('Please fill in all fields')
      return
    }

    const number = Number(officeNumber)

    if (!Number.isInteger(number) || number <= 0) {
      alert('Please enter a valid office number')
      return
    }

    try {
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          officeNumber: number
        })
      })

      const message = await response.text()

      if (!response.ok) {
        alert(message)
        return
      }

      alert(message)
      setName('')
      setOfficeNumber('')
      setLoading(true)
      await loadOffices()
    } catch (error) {
      console.error(error)
      alert('Could not connect to the backend')
    }
  }

  async function deleteOffice(office) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${office.name}?`
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/delete/${office.id}`, {
        method: 'DELETE'
      })
      const message = await response.text()

      if (!response.ok) {
        alert(message)
        return
      }

      alert(message)
      setOffices((currentOffices) =>
        currentOffices.filter((item) => item.id !== office.id)
      )
    } catch (error) {
      console.error(error)
      alert('Could not connect to the backend')
    }
  }

  const searchText = search.trim().toLowerCase()
  const filteredOffices = offices.filter((office) =>
    (office.name || '').toLowerCase().includes(searchText) ||
    String(office.officeNumber ?? '').toLowerCase().includes(searchText)
  )

  return (
    <div className="office-page">
      <div className="office-card">
        <h2>SAVE OFFICE</h2>

        <form onSubmit={saveOffice} className="office-form">
          <label htmlFor="officeName">Office Name:</label>

          <input
            type="text"
            id="officeName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter office name"
          />

          <label htmlFor="officeNumber">Office Number:</label>

          <input
            type="number"
            id="officeNumber"
            min="1"
            step="1"
            value={officeNumber}
            onChange={(event) => setOfficeNumber(event.target.value)}
            placeholder="Enter office number"
          />

          <button type="submit" className="office-button">
            SAVE
          </button>
        </form>
      </div>

      <div className="office-list-page office-card">
        <div className="office-list-header">
          <h2>OFFICES</h2>
          <input
            type="search"
            id="officeSearch"
            aria-label="Search offices by name or number"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by office name or office number"
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading offices...</p>
        ) : error ? (
          <p className="error-message" role="alert">{error}</p>
        ) : offices.length === 0 ? (
          <p className="no-results">No offices found.</p>
        ) : filteredOffices.length === 0 ? (
          <p className="no-results">No offices match your search.</p>
        ) : (
          <div className="table-container">
            <table className="office-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Office Number</th>
                  <th>Office Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffices.map((office) => (
                  <tr key={office.id}>
                    <td className="office-id">{office.id}</td>
                    <td>{office.officeNumber}</td>
                    <td>{office.name}</td>
                    <td className="action-buttons">
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteOffice(office)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Office
