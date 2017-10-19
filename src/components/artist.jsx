import { h } from 'preact'
import { dispatch } from 'lib/reducerx'

const CHANGE = 'NAME_CHANGED'

const Artist = (props) => {
    return (
        <div class="section">
            <h2>Name: {props.name}</h2>
            <div>
                <button class="btn" onClick={() => dispatch(CHANGE, 'Harry Potter')}>Harry</button>
                <button class="btn" onClick={() => dispatch(CHANGE, 'Hermione Granger')}>Hermione</button>
                <button class="btn" onClick={() => dispatch(CHANGE, 'Rony Weasley')}>Rony</button>
            </div>
        </div>
    )
}

export default Artist
