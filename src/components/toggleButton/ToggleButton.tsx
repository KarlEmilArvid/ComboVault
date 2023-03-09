import { useEffect, useState } from "react"
import './ToggleButton.scss'

type Props = {
    name: string
    getName: (name: string) => void
}

const ToggleButton = ({ name, getName }: Props) => {
    const [active, setActive] = useState<string>('')

    const toggle = () => {
        console.log('jag är klickad')
        setActive(name)
        getName(name)
    }

    /*
    useEffect(() => {
        getName(name)
    }, [setActive])
    */

    console.log(name)
    console.log(active)

    return (
        <>
            <button className="toggle-button" onClick={toggle}>{name}</button>
        </>
    )
}

export default ToggleButton