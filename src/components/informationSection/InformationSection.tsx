import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './InformationSection.scss'

type Props = {
    characterName: string
}

const InformationSection = ({ characterName }: Props) => {
    const [information, setInformation] = useState<string>('')
    const games = useSelector((state: any) => state.games.Games)

    useEffect(() => {
        games?.map((game: any, i: number) => {
            game.GameTitle.map((character: any) => {
                let tempString: string = ''
                character.Characters.map((character: any) => {
                    if (characterName === character.Name) {
                        tempString = character.Information
                    }
                })
                setInformation(tempString)
            })
        })
    }, [])

    return (
        <div className="information-wrapper--border">
            <section className='information-wrapper'>
                <section className='information-section'>
                    <h2>Information</h2>
                    <p>{information}</p>
                </section>
            </section>
        </div>
    )
}

export default InformationSection