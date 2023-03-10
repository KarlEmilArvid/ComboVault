import './InformationSection.scss'

type Props = {
    characterName: string;
    games: any[] | undefined;
}

const InformationSection = ({ characterName, games }: Props) => {

    return (
        <section className='information-wrapper'>
            <section className='information-section'>
                <h2>Information</h2>
                <p>text goes here, text ska visas här, infromation ska skrivas här, text ska renderas här</p>
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