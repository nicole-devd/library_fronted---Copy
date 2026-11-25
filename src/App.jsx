import './App.css'
import LibraryHeader from './components/LibraryHeader'
import LibraryLogin from './components/LibraryLogin'
import LibraryBooks from './components/LibraryBooks'
import LibraryFooter from './components/LibraryFooter'
import Office from './components/Office'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <div className="app-shell">
      <LibraryHeader />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<LibraryLogin />} />
          <Route path="/Office" element={<Office />} />
          <Route path="/LibraryBooks" element={<LibraryBooks />} />
        </Routes>
      </main>
      <LibraryFooter />
    </div>
  )
}

export default App
