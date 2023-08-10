import { Input } from 'antd'
const { Search } = Input
interface Props {
    setSearchTerm: (searchTerm: string) => void
}
const CharacterSearch = ({ setSearchTerm }: Props): JSX.Element => {
    return (
        <Search
            placeholder="Filtrar personaje por nombre o especie"
            enterButton="Buscar"
            size="large"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px" }}
        />
    )
}

export default CharacterSearch