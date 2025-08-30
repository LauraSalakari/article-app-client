import { useEffect, useState } from 'react'
import './App.css'
import HomeButton from './HomeButton'
import wordlist from './wordlist.json'

interface Word {
    id: number
    english: string
    german: string
    plural: string | null
}

interface Props {
    returnHome: () => void
}

let correctStyle = { backgroundColor: '#299b3850' }
let wrongStyle = { backgroundColor: '#ee656e50' }

function Articles(props: Props) {
    const [curItem, setCurItem] = useState<Word>()
    const [answer, setAnswer] = useState<'der' | 'die' | 'das'>()
    const [word, setWord] = useState<string>()
    const [selectedAnswer, setSelectedAnswer] = useState<'der' | 'die' | 'das' | undefined>()

    const historySize = 50
    let recent: number[] = []

    const selectWord = (data: Word[]) => {
        let choice
        do {
            choice = data[Math.floor(Math.random() * data.length)]
        } while (recent.includes(choice.id))

        recent.push(choice.id)
        if (recent.length > historySize) {
            recent.shift()
        }

        setCurItem(choice)
    }

    useEffect(() => {
        selectWord(wordlist)
    }, [])

    useEffect(() => {
        if (curItem) {
            // hacky, dut that's what it'll be
            setAnswer(curItem.german.substring(0, 3).toLowerCase() as 'der' | 'die' | 'das')
            setWord(curItem.german.substring(4))
            setSelectedAnswer(undefined)
        }
    }, [curItem])

    const getStyle = (art: 'der' | 'die' | 'das') => {
        if (art === selectedAnswer) {
            if (selectedAnswer === answer) {
                return correctStyle
            } else {
                return wrongStyle
            }
        }

        return {}
    }

    return (
        <>
            <div className='home-button-container' onClick={props.returnHome}>
                <HomeButton />
            </div>

            <div className={'current-word'}>{word}</div>

            <div className='article-group'>
                <div className='article-choice' onClick={() => setSelectedAnswer('der')} style={getStyle('der')}>
                    Der
                </div>
                <div className='article-choice' onClick={() => setSelectedAnswer('die')} style={getStyle('die')}>
                    Die
                </div>
                <div className='article-choice' onClick={() => setSelectedAnswer('das')} style={getStyle('das')}>
                    Das
                </div>
            </div>

            <div className='next-button' onClick={() => selectWord(wordlist)}>
                Next
            </div>
        </>
    )
}

export default Articles
