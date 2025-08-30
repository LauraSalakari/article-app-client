import './App.css'
import HomeButton from './HomeButton'

interface Props {
    returnHome: () => void
}

function Plurals(props: Props) {
    return (
        <>
            <div className='home-button-container' onClick={props.returnHome}>
                <HomeButton />
            </div>
            plurals
        </>
    )
}

export default Plurals
