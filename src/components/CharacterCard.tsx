import { useState } from 'react'
import { Col, Card, Modal, Button } from 'antd'
import { Character } from '../interfaces/character'
const { Meta } = Card

interface CharacterCardProps {
    character: Character
}

const CharacterCard = ({ character }: CharacterCardProps) : JSX.Element => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

    const openModal = (character: Character) => {
        setSelectedCharacter(character)
        setModalVisible(true)
    }

    const closeModal = () => {
        setSelectedCharacter(null)
        setModalVisible(false)
    }

    return (
        <>
            <Col xs={24} sm={24} md={12} lg={6} span={6} >
                <Card
                    hoverable
                    className="character-card"
                    cover={<img className='animate__animated animate__fadeIn' alt={character.name} src={character.image} />}
                >
                    <Meta title={character.name} description={character.species} />
                    <Button onClick={() => openModal(character)} style={{ marginTop: "10px" }} block type="primary" danger>Detalles</Button>
                </Card>
            </Col>
            <Modal
                title="Detalles del personaje"
                style={{ textAlign: "center" }}
                visible={modalVisible}
                onCancel={closeModal}
                footer={null}
            >
                {selectedCharacter && (
                    <div className="container-modal">
                        <div className="image-modal">
                            <img className='animate__animated animate__fadeIn' src={selectedCharacter.image} alt={selectedCharacter.name} />
                        </div>
                        <div className="info-modal">
                            <p>Nombre: <span>{selectedCharacter.name}</span></p>
                            <p>Especie: <span>{selectedCharacter.species}</span></p>
                            <p>Género: <span>{selectedCharacter.gender}</span></p>
                            <p>Estado: <span> {selectedCharacter.status}</span></p>
                            <p>Origen: <span>{selectedCharacter.origin.name}</span> </p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default CharacterCard