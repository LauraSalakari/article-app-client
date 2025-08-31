import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Word } from './Articles'
import HomeButton from './HomeButton'
import wordlist from './wordlist.json'

interface Props {
    returnHome: () => void
}

function Plurals(props: Props) {
    const [curItem, setCurItem] = useState<Word>()
    const [answer, setAnswer] = useState<string>()
    const [word, setWord] = useState<string>()
    const [enteredAnswer, setEnteredAnswer] = useState<string | undefined>()
    const [submittedAnswer, setSubmittedAnswer] = useState<string | undefined>()

    const inputRef = useRef<HTMLInputElement>(null)

    const historySize = 50
    let recent: number[] = []

    const selectWord = (data: Word[]) => {
        let choice
        do {
            choice = data[Math.floor(Math.random() * data.length)]
        } while (recent.includes(choice.id) || choice.plural === null)

        recent.push(choice.id)
        if (recent.length > historySize) {
            recent.shift()
        }

        setCurItem(choice)
    }

    useEffect(() => {
        selectWord(wordlist)

        // autofocus is not working for some reason????
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    useEffect(() => {
        if (curItem) {
            setAnswer(curItem.plural?.substring(4)) // without the article since it's always 'die'
            setWord(curItem.german)
            setEnteredAnswer('')
            setSubmittedAnswer('')
        }
    }, [curItem])

    const getCheck = () => {
        if (!submittedAnswer) {
            return <></>
        }

        if (submittedAnswer === answer) {
            return <>✅</>
        } else {
            return <>❌</>
        }
    }

    const onSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmittedAnswer(enteredAnswer)
    }

    return (
        <>
            <div className='home-button-container' onClick={props.returnHome}>
                <HomeButton />
            </div>
            <div className='test-zone '>
                <div className={'current-word'}>{word}</div>
                <div className='plural-entry-section'>
                    <span>Die </span>
                    <form onSubmit={(e) => onSubmitted(e)}>
                        <input
                            className='text-input'
                            value={enteredAnswer}
                            onChange={(e) => setEnteredAnswer(e.target.value)}
                            ref={inputRef}
                        />
                    </form>
                    <div className='check-div'>{getCheck()}</div>
                </div>
                <div className='next-button' onClick={() => selectWord(wordlist)}>
                    Next
                </div>
            </div>
        </>
    )
}

export default Plurals
