import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const HELLO_QUERY = gql`
  {
    hello 
  }
`

const Title = styled.h1`
  font-weight: bold;
  color: blue;
`

const Home = ({ hello }) => {
  const [clicked, onClick] = useState(false)

  return (
    <div>
      <Title>Home page mock</Title>
      <Title>{hello}</Title>
      <h3>{clicked ? 'CLICKED' : 'NOT CLICKED'}</h3>
      <button onClick={() => onClick(!clicked)}>click</button>
    </div>
  )
}

Home.propTypes = {
  hello: PropTypes.string,
}

const HomeContainer = props => (
  <Query errorPolicy="all" query={HELLO_QUERY}>
    {({ loading, error, data }) => {
      if (loading || !!error) {
        return <div>loading...</div>
      }

      return <Home {...props} {...data} />
    }}
  </Query>
)

export default HomeContainer
