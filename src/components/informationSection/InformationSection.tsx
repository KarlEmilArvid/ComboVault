import { useEffect, useState } from 'react';
import './InformationSection.scss'

type Props = {
    characterName: string;
    games: any[] | undefined;
}

const InformationSection = ({ characterName, games }: Props) => {
    const [information, setInformation] = useState<string>('')

    useEffect(() => {
        games?.map((game, i) => {
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
                        <a href="">en länk</a>
                    </li>
                    <li>
                        <a href="">två länk</a>
                    </li>
                    <li>
                        <a href="">tre länk</a>
                    </li>
                </ul>
            </section>
        </section>
    )
}

export default InformationSection