import './App.css'
import HomeButton from './HomeButton'

interface Props {
    returnHome: () => void
}

function Articles(props: Props) {
    return (
        <>
            <div className='home-button-container' onClick={props.returnHome}>
                <HomeButton />
            </div>
            articles
        </>
    )
}

export default Articles
