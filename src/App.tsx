import { ApiSelect } from './components/api-select'
import { Header } from './components/header'
import { Results } from './components/results'
import { Uploader } from './components/uploader'

function App() {
  return (
    <div className="container mx-auto px-2 space-y-3">
      <Header />
      <ApiSelect />
      <Uploader />
      <Results />
    </div>
  )
}

export default App
