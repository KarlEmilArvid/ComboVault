import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './InformationSection.scss'

type Props = {
    characterName: string
}

const InformationSection = ({ characterName }: Props) => {
    const [information, setInformation] = useState<string>('')
    const games = useSelector((state: any) => state.games)

    useEffect(() => {
        games?.map((game: any, i: number) => {
            if (i === 1) {
                let tempString: string = ''
                game.Characters.map((character: { Name: string; Information: string; }) => {
                    if (character.Name === characterName) {
                        tempString = character.Information
                    }
                })
                setInformation(tempString)
            }
        })
    }, [])

    return (
        <section className='information-wrapper'>
            <section className='information-section'>
                <h2>Information</h2>
                <p>{information}</p>
            </section>
            <section className='link-section'>
                <ul>
                    <li>
                        <a href=''>en länk</a>
                    </li>
                    <li>
                        <a href=''>två länk</a>
                    </li>
                    <li>
                        <a href=''>tre länk</a>
                    </li>
                </ul>
            </section>
        </section>
    )
}

export default InformationSection