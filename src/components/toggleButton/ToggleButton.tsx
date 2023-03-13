import './ToggleButton.scss'

type Props = {
    name: string
    getName: (name: string) => void
}

const ToggleButton = ({ name, getName }: Props) => {

    const toggle = () => {
        getName(name)
    }

    return (
        <>
            <button className="toggle-button" onClick={toggle}>{name}</button>
        </>
    )
}

export default ToggleButton