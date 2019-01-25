import React, { Component } from 'react'
import { loadNews, newsSelector, loadingSelector } from '../ducks/news'
import { connect } from 'react-redux'
import { Container } from 'react-materialize'

import Preloader from '../components/common/preloader'
import NewsItem from '../components/news/news-item'

class News extends Component {

  componentDidMount() {
    this.props.loadNews()
  }

  render() {
    if (this.props.loading || !this.props.news)
      return (
        <Container className='full-page-container'>
          <Preloader />
        </Container>
      )

    if (!this.props.news.length)
      return (
        <Container>
          <h4>Увы, новостей сегодня нет =((</h4>
        </Container>
      )

    return (
      <Container>
        {
          this.props.news.map(item => <NewsItem {...item} key={item.id} />)
        }
      </Container>
    )
  }
}

export default connect(
  (state) => ({
    news: newsSelector(state),
    loading: loadingSelector(state)
  }),
  { loadNews }
)(News)