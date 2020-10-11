import React from 'react'
import { Consumer } from '../Context'

export const AddItem = () => {
    return (
      <Consumer>
        { context => (
            <div className="addItem">
              <form onSubmit={context.actions.submitItem}>
                <input
                  type="text"
                  name="name"
                  onChange={context.actions.changeInput}
                  value={context.value}
                  autoComplete="off"
                />
                <button type="submit">+</button>
              </form>
          </div>
        )}
      </Consumer>
    )
}
