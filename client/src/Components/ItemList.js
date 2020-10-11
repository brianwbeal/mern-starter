import React from 'react'
import { Consumer } from '../Context'

export const ItemList = () => {
    return (
        <Consumer>
            { context => (
                <div className="itemList">
                    <ul>
                        {context.items.map(item => <li key={ item._id }><span>{ item.name }</span><button onClick={() => context.actions.deleteItem(item._id) }>X</button> </li>)}
                    </ul>
                </div>
            )}
        </Consumer>
    )
}
