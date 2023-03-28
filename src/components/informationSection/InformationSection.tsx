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
        let tempString = ''
        games?.forEach((game: any) => {
            game.GameTitle.forEach((title: any) => {
                title.Characters.forEach((character: any) => {
                    if (character.Name === characterName) {
                        tempString = character.Information
                        return
                    }
                })
            })
        })
        setInformation(tempString)
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