import { useState } from 'react'
import './App.css'
import Articles from './Articles'
import Home from './Home'
import Plurals from './Plurals'

export enum View {
    home = 'home',
    articles = 'articles',
    plurals = 'plurals',
}

function App() {
    const [curView, setCurView] = useState<View>(View.home)

    const onModeClicked = (mode: View) => {
        setCurView(mode)
    }

    const returnHome = () => {
        setCurView(View.home)
    }

    const getViewElement = () => {
        switch (true) {
            case curView === View.articles:
                return <Articles returnHome={returnHome} />
            case curView === View.plurals:
                return <Plurals returnHome={returnHome} />
            case curView === View.home:
            default:
                return <Home onModeClicked={(mode) => onModeClicked(mode)} />
        }
    }

    return <div className='App'>{getViewElement()}</div>
}

export default App
