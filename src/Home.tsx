import { View } from './App'
import './App.css'

interface Props {
    onModeClicked: (view: View) => void
}

function Home(props: Props) {
    const { onModeClicked } = props

    return (
        <>
            <div className='mode-select-button' onClick={() => onModeClicked(View.articles)}>
                Die Artikel
            </div>
            <div className='mode-select-button' onClick={() => onModeClicked(View.plurals)}>
                Die Plurale
            </div>
        </>
    )
}

export default Home
