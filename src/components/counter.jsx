import { h } from 'preact'
import { action } from 'reducerx'

const Counter = (props) => {
    return (
        <div class="section">
            <h2>Counter</h2>
            <div>
                <button class="btn" onClick={() => action('INCREMENT')}>+</button>
                <span class="counter">{props.count}</span>
                <button class="btn last" onClick={() => action('DECREMENT')}>-</button>
            </div>
        </div>
    )
}

export default Counter
