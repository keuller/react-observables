import 'whatwg-fetch'
import './index.css'
import { h, render } from 'preact'
import store from './store'
import Counter from 'components/counter'
import Artist from 'components/artist'
import UserList from 'components/users'

const App = (props) => {
    return (
        <main>
            <h1 class="header">Preact and Most</h1>
            <Counter count={props.count} />
            <Artist name={props.name || ''} />
            <UserList data={props.users || []} />
        </main>
    )
}

document.addEventListener('DOMContentLoaded', (ev) => {
    let root = null;
    store.observe(state => {
        root = render(<App {...state} />, document.querySelector('#app'), root) 
    })
})
