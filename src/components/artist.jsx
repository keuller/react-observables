import { h } from 'preact'
import { action } from 'reducerx'

const Artist = (props) => {
    return (
        <div class="section">
            <h2>Name: {props.name}</h2>
            <div>
                <button class="btn" onClick={() => action('NAME_CHANGED', 'Harry Potter')}>Harry</button>
                <button class="btn" onClick={() => action('NAME_CHANGED', 'Hermione Granger')}>Hermione</button>
                <button class="btn" onClick={() => action('NAME_CHANGED', 'Rony Weasley')}>Rony</button>
            </div>
        </div>
    )
}

export default Artist
