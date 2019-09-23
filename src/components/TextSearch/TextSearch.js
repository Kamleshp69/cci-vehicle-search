import React, { Component } from 'react'

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13

class TextSearch extends Component {
  state = {
    value: ''
  }

  timer = null

  handleChange = e => {
    clearTimeout(this.timer)

    this.setState({ value: e.target.value })

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL)
  }

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      this.triggerChange()
    }
  }

  triggerChange = () => {
    const { value } = this.state

    this.props.onChange(value)
  }

  render() {
    const { ...rest } = this.props

    return (
      <input
        type={rest.type}
        className={rest.className}
        placeholder={rest.placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}

export default TextSearch