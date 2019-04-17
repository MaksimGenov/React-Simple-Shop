import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Pagination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pages: [],
      currentPages: 1,
      lastPages: null
    }

    this.nextPages = this.nextPages.bind(this)
    this.prevPages = this.prevPages.bind(this)
  }

  setPages () {
    const pagesCount = Math.ceil(this.props.itemsCount / this.props.itemsPerPage)
    let pages = []
    for (let page = 1; page <= pagesCount; page++) {
      const offset = (page - 1) * this.props.itemsPerPage
      const limit = offset + this.props.itemsPerPage
      const query = `?offset=${offset}&limit=${limit}`
      pages.push(
        <li className='page-item' key={page} >
          <NavLink to={query} className='page-link'>
            {page}
          </NavLink>
        </li>
      )
    }
    const lastPages = Math.ceil(pagesCount / this.props.visiblePages)
    this.setState({pages, lastPages})
  }

  componentDidMount () {
    this.setPages()
  }

  componentDidUpdate (prevProps) {
    if (this.props.itemsCount !== prevProps.itemsCount) {
      this.setPages()
    }
  }

  nextPages () {
    this.setState((prevState, props) => {
      let currentPages = (prevState.currentPages + 1) > this.state.lastPages
        ? (prevState.currentPages)
        : (prevState.currentPages + 1)
      return {currentPages}
    })
  }

  prevPages () {
    this.setState((prevState, props) => {
      let currentPages = (prevState.currentPages - 1) === 0
        ? 1
        : (prevState.currentPages - 1)
      return {currentPages}
    })
  }

  render () {
    let pagesStart = (this.state.currentPages - 1) * this.props.visiblePages
    let pagesEnd = pagesStart + this.props.visiblePages
    let pages = this.state.pages.slice(pagesStart, pagesEnd)
    let isLastPages = this.state.currentPages >= this.state.lastPages
    let isFirstPage = this.state.currentPages === 1
    return (
      <div id='pagination' className='row justify-content-center'>
        <ul className='pagination'>
          { isFirstPage
            ? null
            : <li className='page-item'>
              <span className='page-link' onClick={this.prevPages}>Previous</span>
            </li>
          }
          { pages }
          { isLastPages
            ? null
            : <li className='page-item'>
              <span className='page-link' onClick={this.nextPages}>Next</span>
            </li>
          }
        </ul>
      </div>
    )
  }
}

export default Pagination
