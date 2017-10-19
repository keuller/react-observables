import { h } from 'preact'
import { dispatch } from 'lib/reducerx'

const Counter = (props) => {
    return (
        <div class="section">
            <h2>Counter</h2>
            <div>
                <button class="btn" onClick={() => dispatch('INCREMENT')}>+</button>
                <span class="counter">{props.count}</span>
                <button class="btn last" onClick={() => dispatch('DECREMENT')}>-</button>
            </div>
        </div>
    )
}

export default Counter
