import { h } from 'preact'
import { promise } from '../util'
import { action } from 'reducerx'

let loadUsers = (val) => {
    if (!val) val = '5'
    action('USERS_LOADING', 
        promise(fetch(`https://api.github.com/users?per_page=${val}`))
            .flatMap(result => promise(result.json()))
            .map(val => ({ type: 'USERS_LOADED', payload: val }))
    )
}

const UserInfo = (props) => {
    let { login, avatar_url } = props.data
    return (
        <li>
            <img src={avatar_url} width="80" /><br/>
            <span>{login}</span>
        </li>
    )
}

const UserList = ({data}) => {
    return (
        <div class="section">
            <h2>Github Users</h2>
            <div>
                <button class="btn" onClick={() => loadUsers()}>Load</button>
                <button class="btn" onClick={() => action('USERS_LOADING')} disabled={data.length < 1}>Clear</button>
                <select class="btn" onChange={(ev) => loadUsers(ev.target.value)}>
                    <option value="5">Max. 05</option>
                    <option value="10">Max. 10</option>
                    <option value="15">Max. 15</option>
                    <option value="20">Max. 20</option>
                    <option value="25">Max. 25</option>
                </select>
                <ul>
                    {data.map(user => <UserInfo key={user.id} data={user} />)}
                </ul>
            </div>
        </div>
    )
}

export default UserList
