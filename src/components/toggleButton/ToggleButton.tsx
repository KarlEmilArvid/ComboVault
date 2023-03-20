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
            <div className="toggle-border">

                <button className="toggle-button" onClick={toggle}>{name}</button>

            </div>
        </>
    )
}

export default ToggleButton