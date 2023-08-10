import { useState, useEffect } from 'react'
import { Character } from './interfaces/character'
import { Typography, Row, Pagination } from 'antd'
import './App.css'
import CharacterCard from './components/CharacterCard'
import CharacterSearch from './components/CharacterSearch'

const { Title } = Typography

function App(): JSX.Element {
  const [characters, setCharacters] = useState<Character[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [err, setErr] = useState<unknown>(false)
  const charactersPerPage = 10

  useEffect(() => {
    const getCharacters = async () => {
      try {
        fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
          .then((res) => res.json())
          .then((data) => {
            setCharacters(data.results)
            setTotalPages(data.info.pages)
          })
      } catch (error) {
        setErr(error)
      }
    }
    getCharacters()
  }, [currentPage, totalPages])


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const filtered = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.species.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCharacters(filtered)
  }, [searchTerm, characters])

  if (err) return <Title level={4}>Something went wrong</Title>

  return (
    <div className="container-app">
      <Row justify="center">
        <Title>Rick and Morty</Title>
      </Row>
      <Row>
        <CharacterSearch setSearchTerm={setSearchTerm} />
      </Row>
      {
        filteredCharacters.length === 0 && (
          <Row justify="center">
            <Title level={4} style={{ color: "#b8b8b8", marginBottom: "40px" }}>No se encontraron resultados</Title>
          </Row>
        )
      }
      <Row justify="start">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Row>
      <Row justify="center">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={charactersPerPage * totalPages}
          pageSize={charactersPerPage}
        />
      </Row>
    </div>
  )
}

export default App
